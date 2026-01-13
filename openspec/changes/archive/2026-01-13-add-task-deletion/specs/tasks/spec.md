## ADDED Requirements
### Requirement: Task Deletion
The system SHALL let users delete any existing task, regardless of completion state.
The system SHALL remove deleted tasks from LocalStorage and in-memory state without requiring a page reload.
The system SHALL preserve the current filter selection while updating the visible list after a deletion.

#### Scenario: Delete open task
- **WHEN** the user triggers delete on an open task from the list
- **THEN** the task disappears from the list immediately
- **AND** the task is removed from LocalStorage

#### Scenario: Delete completed task
- **WHEN** the user triggers delete on a completed task
- **THEN** the completed task is removed from the visible list and LocalStorage
- **AND** other tasks and their completion states remain unchanged

#### Scenario: Delete while filtered
- **WHEN** the user deletes a task while a filter (open, completed, or all) is active
- **THEN** the task is removed from the current filtered view and from LocalStorage
- **AND** the selected filter remains applied to the remaining tasks without showing stale entries
