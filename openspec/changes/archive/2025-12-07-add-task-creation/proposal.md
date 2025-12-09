# Change: Add task creation

## Why
The current app only shows the Vite starter counter and does not let users add tasks. We need a simple way for users to create tasks with a title, description, and due date, and persist them in LocalStorage so the task list survives reloads.

## What Changes
- Add a minimal UI for entering task title, description, and due date.
- Save new tasks to LocalStorage and render them immediately in the on-page task list.
- Keep the implementation minimal and avoid touching unrelated code.

## Impact
- Affected specs: tasks (new capability)
- Affected code: `src/main.ts`, `src/style.css` (only if needed for basic layout)
