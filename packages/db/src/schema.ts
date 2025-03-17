import { pgTable, text, timestamp, varchar, index, boolean, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { lifecycleDates } from "./util/lifecycle-dates";
import { newId } from "@repo/id";

export const users = pgTable("users", {
  userId: varchar("user_id", { length: 128 }).primaryKey(),
  // Add more clerk fields you want to sync here
  email: text("email").notNull(),
  ...lifecycleDates,
});

export const posts = pgTable("posts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  ...lifecycleDates,
});

export const experiences = pgTable("experiences", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => newId("exp")),
  
  // User relationship
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  
  // Core experience data
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isCurrent: boolean("is_current").default(false).notNull(),
  
  // Rich description for AI processing
  description: text("description"),
  
  // Metadata for AI processing
  aiProcessedAt: timestamp("ai_processed_at"),
  aiConfidenceScore: text("ai_confidence_score"),
  aiTags: text("ai_tags"), // JSON array of skill/industry tags - validated in application layer
  
  // Versioning and soft delete
  version: varchar("version", { length: 50 }).notNull().default("1"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  
  // Lifecycle dates
  ...lifecycleDates,
}, (table) => ({
  // Index for querying user's experiences efficiently
  userIdIdx: index("experiences_user_id_idx").on(table.userId),
  
  // Compound index for date-based queries
  dateIdx: index("experiences_date_idx").on(table.userId, table.startDate),
  
  // Index for AI processing status
  aiIdx: index("experiences_ai_idx").on(table.userId, table.aiProcessedAt),

  // Ensure endDate is after startDate when provided
  dateCheck: check("date_check", 
    sql`end_date IS NULL OR end_date > start_date`
  ),

  // Ensure isCurrent is false when endDate is set
  currentCheck: check("current_check",
    sql`(is_current = false AND end_date IS NOT NULL) OR (is_current = true AND end_date IS NULL)`
  ),
}));
