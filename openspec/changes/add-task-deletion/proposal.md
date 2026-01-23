# Change Proposal: add-task-deletion

**Date**: 2026-01-23  
**Status**: Draft  
**Type**: Feature Addition

## Summary
Add the ability to delete tasks from the task list. Each task will display a delete button that, when clicked, removes the task from both the in-memory state and LocalStorage, with the UI updating immediately to reflect the change.

## Motivation
Users need the ability to remove tasks they no longer want to track. Currently, tasks can be created, edited, completed, and filtered, but cannot be removed. This creates clutter over time and reduces the usability of the application.

## Scope
- **Capabilities Modified**: tasks (task deletion)
- **Features Added**: Delete button per task
- **Features Modified**: None
- **Features Removed**: None
- **Breaking Changes**: None

## Requirements
- Add a delete button to each task in the list UI
- When clicked, the task is removed from the tasks array
- The task is removed from LocalStorage
- UI updates immediately without page reload
- Other tasks remain unchanged
- No new dependencies or configuration changes

## Constraints
- Minimal code changes
- No touching other existing features (create, edit, complete, filter)
- No new dependencies or build configuration
- Single-file change (main.ts)

## Implementation Notes
- Add delete button next to existing Edit button in task header
- Wire up click handler to remove task from tasks array by ID
- Call saveTasks() to persist to LocalStorage
- Call render() to update UI

## Related Changes
None

## Risks
- Low risk: Simple array removal operation
- No breaking changes to existing functionality
