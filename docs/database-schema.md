# Achiev-app Database Schema Design

## Overview

This document outlines the database schema for the Achiev-app, focusing on storing user profiles, job experiences, achievements, and resume content.

## Tables

### 1. users (existing)
The existing users table from Clerk authentication will be used as-is:
```typescript
users = pgTable("users", {
  userId: varchar("user_id", { length: 128 }).primaryKey(),
  email: text("email").notNull(),
  ...lifecycleDates,
});
```

### 2. profiles
Stores additional user profile information beyond authentication data:
```typescript
profiles = pgTable("profiles", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  headline: varchar("headline", { length: 255 }),
  summary: text("summary"),
  industry: varchar("industry", { length: 100 }),
  location: varchar("location", { length: 100 }),
  careerGoals: text("career_goals"),
  ...lifecycleDates,
});
```

### 3. experiences
Stores job experiences for each user:
```typescript
experiences = pgTable("experiences", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  isCurrent: boolean("is_current").default(false),
  location: varchar("location", { length: 255 }),
  description: text("description"),
  ...lifecycleDates,
});
```

### 4. achievements
Stores individual achievements related to experiences:
```typescript
achievements = pgTable("achievements", {
  id: varchar("id", { length: 255 }).primaryKey(),
  experienceId: varchar("experience_id", { length: 255 })
    .notNull()
    .references(() => experiences.id),
  description: text("description").notNull(),
  impact: text("impact"),
  skills: text("skills"),
  ...lifecycleDates,
});
```

### 5. resumeBullets
Stores AI-generated resume bullets:
```typescript
resumeBullets = pgTable("resume_bullets", {
  id: varchar("id", { length: 255 }).primaryKey(),
  achievementId: varchar("achievement_id", { length: 255 })
    .references(() => achievements.id),
  experienceId: varchar("experience_id", { length: 255 })
    .references(() => experiences.id),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  content: text("content").notNull(),
  isCustom: boolean("is_custom").default(false),
  aiGenerated: boolean("ai_generated").default(true),
  confidenceScore: integer("confidence_score"),
  ...lifecycleDates,
});
```

### 6. jobDescriptions
Stores job descriptions for tailoring resumes:
```typescript
jobDescriptions = pgTable("job_descriptions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  title: varchar("title", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  description: text("description").notNull(),
  keySkills: text("key_skills"),
  requirements: text("requirements"),
  url: text("url"),
  ...lifecycleDates,
});
```

### 7. tailoredResumes
Stores tailored resume content for specific job descriptions:
```typescript
tailoredResumes = pgTable("tailored_resumes", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  jobDescriptionId: varchar("job_description_id", { length: 255 })
    .references(() => jobDescriptions.id),
  name: varchar("name", { length: 255 }).notNull(),
  summary: text("summary"),
  ...lifecycleDates,
});
```

### 8. tailoredBullets
Stores the mapping between resume bullets and tailored resumes:
```typescript
tailoredBullets = pgTable("tailored_bullets", {
  id: varchar("id", { length: 255 }).primaryKey(),
  tailoredResumeId: varchar("tailored_resume_id", { length: 255 })
    .notNull()
    .references(() => tailoredResumes.id),
  resumeBulletId: varchar("resume_bullet_id", { length: 255 })
    .notNull()
    .references(() => resumeBullets.id),
  order: integer("order").notNull(),
  ...lifecycleDates,
});
```

### 9. conversations
Stores chat conversations with the AI assistant:
```typescript
conversations = pgTable("conversations", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  title: varchar("title", { length: 255 }),
  ...lifecycleDates,
});
```

### 10. messages
Stores individual messages in conversations:
```typescript
messages = pgTable("messages", {
  id: varchar("id", { length: 255 }).primaryKey(),
  conversationId: varchar("conversation_id", { length: 255 })
    .notNull()
    .references(() => conversations.id),
  content: text("content").notNull(),
  role: varchar("role", { length: 50 }).notNull(), // 'user' or 'assistant'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  ...lifecycleDates,
});
```

## Relationships

- **users** ← one-to-one → **profiles**
- **users** ← one-to-many → **experiences**
- **experiences** ← one-to-many → **achievements**
- **achievements** ← one-to-many → **resumeBullets**
- **users** ← one-to-many → **jobDescriptions**
- **users** ← one-to-many → **tailoredResumes**
- **jobDescriptions** ← one-to-many → **tailoredResumes**
- **tailoredResumes** ← many-to-many → **resumeBullets** (via tailoredBullets)
- **users** ← one-to-many → **conversations**
- **conversations** ← one-to-many → **messages**

## Indexes

For performance optimization, we'll add the following indexes:
- userId in all tables that reference users
- experienceId in achievements and resumeBullets
- achievementId in resumeBullets
- jobDescriptionId in tailoredResumes
- tailoredResumeId in tailoredBullets
- conversationId in messages 