# Achiev-app API Endpoints

## Overview

This document outlines the API endpoints required for the Achiev-app, organized by module.

## Authentication

Authentication is handled by Clerk. All endpoints except public ones require authentication.

## User Profiles

### GET /profiles
- **Description**: Get the current user's profile
- **Authentication**: Required
- **Response**: User profile data

### POST /profiles
- **Description**: Create or update the current user's profile
- **Authentication**: Required
- **Request Body**: Profile data
- **Response**: Updated profile data

## Experiences

### GET /experiences
- **Description**: Get all experiences for the current user
- **Authentication**: Required
- **Response**: Array of experience objects

### GET /experiences/:id
- **Description**: Get a specific experience by ID
- **Authentication**: Required
- **Response**: Experience object

### POST /experiences
- **Description**: Create a new experience
- **Authentication**: Required
- **Request Body**: Experience data
- **Response**: Created experience object

### PUT /experiences/:id
- **Description**: Update an existing experience
- **Authentication**: Required
- **Request Body**: Updated experience data
- **Response**: Updated experience object

### DELETE /experiences/:id
- **Description**: Delete an experience
- **Authentication**: Required
- **Response**: Success message

## Achievements

### GET /experiences/:experienceId/achievements
- **Description**: Get all achievements for a specific experience
- **Authentication**: Required
- **Response**: Array of achievement objects

### GET /achievements/:id
- **Description**: Get a specific achievement by ID
- **Authentication**: Required
- **Response**: Achievement object

### POST /experiences/:experienceId/achievements
- **Description**: Create a new achievement for an experience
- **Authentication**: Required
- **Request Body**: Achievement data
- **Response**: Created achievement object

### PUT /achievements/:id
- **Description**: Update an existing achievement
- **Authentication**: Required
- **Request Body**: Updated achievement data
- **Response**: Updated achievement object

### DELETE /achievements/:id
- **Description**: Delete an achievement
- **Authentication**: Required
- **Response**: Success message

## Resume Bullets

### GET /resume-bullets
- **Description**: Get all resume bullets for the current user
- **Authentication**: Required
- **Query Parameters**: 
  - `experienceId` (optional): Filter by experience
  - `achievementId` (optional): Filter by achievement
- **Response**: Array of resume bullet objects

### GET /resume-bullets/:id
- **Description**: Get a specific resume bullet by ID
- **Authentication**: Required
- **Response**: Resume bullet object

### POST /resume-bullets/generate
- **Description**: Generate resume bullets using AI
- **Authentication**: Required
- **Request Body**: 
  - `experienceId` or `achievementId`: Source for generation
  - `count` (optional): Number of bullets to generate
- **Response**: Array of generated resume bullet objects

### POST /resume-bullets
- **Description**: Create a custom resume bullet
- **Authentication**: Required
- **Request Body**: Resume bullet data
- **Response**: Created resume bullet object

### PUT /resume-bullets/:id
- **Description**: Update an existing resume bullet
- **Authentication**: Required
- **Request Body**: Updated resume bullet data
- **Response**: Updated resume bullet object

### DELETE /resume-bullets/:id
- **Description**: Delete a resume bullet
- **Authentication**: Required
- **Response**: Success message

## Job Descriptions

### GET /job-descriptions
- **Description**: Get all job descriptions for the current user
- **Authentication**: Required
- **Response**: Array of job description objects

### GET /job-descriptions/:id
- **Description**: Get a specific job description by ID
- **Authentication**: Required
- **Response**: Job description object

### POST /job-descriptions
- **Description**: Create a new job description
- **Authentication**: Required
- **Request Body**: Job description data
- **Response**: Created job description object

### POST /job-descriptions/parse
- **Description**: Parse a job description using AI
- **Authentication**: Required
- **Request Body**: Raw job description text
- **Response**: Structured job description data

### PUT /job-descriptions/:id
- **Description**: Update an existing job description
- **Authentication**: Required
- **Request Body**: Updated job description data
- **Response**: Updated job description object

