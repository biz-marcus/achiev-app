# Achiev-app UI/UX Design

## Overview

This document outlines the UI/UX design for the Achiev-app, focusing on the key screens and components needed to implement the core features.

## Design Principles

- **Conversational Interface**: The primary interaction model is chat-based, making the experience feel like talking to a career coach.
- **Progressive Disclosure**: Information and options are revealed progressively to avoid overwhelming users.
- **Guided Experience**: Clear pathways guide users through the process of capturing experiences and generating resume content.
- **Visual Feedback**: Provide clear visual feedback for AI-generated content and user actions.
- **Mobile-First**: Design for mobile devices first, then enhance for larger screens.

## Color Palette

- **Primary**: #3B82F6 (Blue)
- **Secondary**: #10B981 (Green)
- **Accent**: #8B5CF6 (Purple)
- **Background**: #F9FAFB (Light Gray)
- **Surface**: #FFFFFF (White)
- **Text**: #1F2937 (Dark Gray)
- **Error**: #EF4444 (Red)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Amber)

## Typography

- **Headings**: Inter, Bold
- **Body**: Inter, Regular
- **UI Elements**: Inter, Medium
- **Code/Monospace**: JetBrains Mono (for technical content)

## Key Screens

### 1. Landing Page

- **Hero Section**: Clear value proposition and call-to-action
- **Feature Highlights**: Visual representation of key features
- **Testimonials**: Social proof from users (future)
- **Call-to-Action**: Sign up/login buttons

### 2. Dashboard

- **Welcome Message**: Personalized greeting
- **Quick Actions**: Start new conversation, view experiences, etc.
- **Recent Activity**: Recently edited experiences or generated bullets
- **Progress Tracker**: Visual indication of profile completion

### 3. Chat Interface

- **Message Thread**: Conversation history with the AI assistant
- **Input Area**: Text input with send button
- **Suggestion Chips**: Quick response options
- **Typing Indicator**: Visual feedback when AI is generating a response
- **Action Cards**: Interactive cards for structured data input

### 4. Experience Capture

- **Experience Form**: Fields for company, title, dates, etc.
- **Achievement Input**: Text area for describing achievements
- **Skills Tagging**: Interface for tagging relevant skills
- **Preview**: Real-time preview of formatted experience

### 5. Resume Bullet Generator

- **Source Selection**: Choose experience/achievement to generate bullets for
- **Generation Options**: Parameters for bullet style, length, etc.
- **Results Display**: Generated bullets with options to edit, save, or regenerate
- **Confidence Indicator**: Visual indication of AI confidence in each bullet

### 6. Job Description Analyzer

- **Input Area**: Text area for pasting job description
- **Analysis Results**: Extracted key requirements and skills
- **Match Indicators**: Visual representation of match with user's profile
- **Tailoring Suggestions**: Recommended experiences to highlight

### 7. Tailored Resume Builder

- **Job Selection**: Choose job description to tailor for
- **Section Organizer**: Interface for arranging resume sections
- **Bullet Selector**: Choose and order bullets for each experience
- **Preview**: Real-time preview of formatted resume
- **Export Options**: Download as PDF, Word, etc.

### 8. Profile Settings

- **Personal Information**: Edit name, contact info, etc.
- **Preferences**: Customize AI behavior and UI settings
- **Account Management**: Subscription, billing, etc.
- **Data Management**: Export, delete data options

## Components

### Navigation

- **Top Bar**: Logo, user menu, notifications
- **Side Navigation**: Dashboard, Experiences, Resumes, Jobs, Settings
- **Bottom Navigation** (Mobile): Quick access to key features

### Chat Components

- **Message Bubble**: Container for chat messages
- **User Message**: Right-aligned, primary color
- **AI Message**: Left-aligned, surface color
- **System Message**: Centered, muted color
- **Action Card**: Interactive card with form elements
- **Suggestion Chips**: Horizontal scrolling chips for quick responses

### Forms

- **Input Field**: Text input with label and validation
- **Text Area**: Multi-line text input
- **Date Picker**: Calendar interface for selecting dates
- **Dropdown**: Selection from predefined options
- **Checkbox/Toggle**: Binary selection
- **Tag Input**: Add and remove tags (skills, keywords)

### Cards

- **Experience Card**: Summary of job experience
- **Achievement Card**: Individual achievement with actions
- **Bullet Card**: Resume bullet with edit/delete options
- **Job Card**: Summary of job description

### Feedback

- **Toast Notifications**: Temporary messages for actions
- **Loading States**: Skeletons and spinners
- **Empty States**: Helpful guidance when no data exists
- **Error States**: Clear error messages with recovery options

### Modals

- **Confirmation Modal**: Verify destructive actions
- **Form Modal**: Capture structured data
- **Preview Modal**: View formatted output

## Responsive Behavior

- **Mobile** (<768px): Single column layout, bottom navigation
- **Tablet** (768px-1024px): Two column layout, side navigation
- **Desktop** (>1024px): Three column layout, side navigation

## Accessibility

- **Color Contrast**: WCAG AA compliant
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML and ARIA labels
- **Focus States**: Clear visual indication of focus

## Animation and Transitions

- **Page Transitions**: Smooth transitions between pages
- **Component Animations**: Subtle animations for interactive elements
- **Loading Animations**: Engaging loading states

## Implementation Notes

- Use Shadcn UI components as the foundation
- Implement with Tailwind CSS for styling
- Use Radix UI for complex interactive components
- Ensure responsive design with mobile-first approach
- Implement dark mode support 