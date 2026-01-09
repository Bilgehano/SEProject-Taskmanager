# Change: Add automated tests for filter-tasks capability

## Why
The filter-tasks capability (Feature 4) is implemented but lacks automated test coverage. Adding tests ensures the filtering logic behaves correctly across scenarios, prevents regressions when future changes are made, and verifies integration with task creation and completion behavior.

## What Changes
- Add automated unit tests for `filterTasksByCompletion` function in `taskFilter.ts`
- Add integration tests verifying filter behavior with task creation and completion state changes
- Tests cover: filtering open tasks, filtering completed tasks, toggling completion updates filtered results, mixed completion states, and existing task creation/completion behavior under filtering

## Impact
- Affected specs: filter-tasks, tasks (validation only, no spec modifications)
- Affected code: New test file(s) only; no changes to application code or persistence behavior
- Dependencies: Vitest (already configured in package.json)
