# tasks Specification

## Purpose
TBD - created by archiving change add-task-creation. Update Purpose after archive.
## Requirements
### Requirement: Task Creation
The system SHALL let users create a task with a title, description, and due date.
The system SHALL let users edit the title, description, and due date of an existing task.

#### Scenario: Create task successfully
- **WHEN** the user enters a title and due date (description optional) and submits the form
- **THEN** the task is saved with its title, description, due date, and creation timestamp
- **AND** the new task appears in the task list without requiring a page reload

#### Scenario: Edit task successfully
- **WHEN** the user triggers edit on a task, changes the title, description, or due date, and submits
- **THEN** the task is updated in memory and LocalStorage, preserving its `id` and `createdAt`
- **AND** the updated task appears in the list without requiring a page reload

#### Scenario: Persist tasks to LocalStorage
- **WHEN** a task is saved or edited
- **THEN** it is stored in LocalStorage using a stable key
- **AND** the saved task remains available after a browser refresh

#### Scenario: Required fields validated
- **WHEN** the user submits without a title or due date (on create or edit)
- **THEN** the task is not saved or updated
- **AND** the user is informed that required fields are missing

### Requirement: Task Completion State
The system SHALL let users mark a task as completed or open (not completed).
The system SHALL persist the completed state of each task in LocalStorage.
The system SHALL let users toggle the completed state of any existing task from the UI.

#### Scenario: Mark task as completed
- **WHEN** the user toggles a task to completed
- **THEN** the task's `completed` property is set to true
- **AND** the change is saved to LocalStorage
- **AND** the UI reflects the completed state

#### Scenario: Mark task as open
- **WHEN** the user toggles a completed task to open
- **THEN** the task's `completed` property is set to false
- **AND** the change is saved to LocalStorage
- **AND** the UI reflects the open state

#### Scenario: Persist completed state
- **WHEN** the app loads and LocalStorage has saved tasks
- **THEN** each task's completed state is restored correctly

#### Scenario: Toggle completed state
- **WHEN** the user toggles the completed state of a task
- **THEN** only that task's completed property is changed
- **AND** unrelated properties and tasks are not affected

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

