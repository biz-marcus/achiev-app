# Achiev-app: AI-powered Career Strategist
### Product Requirements Document (PRD)

**Version:** MVP 1.0  
**Date:** 3/1/2025  
**Author:** Marcus Jones

---

## 1. Overview

Achiev is an **AI-powered career strategist** designed to help professionals gain clarity on their **career trajectory, strengths, and achievements** while providing **intelligent, tailored career materials** that position them for success.

Unlike traditional resume builders, Achiev doesn't just format past experiences—it **deeply understands users** by engaging them in **conversational career exploration**. Through **AI-driven questioning**, Achiev uncovers a user's **competency level, transferable skills, and hidden strengths**, ensuring they recognize their full professional value.

### Core Value Proposition

Achiev serves as both a **strategic career guide** and a **personal branding assistant**, helping users:

- **Clarify career direction** – identifying strengths, gaps, and ideal next steps
- **Uncover hidden achievements** – surfacing impactful experiences users might overlook
- **Assess and articulate competencies** – mapping skills to industry expectations
- **Generate compelling application materials** – crafting resumes, cover letters, and personal branding statements
- **Align experience to job opportunities** – ensuring applications match industry needs and employer expectations

### MVP Scope

The first version of Achiev will focus on **interactive AI-powered career discovery**—guiding users through structured conversations to **extract** and **articulate** their most impactful experiences. Users will receive **AI-generated resume bullets and application materials** tailored to their unique skills and job targets.

Future iterations will deepen Achiev's ability to provide **career trajectory analysis, automated job application customization, and real-time coaching insights**.

---

## Implementation Status
*Last Updated: [Current Date]*

### Completed Features
- **Chat-Based AI Assistant**
  - Responsive chat interface with message history
  - OpenAI GPT integration with error handling
  - Career-focused conversation starters
  - Natural coaching conversation flow
  - Real-time typing indicators
  
- **UI/UX Foundation**
  - Clean, modern interface design
  - Responsive layout
  - Message threading
  - Input field with integrated actions
  - New chat functionality

### In Progress
- **Experience Capture**
  - ✓ Basic conversation flow
  - ⟳ Structured data extraction
  - ⟳ Achievement refinement logic
  
- **Resume Enhancement**
  - ✓ Initial coaching dialogue
  - ⟳ Bullet point generation
  - ⟳ Achievement quantification

### Not Started
- Database schema implementation
- User profile management
- Job description parsing
- Resume tailoring features
- Data persistence layer
- Authentication system

### Next Priority
1. Complete experience capture functionality
2. Implement achievement refinement logic
3. Add structured data storage
4. Develop resume bullet generation

*Legend: ✓ Completed, ⟳ In Progress, Blank = Not Started*

---

## 2. Goals & Success Criteria

### Primary MVP Goals (Updated)

- Users can engage in a **natural coaching conversation** that guides them through articulating their professional experiences
- System can **extract and structure key achievements** from conversational input
- AI generates **well-crafted, impactful resume bullets** following industry best practices
- Users can receive **tailored content optimization** based on job description alignment
- The experience feels like working with a **knowledgeable career coach** rather than a form-filling tool

### Success Metrics (Implementation-Based)

#### User Experience Metrics
- **Conversation Quality**
  - 85% of test users report the AI conversation feels natural and helpful
  - Average session duration of 15+ minutes, indicating sustained engagement
  - 90% completion rate for initial experience capture flow
  - Users successfully generate 3+ high-quality resume bullets per job experience

#### Technical Performance Metrics
- **Response Time & Reliability**
  - AI response time consistently under 3 seconds (current average: ~3s)
  - 95% uptime for OpenAI API integration
  - Error rate below 2% in API interactions
  - Successful streaming of responses with real-time typing indicators

