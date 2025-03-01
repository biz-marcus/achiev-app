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

## 2. Goals & Success Criteria

### Primary Goals for MVP

- Users can **input** their job experiences and achievements
- AI generates **well-structured, impactful resume bullets** based on best practices
- Users can **paste a job description**, and the system suggests **optimized resume content** based on alignment
- The chat-based interface **feels like an AI career coach** guiding users to articulate their experience better

### Success Metrics

- Users generate **at least one high-quality resume bullet** with minimal rework
- The AI suggestions feel **relevant and personalized** based on the user's input
- Users **complete an iteration of their resume** with AI assistance within minutes

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

### Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Node.js (API layer, business logic)
- **Database:** PostgreSQL (Supabase for authentication & storage)
- **AI Model:** OpenAI GPT (or alternative LLMs for NLP processing)
- **Hosting:** Vercel (frontend), Supabase/Fly.io (backend)

### System Architecture

1. **User inputs** experiences → Stored in DB
2. AI **processes inputs** → Generates structured resume bullets
3. User pastes a **job description** → AI matches experience & optimizes content
4. Output is displayed in chat **with editing options**

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