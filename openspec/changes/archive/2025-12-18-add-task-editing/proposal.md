# Change: Add task editing

## Why
Users can only create tasks today. If they mistype a title, description, or due date, they must delete and recreate the task, which is error-prone and time consuming.

## What Changes
- Add an edit action per task that loads its data into the form for modification.
- Allow edits to title, description, and due date with the same required-field validation as creation.
- Persist updated tasks to LocalStorage and refresh the list to reflect changes immediately.

## Impact
- Affected specs: tasks
- Affected code: src/main.ts, src/style.css
