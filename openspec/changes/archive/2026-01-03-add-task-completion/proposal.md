# Add Task Completion Proposal

## Problem
Users cannot currently mark tasks as completed or open. There is no way to toggle a task's completed state, nor is this state persisted in LocalStorage.

## Goal
Allow users to mark any task as completed or open, toggle this state, and persist it in LocalStorage. Changes should be minimal and not affect unrelated code.

## Scope
- Add a `completed` boolean property to each task.
- Allow toggling the completed state from the UI.
- Persist the completed state in LocalStorage.
- Do not refactor unrelated code or add extra features.

## Out of Scope
- Filtering by completed/open state (future work)
- Bulk completion or undo
- UI redesigns

## Related Specs
- Modifies: `tasks` capability

## Change-ID
2026-01-03-add-task-completion
