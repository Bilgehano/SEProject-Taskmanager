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

