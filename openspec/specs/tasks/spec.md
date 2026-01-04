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
- The system SHALL provide automated tests that verify tasks can be marked as completed and uncompleted.
- The system SHALL provide automated tests that verify the completed state persists via LocalStorage.

#### Scenario: Automated test for marking complete
- WHEN the test marks a task as completed
- THEN the task's `completed` property is true
- AND the change is persisted in LocalStorage

#### Scenario: Automated test for marking uncomplete
- WHEN the test marks a task as uncompleted
- THEN the task's `completed` property is false
- AND the change is persisted in LocalStorage

