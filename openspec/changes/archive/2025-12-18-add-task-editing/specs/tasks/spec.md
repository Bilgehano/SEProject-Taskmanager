## ADDED Requirements
### Requirement: Task Editing
The system SHALL let users modify an existing task's title, description, and due date without creating a duplicate entry.

#### Scenario: Edit task successfully
- **WHEN** the user selects a task to edit, updates any allowed fields, and submits with a valid title and due date
- **THEN** the updated task replaces the prior version in LocalStorage while preserving its identity and creation timestamp
- **AND** the on-page task list shows the updated details immediately

#### Scenario: Required fields enforced when editing
- **WHEN** the user attempts to save edits without a title or due date
- **THEN** the changes are rejected
- **AND** the user is informed that the required fields must be populated

#### Scenario: Cancel editing returns to add mode
- **WHEN** the user cancels editing or completes an edit
- **THEN** the form clears and reverts to add mode so the user can create a new task without refreshing the page
