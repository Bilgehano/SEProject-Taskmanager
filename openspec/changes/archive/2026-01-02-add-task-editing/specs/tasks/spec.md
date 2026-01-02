## MODIFIED Requirements

### Requirement: Task Editing
The system SHALL let users edit an existing task's title, description, and due date.
- Editing is only allowed for existing tasks.
- The task data model is not changed.
- Edits are persisted in LocalStorage.
- Title and due date remain required when editing.
- If validation fails, the task is not saved and a clear error message is shown at the same UI location as task creation errors.

#### Scenario: Edit task successfully
- **WHEN** the user edits a task and submits valid data
- **THEN** the task is updated in LocalStorage and the UI

#### Scenario: Edit validation required fields
- **WHEN** the user submits an edit without a title or due date
- **THEN** the task is not saved
- **AND** a clear error message is shown at the same UI location as for creation errors

#### Scenario: No new tasks or fields
- **WHEN** editing a task
- **THEN** no new task is created
- **AND** no new fields are added to the data model
