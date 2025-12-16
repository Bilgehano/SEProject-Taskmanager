## ADDED Requirements
### Requirement: Task Editing
Users MUST be able to edit an existing task's title, description, and due date without creating a new task.

#### Scenario: Edit existing task
- **WHEN** the user opens edit for an existing task
- **THEN** the form is prefilled with the task's current title, description, and due date
- **AND** submitting saves the updated values without adding a new task entry

#### Scenario: Validate required fields on edit
- **WHEN** the user submits an edit without a title or due date
- **THEN** the edit is blocked
- **AND** a clear error message is shown in the same UI location used for task creation validation
- **AND** the task remains unchanged

#### Scenario: Persist edited task to LocalStorage
- **WHEN** an edit is saved
- **THEN** the existing task record in LocalStorage is updated in place using the current task data model
- **AND** the updated task appears in the task list after a browser refresh
