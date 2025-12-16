## ADDED Requirements
### Requirement: Task Editing
The system SHALL let users update an existing task's title, description, and due date without changing its identity.

#### Scenario: Edit task successfully
- **WHEN** the user selects an existing task and submits updated title, description, and due date (title and due date required)
- **THEN** the task is updated in-place using the existing task data model
- **AND** the edited task persists in LocalStorage and the updated values render without reloading the page

#### Scenario: Editing validation enforced
- **WHEN** the user attempts to save edits without a title or due date
- **THEN** the task remains unchanged
- **AND** the validation error is presented at the existing inline error location used for creation
