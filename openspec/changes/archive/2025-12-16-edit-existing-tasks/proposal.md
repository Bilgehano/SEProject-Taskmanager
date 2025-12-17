# Change: Edit existing tasks

## Why
Users cannot modify tasks after creation. They need the ability to update title, description, and due date for existing tasks.

## What Changes
- Add an Edit button to each task item in the list.
- Populate the existing form with selected task data for editing.
- Validate and save changes to the existing task without creating a new one.
- Persist updated tasks to LocalStorage.

## Impact
- Affected specs: tasks (modify existing capability)
- Affected code: `src/main.ts`
