## MODIFIED Requirements
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

#### Scenario: Initialize from saved tasks
- **WHEN** the app loads and LocalStorage already has saved tasks
- **THEN** those tasks populate the on-page task list