### DELETE /job-descriptions/:id
- **Description**: Delete a job description
- **Authentication**: Required
- **Response**: Success message

## Tailored Resumes

### GET /tailored-resumes
- **Description**: Get all tailored resumes for the current user
- **Authentication**: Required
- **Response**: Array of tailored resume objects

### GET /tailored-resumes/:id
- **Description**: Get a specific tailored resume by ID
- **Authentication**: Required
- **Response**: Tailored resume object with associated bullets

### POST /tailored-resumes
- **Description**: Create a new tailored resume
- **Authentication**: Required
- **Request Body**: 
  - `jobDescriptionId`: Job description to tailor for
  - `name`: Name of the tailored resume
- **Response**: Created tailored resume object

### POST /tailored-resumes/generate
- **Description**: Generate a tailored resume using AI
- **Authentication**: Required
- **Request Body**: 
  - `jobDescriptionId`: Job description to tailor for
  - `name`: Name of the tailored resume
- **Response**: Generated tailored resume with optimized bullets

### PUT /tailored-resumes/:id
- **Description**: Update an existing tailored resume
- **Authentication**: Required
- **Request Body**: Updated tailored resume data
- **Response**: Updated tailored resume object

### DELETE /tailored-resumes/:id
- **Description**: Delete a tailored resume
- **Authentication**: Required
- **Response**: Success message

## Tailored Bullets

### GET /tailored-resumes/:resumeId/bullets
- **Description**: Get all bullets for a tailored resume
- **Authentication**: Required
- **Response**: Array of tailored bullet objects with ordering

### POST /tailored-resumes/:resumeId/bullets
- **Description**: Add a bullet to a tailored resume
- **Authentication**: Required
- **Request Body**: 
  - `resumeBulletId`: ID of the bullet to add
  - `order`: Position in the resume
- **Response**: Created tailored bullet object

### PUT /tailored-resumes/:resumeId/bullets/:id
- **Description**: Update a tailored bullet (usually order)
- **Authentication**: Required
- **Request Body**: Updated tailored bullet data
- **Response**: Updated tailored bullet object

### DELETE /tailored-resumes/:resumeId/bullets/:id
- **Description**: Remove a bullet from a tailored resume
- **Authentication**: Required
- **Response**: Success message

## Conversations

### GET /conversations
- **Description**: Get all conversations for the current user
- **Authentication**: Required
- **Response**: Array of conversation objects

### GET /conversations/:id
- **Description**: Get a specific conversation by ID
- **Authentication**: Required
- **Response**: Conversation object with messages

### POST /conversations
- **Description**: Create a new conversation
- **Authentication**: Required
- **Request Body**: Initial conversation data
- **Response**: Created conversation object

### PUT /conversations/:id
- **Description**: Update a conversation (e.g., title)
- **Authentication**: Required
- **Request Body**: Updated conversation data
- **Response**: Updated conversation object

### DELETE /conversations/:id
- **Description**: Delete a conversation
- **Authentication**: Required
- **Response**: Success message

## Messages

### GET /conversations/:conversationId/messages
- **Description**: Get all messages for a conversation
- **Authentication**: Required
- **Response**: Array of message objects

### POST /conversations/:conversationId/messages
- **Description**: Add a message to a conversation
- **Authentication**: Required
- **Request Body**: Message data
- **Response**: Created message object

### POST /conversations/:conversationId/chat
- **Description**: Send a message to the AI assistant and get a response
- **Authentication**: Required
- **Request Body**: User message content
- **Response**: AI assistant response message

## AI Services

### POST /ai/generate-bullets
- **Description**: Generate resume bullets from experience or achievement
- **Authentication**: Required
- **Request Body**: Source data and generation parameters
- **Response**: Generated bullets

### POST /ai/analyze-job
- **Description**: Analyze a job description
- **Authentication**: Required
- **Request Body**: Job description text
- **Response**: Structured job data with key skills and requirements

### POST /ai/tailor-resume
- **Description**: Tailor resume content to a job description
- **Authentication**: Required
- **Request Body**: Job description ID and user profile/experience data
- **Response**: Tailored resume content 