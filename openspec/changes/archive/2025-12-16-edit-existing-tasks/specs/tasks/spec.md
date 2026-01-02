## ADDED Requirements

### Requirement: Task Editing
The system SHALL let users edit the title, description, and due date of an existing task.

#### Scenario: Initiate edit mode
- **WHEN** the user clicks the Edit button on a task
- **THEN** the form is populated with the task's current title, description, and due date
- **AND** the submit button label changes to "Save Changes"
- **AND** a Cancel button becomes visible

#### Scenario: Save edited task successfully
- **WHEN** the user modifies task fields and submits the form with valid data
- **THEN** the existing task is updated with the new values
- **AND** the updated task appears in the task list immediately
- **AND** the updated task is persisted to LocalStorage
- **AND** the form resets and returns to create mode

#### Scenario: Validation fails during edit
- **WHEN** the user submits the edit form with an empty title or due date
- **THEN** the task is not saved
- **AND** an error message is displayed in the existing error element

#### Scenario: Cancel edit
- **WHEN** the user clicks the Cancel button during editing
- **THEN** the form is cleared and returns to create mode
- **AND** no changes are saved to the task
