## MODIFIED Requirements

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
