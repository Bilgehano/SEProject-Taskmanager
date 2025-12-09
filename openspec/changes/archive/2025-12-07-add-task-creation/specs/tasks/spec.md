## ADDED Requirements
### Requirement: Task Creation
The system SHALL let users create a task with a title, description, and due date.

#### Scenario: Create task successfully
- **WHEN** the user enters a title and due date (description optional) and submits the form
- **THEN** the task is saved with its title, description, due date, and creation timestamp
- **AND** the new task appears in the task list without requiring a page reload

#### Scenario: Persist tasks to LocalStorage
- **WHEN** a task is saved
- **THEN** it is stored in LocalStorage using a stable key
- **AND** the saved task remains available after a browser refresh

#### Scenario: Required fields validated
- **WHEN** the user submits without a title or due date
- **THEN** the task is not saved
- **AND** the user is informed that required fields are missing

#### Scenario: Initialize from saved tasks
- **WHEN** the app loads and LocalStorage already has saved tasks
- **THEN** those tasks populate the on-page task list
