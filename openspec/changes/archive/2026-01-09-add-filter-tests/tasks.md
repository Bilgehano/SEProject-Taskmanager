# Tasks: add-filter-tests

## 1. Setup
- [x] Verify Vitest is installed and `npm run test` works (already in package.json)
- [x] Create test file `src/taskFilter.test.ts`

## 2. Unit Tests for filterTasksByCompletion
- [x] Test: Returns only open tasks when filter is 'open'
- [x] Test: Returns only completed tasks when filter is 'completed'
- [x] Test: Returns all tasks when filter is 'all'
- [x] Test: Returns all tasks for unexpected filter values (fallback behavior)
- [x] Test: Returns empty array when no tasks match the filter
- [x] Test: Handles empty task array gracefully

## 3. Integration Tests for Mixed Completion States
- [x] Test: Multiple tasks with mixed completion states filtered correctly with 'open'
- [x] Test: Multiple tasks with mixed completion states filtered correctly with 'completed'
- [x] Test: All tasks shown when filter is 'all' regardless of completion state

## 4. Integration Tests for Toggling Completion State
- [x] Test: After toggling a task to completed, re-filtering with 'open' excludes it
- [x] Test: After toggling a task to open, re-filtering with 'completed' excludes it
- [x] Test: After toggling a task, re-filtering with 'all' still includes it

## 5. Integration Tests for Task Creation Under Filtering
- [x] Test: Newly created tasks (completed=false) appear in 'open' filter
- [x] Test: Newly created tasks (completed=false) do not appear in 'completed' filter
- [x] Test: Newly created tasks appear in 'all' filter

## 6. Validation
- [x] Run `npm run test` and confirm all tests pass
- [x] Verify tests are automated with no user interaction required
- [x] Verify tests produce clear pass/fail output
