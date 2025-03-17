import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { experiences, users } from "./schema.js";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { updateTimestampTrigger } from "./util/lifecycle-dates.js";
import "dotenv/config";

// Schema for validating aiTags JSON
const aiTagsSchema = z.array(z.string());

describe("Experiences Schema", () => {
  // Connect to test database
  const queryClient = postgres(process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/test");
  const db = drizzle(queryClient);

  // Create tables before tests
  beforeAll(async () => {
    // Drop tables if they exist
    await db.execute(sql`
      DROP TABLE IF EXISTS experiences;
      DROP TABLE IF EXISTS users;
    `);

    // Create tables
    await db.execute(sql`
      CREATE TABLE users (
        user_id VARCHAR(128) PRIMARY KEY,
        email TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.execute(sql`
      CREATE TABLE experiences (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(128) NOT NULL REFERENCES users(user_id),
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP,
        is_current BOOLEAN NOT NULL DEFAULT FALSE,
        description TEXT,
        ai_processed_at TIMESTAMP,
        ai_confidence_score TEXT,
        ai_tags TEXT,
        version VARCHAR(50) NOT NULL DEFAULT '1',
        is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT date_check CHECK (end_date IS NULL OR end_date > start_date),
        CONSTRAINT current_check CHECK ((is_current = false AND end_date IS NOT NULL) OR (is_current = true AND end_date IS NULL))
      )
    `);

    // Create timestamp update trigger
    await db.execute(sql.raw(updateTimestampTrigger));
    
    // Add trigger to tables
    await db.execute(sql`
      CREATE TRIGGER update_users_timestamp
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_timestamp();
    `);

    await db.execute(sql`
      CREATE TRIGGER update_experiences_timestamp
        BEFORE UPDATE ON experiences
        FOR EACH ROW
        EXECUTE FUNCTION update_timestamp();
    `);

    // Insert test user
    await db.insert(users).values({
      userId: "test_user_123",
      email: "test@example.com"
    });
  });

  // Test cases
  it("should enforce required fields", async () => {
    // Test inserting without required fields
    await expect(db.insert(experiences).values({
      userId: "test_user_123",
      // Missing title and company
      startDate: new Date()
    })).rejects.toThrow();
  });

  it("should enforce date constraints", async () => {
    const startDate = new Date("2023-01-01");
    const endDate = new Date("2022-12-31"); // End date before start date

    await expect(db.insert(experiences).values({
      userId: "test_user_123",
      title: "Software Engineer",
      company: "Tech Corp",
      startDate,
      endDate,
      isCurrent: false
    })).rejects.toThrow();
  });

  it("should enforce current status consistency", async () => {
    // Test isCurrent=true with an end date
    await expect(db.insert(experiences).values({
      userId: "test_user_123",
      title: "Software Engineer",
      company: "Tech Corp",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-12-31"),
      isCurrent: true // This should fail because we have an end date
    })).rejects.toThrow();
  });

  it("should handle AI metadata correctly", async () => {
    const validTags = ["javascript", "react", "typescript"];
    const experience = await db.insert(experiences).values({
      userId: "test_user_123",
      title: "Software Engineer",
      company: "Tech Corp",
      startDate: new Date("2023-01-01"),
      isCurrent: true,
      aiTags: JSON.stringify(validTags)
    }).returning();

    expect(experience[0]).toBeDefined();
    expect(() => {
      const parsedTags = aiTagsSchema.parse(JSON.parse(experience[0].aiTags ?? "[]"));
      expect(parsedTags).toEqual(validTags);
    }).not.toThrow();
  });

  // Clean up after tests
  afterAll(async () => {
    await db.execute(sql`
      DROP TABLE IF EXISTS experiences;
      DROP TABLE IF EXISTS users;
    `);
    await queryClient.end();
  });
}); 