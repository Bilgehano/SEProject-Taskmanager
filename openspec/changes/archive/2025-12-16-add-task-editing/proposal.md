# Change: Enable editing existing tasks

## Why
- Users cannot update task details after creation.

## What Changes
- Allow editing title, description, due date using existing task model.
- Enforce current validation rules with inline errors.
- Persist edits in LocalStorage without creating new tasks.

## Impact
- Specs: tasks
- Code: task form, task list storage logic
