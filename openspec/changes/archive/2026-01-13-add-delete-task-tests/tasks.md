# Tasks: Add Automated Tests for Delete Task Feature

## Change ID
add-delete-task-tests

## Implementation Checklist

### 1. Create Test File
- [x] Create `src/taskLogic.test.ts` with Vitest test structure

### 2. Implement Delete Task Tests
- [x] Test: Deleting a task removes it from the task array in LocalStorage
- [x] Test: Deleting a task preserves all other tasks unchanged
- [x] Test: Deleting a task when multiple tasks exist affects only the target task
- [x] Test: Deleting the first task in a list leaves remaining tasks intact
- [x] Test: Deleting the last task in a list leaves remaining tasks intact
- [x] Test: Deleting a middle task in a list leaves remaining tasks intact

### 3. Validation
- [x] Run `npm test` to confirm all tests pass
- [x] Verify tests are strictly scoped to logic/state (no UI assertions)

## Dependencies
- Vitest (already installed)

## Notes
- Tests will directly manipulate LocalStorage to simulate task state
- Tests will import and invoke the application's storage key constant if exported, or use the known key `taskmanager.tasks`
- No DOM or rendering assertions—focus on data integrity