#### Data Quality Metrics
- **Content Generation**
  - 80% of AI-generated resume bullets require minimal or no editing
  - Generated content includes quantifiable achievements when data is provided
  - Successful extraction of structured data from 80% of user conversations
  - Job description keyword matching accuracy of 85%+

#### Implementation Progress Metrics
- **Feature Completion**
  - ✓ Chat interface with real-time response streaming
  - ✓ Natural conversation flow with context retention
  - ⟳ Structured data extraction from conversations
  - ⟳ Achievement refinement and bullet generation
  - ⟳ Job description parsing and matching

*Legend: ✓ Completed, ⟳ In Progress*

---

## 3. User Flow

### 1. User Onboarding
- Users provide basic details (job title, industry, career goals)
- AI asks guided questions about their experience
- Users can upload or paste their existing resume

### 2. Profile & Experience Capture
- Users input **past job roles** and **key achievements**
- AI refines responses and builds a **structured career profile**

### 3. Resume Bullet Generation
- Users can select an experience and generate **optimized resume bullets**
- AI ensures bullets follow **strong action-oriented phrasing**
- Users can regenerate or tweak suggestions

### 4. Job Description Tailoring
- Users paste a **job description** into the system
- AI matches their experiences to **highlight the most relevant achievements**
- Suggestions are aligned with **keywords and role expectations**

---

## 4. Features & Functionality

### Core MVP Features

- **Chat-Based AI Assistant** – Guides users through experience capture & bullet generation
- **Experience Input & Editing** – Users enter job details; AI refines them
- **Resume Bullet Suggestions** – AI generates bullet points following best practices
- **Job Description Parsing** – AI analyzes job descriptions to tailor resume bullets
- **Profile Storage** – Users' career details persist for future applications

### Future Features (Post-MVP)

- **Automated Job Matching** – Pulls LinkedIn saved jobs & tailors applications
- **Cover Letter Generation** – AI drafts cover letters based on resume & job description
- **1-Click Applications** – Users approve AI-generated applications with minimal edits
- **Integration with LinkedIn & ATS** – Auto-fill applications via APIs

---

## 5. Technical Overview

### Current Implementation State

#### AI Implementation
- **Model**: OpenAI GPT-4 Turbo for primary chat interactions
- **Prompt Engineering**:
  - System prompt optimized for natural coaching dialogue
  - Temperature setting (0.6) for balanced natural conversation while maintaining consistency
  - Structured conversation flow with career-focused context retention
  - Error handling for API failures and token limits
  - Real-time streaming response integration

#### Architecture & Infrastructure
- **Frontend:** 
  - Next.js 15.2.0 with Turbopack
  - React 19 with Server Components
  - Real-time chat interface with SSE streaming
  - TypeScript 5 for type safety
  - Tailwind CSS v4 for styling
  - Radix UI primitives for accessible components
  
- **Backend:** 
  - Hono v4 for API routing and middleware
  - OpenAI SDK with streaming support
  - Structured error handling with custom logger
  - Type-safe API endpoints with Zod validation
  
- **Database:** (Planned)
  - PostgreSQL with Drizzle ORM
  - Schema design for user profiles, conversations, and achievements
  - Clerk for authentication & user management

#### Technical Challenges & Solutions
1. **Message Streaming**
   - Implemented server-sent events for real-time responses
   - Added typing indicators and loading states
   
2. **Conversation Context**
   - Structured message history management
   - Efficient token usage in prompt construction
   
3. **Type Safety**
   - End-to-end type safety with shared types
   - Zod validation for API requests/responses

### Next Technical Priorities
1. **Database Implementation**
   - User profile schema
   - Achievement storage structure
   - Session management
   
2. **Enhanced AI Features**
   - Structured data extraction from conversations
   - Achievement quantification logic
   - Resume bullet optimization

### System Architecture

1. **User Interface Layer**
   - React components for chat and profile management
   - Real-time updates via server-sent events
   - Responsive design for all devices

2. **API Layer**
   - RESTful endpoints for chat and profile management
   - Middleware for authentication and validation
   - Error handling and logging

