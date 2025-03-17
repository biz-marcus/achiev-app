# @repo/db

This package handles database operations for the Achiev application using Drizzle ORM with PostgreSQL.

## Current Status

### Completed (as of March 17, 2024)
- ✅ PostgreSQL test environment setup with Vitest
- ✅ Experience table schema with comprehensive validations
  - Required fields validation
  - Date constraints (end date must be after start date)
  - Current status consistency checks
  - AI metadata handling
- ✅ Timestamp triggers and lifecycle utilities
- ✅ Test infrastructure with proper database setup/teardown

### Next Steps
1. Implement Achievements Table
   - SAR (Situation-Action-Result) format
   - AI-generated content storage
   - Job description matching metadata
   - Metrics and impact tracking
   - Foreign key relationship with Experiences table

2. Technical Considerations for Achievements
   - Implement cascading deletes with Experience table
   - Add validation rules for SAR format
   - Create test suite following same patterns as Experiences
   - Ensure proper indexing for job matching queries

## Development Setup

### Prerequisites
- PostgreSQL 15 installed locally
- Node.js and pnpm

### Local Development
1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file with:
```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/test
```

3. Run tests:
```bash
pnpm test
```

### Test Environment
- Uses local PostgreSQL database
- Tests automatically create/drop tables as needed
- Implements proper cleanup between test runs

## Schema Overview

### Experiences Table
- Tracks professional experiences
- Handles both current and past positions
- Includes AI-enhanced metadata for job matching
- Implements timestamp triggers for auditing

### Achievements Table (Planned)
- Will store SAR-formatted achievements
- Links to parent experience
- Includes AI-generated metadata for job matching
- Supports metrics and impact tracking 