# filter-tasks Specification

## Purpose
TBD - created by archiving change 2026-01-09-add-task-filtering. Update Purpose after archive.
## Requirements
### Requirement: Task Filtering
The system SHALL allow users to filter tasks based on their completion status.

#### Scenario: Default View
- **WHEN** the user opens the task list and no filter is applied
- **THEN** all tasks (open and completed) are displayed

#### Scenario: Filter Open Tasks
- **WHEN** the user selects the "Open Tasks" filter
- **THEN** only open tasks are shown

#### Scenario: Filter Completed Tasks
- **WHEN** the user selects the "Completed Tasks" filter
- **THEN** only completed tasks are shown

#### Scenario: Persist Filter State
- **WHEN** the user selects a filter option and refreshes the page
- **THEN** the previously selected filter is applied

#### Scenario: Filter All Tasks
- **WHEN** the user selects the "All Tasks" filter
- **THEN** all tasks (open and completed) are shown

