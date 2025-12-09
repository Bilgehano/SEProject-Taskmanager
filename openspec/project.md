# Project Context

## Purpose
This project implements a small Task Tracker application using a spec-driven development workflow. The primary goal is to evaluate OpenSpec as a structured deployment and code-generation methodology and compare its efficiency against the legacy Specify tool, focusing on token usage, prompt quality, and development stability.

The application consists of five incremental features:
Create Task
Edit Task
Complete Task
Filter Tasks
Delete Task


## Tech Stack
- TypeScript
- React (functional components + hooks)
- Vite
- LocalStorage for persistence
- No backend services or external database

## Project Conventions

### Code Style
Functional React components only; no class components Descriptive camelCase for variables and functions PascalCase for components Keep components small and focused on one responsibility Avoid unnecessary abstractions or refactoring unless explicitly defined in `tasks.md` Prefer pure functions where logic is extracted

### Architecture Patterns
- Component-driven UI
- Local state management using React hooks
- Single source of truth for tasks stored in LocalStorage
- "Brownfield-first" change strategy:
- Changes must be additive
- Avoid rewriting existing components
- No refactor unless stated in a change proposal


### Testing Strategy
[Explain your testing approach and requirements]

### Git Workflow
[Describe your branching strategy and commit conventions]

## Domain Context
A "task" in this project represents a simple personal reminder for the user. It consists of:
- `title: string`
- `description: string`
- `dueDate: string (ISO date)`

Tasks can be created, edited, marked complete, filtered, and deleted. No collaboration, authentication, or multi-user capability exists. The project intentionally models a minimal domain to isolate OpenSpec's performance in a contained environment.

## Important Constraints
- No backend or network calls
- All task data must persist across browser refreshes using LocalStorage
- Features must be implemented independently in separate OpenSpec changes
- Minimal diff policy: avoid touching unrelated files
- No visual redesign or styling changes beyond what is required for functionality

## External Dependencies
None required beyond core web platform APIs. The browser's LocalStorage API is the only persistence layer.