3. **AI Processing Layer**
   - OpenAI integration with optimized prompts
   - Context management and token optimization
   - Structured data extraction

4. **Data Layer** (In Progress)
   - PostgreSQL for persistent storage
   - Drizzle ORM for type-safe queries
   - Migration and seeding infrastructure

---

## 6. Risks & Open Questions

### Potential Risks

- **AI-generated content quality** – Ensuring bullets are accurate & compelling
- **Job description alignment** – Matching experiences effectively to job postings
- **User adoption & engagement** – Making the AI workflow intuitive & valuable

### Unanswered Questions

- How much user input is needed before AI can generate high-quality bullets?
- What's the best way to store structured career data for reuse?
- Should we introduce **AI "confidence scores"** to help users judge quality?

---

## 7. Next Steps

- Implement **database schema** for structured career profiles
- Set up **Cursor development rules & GitHub integration**
- Build **basic chat UI** for AI-driven resume bullet generation

## 8. Testing & Validation Approach

### AI Coaching Evaluation

#### System Prompt Testing
1. **Conversation Flow Tests**
   - Validate coaching personality consistency
   - Test context retention across multi-turn dialogues
   - Verify career-focused guidance stays on track
   - Temperature setting (0.6) evaluation for response variability

2. **Experience Capture Tests**
   - Test structured data extraction from free-form responses
   - Validate follow-up question generation
   - Test handling of incomplete or vague inputs
   - Verify achievement identification accuracy

#### Implementation-Specific Test Scenarios
1. **Real-time Interaction Testing**
   - Verify SSE streaming performance
   - Test typing indicator accuracy
   - Measure response chunking efficiency
   - Monitor token usage optimization

2. **Data Processing Validation**
   - Test Zod schema validation for API requests
   - Verify type safety across the full stack
   - Test error handling and recovery
   - Validate message history management

3. **Resume Enhancement Testing**
   - Test bullet generation across job types
   - Verify quantification prompting effectiveness
   - Test improvement of generic statements
   - Validate job description alignment accuracy

#### Quality Metrics & Monitoring
1. **Response Quality Metrics**
   - **Relevance Score** (1-10):
     - Context adherence
     - Career focus maintenance
     - Follow-up appropriateness
   
   - **Technical Performance**:
     - Response time tracking (target: <3s)
     - API error rate monitoring
     - Stream interruption frequency
     - Token usage efficiency

   - **Content Quality**:
     - Achievement extraction accuracy
     - Quantification presence
     - Action verb usage
     - Industry terminology appropriateness

2. **Automated Testing Suite**
   - Unit tests for API endpoints
   - Integration tests for OpenAI interaction
   - End-to-end conversation flow tests
   - Performance benchmark tests

#### User Feedback Collection
1. **In-App Feedback**
   - Quick reaction buttons after AI responses
   - Optional detailed feedback forms
   - Session duration tracking
   - Interaction pattern analysis

2. **Quality Assurance Process**
   - Internal team testing rotation
   - Structured feedback collection
   - Weekly review of error logs
   - Regular prompt refinement cycles

### Testing Timeline & Milestones

#### Phase 1: Internal Testing (Current)
- System prompt refinement
- Response quality baseline establishment
- Performance metrics gathering
- Error pattern identification

#### Phase 2: Limited Beta (Upcoming)
- 10-15 test users
- Focused testing scenarios
- Feedback collection and analysis
- Prompt and UX refinement

#### Phase 3: Expanded Testing
- Broader user group testing
- A/B testing of prompt variations
- Performance optimization
- Feature completion validation

### Success Criteria Validation
- Weekly review of technical metrics
- Bi-weekly prompt refinement sessions
- Monthly user feedback analysis
- Continuous performance monitoring

*Note: All testing incorporates current implementation constraints and focuses on validating implemented features while preparing for planned enhancements.*