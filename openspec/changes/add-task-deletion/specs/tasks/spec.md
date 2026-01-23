# tasks Specification Delta

## ADDED Requirements

### Requirement: Task Deletion
The system SHALL allow users to delete a task from the list.
The system SHALL remove the deleted task from LocalStorage.
The system SHALL update the UI immediately when a task is deleted.

#### Scenario: Delete task successfully
- **WHEN** the user clicks the delete button on a task
- **THEN** the task is removed from the in-memory tasks array
- **AND** the task is removed from LocalStorage
- **AND** the UI updates immediately to show the updated task list without requiring a page reload

#### Scenario: Delete task with filter active
- **WHEN** the user has a filter applied (open, completed, or all) and clicks delete on a visible task
- **THEN** the task is deleted from the tasks array
- **AND** the filtered list updates to show the remaining tasks that match the current filter

#### Scenario: Delete last task
- **WHEN** the user deletes the last remaining task in the list
- **THEN** the "No tasks yet" message is displayed

#### Scenario: Other tasks remain unchanged
- **WHEN** the user deletes a specific task
- **THEN** all other tasks in the list remain unchanged in both state and LocalStorage
- **AND** no other task properties are modified
