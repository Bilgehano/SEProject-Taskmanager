# Change: Add task deletion capability

## Why
Users need a clear way to remove tasks they no longer want to track so lists stay relevant and manageable.

## What Changes
- Add a deletion control in the task list that works for open and completed tasks.
- Remove deleted tasks from in-memory state and LocalStorage without requiring a page reload.
- Ensure filtering, completion toggles, and inline edit states stay consistent when a task is removed.

## Impact
- Affected specs: tasks
- Affected code: src/main.ts, src/taskFilter.ts, src/style.css (UI affordance)
