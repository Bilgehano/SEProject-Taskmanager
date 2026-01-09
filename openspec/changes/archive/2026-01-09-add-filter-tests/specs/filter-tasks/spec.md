# filter-tasks Specification Delta

## ADDED Requirements

### Requirement: Automated Filter Tests
The system SHALL include automated tests that verify the task filtering behavior.
Tests SHALL be runnable without user interaction and produce clear pass/fail results.
Tests SHALL NOT modify application code or persistence behavior.

#### Scenario: Filter open tasks correctly
- **WHEN** tasks contain a mix of open and completed items
- **AND** the filter is set to 'open'
- **THEN** only tasks with `completed=false` are included in the result

#### Scenario: Filter completed tasks correctly
- **WHEN** tasks contain a mix of open and completed items
- **AND** the filter is set to 'completed'
- **THEN** only tasks with `completed=true` are included in the result

#### Scenario: Show all tasks when filter is all
- **WHEN** tasks contain a mix of open and completed items
- **AND** the filter is set to 'all'
- **THEN** all tasks are included in the result regardless of completion state

#### Scenario: Toggling completion updates filtered result
- **WHEN** a task's completion state is toggled from open to completed
- **AND** the 'open' filter is applied
- **THEN** the toggled task is excluded from the filtered result
- **AND** when the 'completed' filter is applied
- **THEN** the toggled task is included in the filtered result

#### Scenario: Newly created tasks respect filter
- **WHEN** a new task is created (with `completed=false` by default)
- **AND** the 'open' filter is applied
- **THEN** the new task is included in the filtered result
- **AND** when the 'completed' filter is applied
- **THEN** the new task is excluded from the filtered result

#### Scenario: Empty result when no tasks match filter
- **WHEN** all tasks are completed
- **AND** the 'open' filter is applied
- **THEN** an empty result is returned
- **AND** when all tasks are open
- **AND** the 'completed' filter is applied
- **THEN** an empty result is returned

#### Scenario: Handle empty task list
- **WHEN** the task list is empty
- **AND** any filter is applied
- **THEN** an empty result is returned
