# Change: Add task editing

## Why
Users cannot currently change the title, description, or due date of an existing task. This limits the usefulness of the task tracker, as mistakes or changes in plans cannot be reflected. Editing is a core part of task management.

## What Changes
- Add the ability to edit a task's title, description, and due date from the UI.
- Persist edits to LocalStorage, updating the correct task in-place.
- Reuse required field validation for edits.
- Keep the implementation minimal and avoid touching unrelated code.

## Impact
- Affected specs: tasks (edit capability)
- Affected code: src/main.ts (UI, logic), possibly src/style.css (minimal styling for edit form)
