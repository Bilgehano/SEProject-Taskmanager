# Change: Add task editing

## Why
Users need to update existing tasks without recreating them.

## What Changes
- Add edit flow for existing tasks using current task model
- Enforce required title and due date on edits with clear errors
- Persist edited tasks to LocalStorage without creating new entries

## Impact
- Affected specs: tasks
- Affected code: task list UI, task form, LocalStorage persistence
