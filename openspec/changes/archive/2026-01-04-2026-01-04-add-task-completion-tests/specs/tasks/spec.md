## MODIFIED Requirements

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
