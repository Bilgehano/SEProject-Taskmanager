# Spec Delta: Delete Task Tests

## Change ID
add-delete-task-tests

## ADDED Requirements

### Requirement: Delete Task Tests
The system SHALL have automated tests that verify the delete task logic. Tests SHALL confirm that deleting a task removes only the selected task from the task list and from persisted storage, while all other tasks remain unchanged.

#### Scenario: Delete removes task from storage
- **GIVEN** multiple tasks exist in LocalStorage
- **WHEN** a task is deleted by its ID
- **THEN** the deleted task is no longer present in LocalStorage
- **AND** the total task count decreases by one

#### Scenario: Delete preserves other tasks
- **GIVEN** three tasks exist in LocalStorage (Task A, Task B, Task C)
- **WHEN** Task B is deleted
- **THEN** Task A remains in LocalStorage with all properties unchanged
- **AND** Task C remains in LocalStorage with all properties unchanged

#### Scenario: Delete first task preserves remaining tasks
- **GIVEN** multiple tasks exist in LocalStorage
- **WHEN** the first task is deleted
- **THEN** all other tasks remain in LocalStorage with properties unchanged

#### Scenario: Delete last task preserves remaining tasks
- **GIVEN** multiple tasks exist in LocalStorage
- **WHEN** the last task is deleted
- **THEN** all other tasks remain in LocalStorage with properties unchanged

#### Scenario: Delete middle task preserves surrounding tasks
- **GIVEN** at least three tasks exist in LocalStorage
- **WHEN** a task in the middle of the list is deleted
- **THEN** tasks before and after the deleted task remain unchanged
