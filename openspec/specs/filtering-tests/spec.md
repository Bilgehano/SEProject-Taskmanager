# filtering-tests Specification

## Purpose
TBD - created by archiving change 2026-01-09-add-filtering-tests. Update Purpose after archive.
## Requirements
### Requirement: Filtering Open Tasks
The system SHALL correctly filter and display only open tasks when the "Open" filter is selected.

#### Scenario: Filter Open Tasks
**Given** multiple tasks with mixed completion states
**When** the user selects the "Open" filter
**Then** only tasks that are not marked as completed SHALL be included in the filtered result.

### Requirement: Filtering Completed Tasks
The system SHALL correctly filter and display only completed tasks when the "Completed" filter is selected.

#### Scenario: Filter Completed Tasks
**Given** multiple tasks with mixed completion states
**When** the user selects the "Completed" filter
**Then** only tasks that are marked as completed SHALL be included in the filtered result.

### Requirement: Toggling Task Completion State
The system SHALL update the filtered result when a task’s completion state is toggled.

#### Scenario: Toggle Task Completion
**Given** a task is displayed in the filtered result
**When** the user toggles the task’s completion state
**Then** the task SHALL be removed from the current filtered result and appear in the appropriate filter.

### Requirement: Mixed Task States
The system SHALL handle filtering correctly when multiple tasks with mixed completion states exist.

#### Scenario: Mixed Task States
**Given** multiple tasks with mixed completion states
**When** the user switches between "Open" and "Completed" filters
**Then** the filtered result SHALL update to reflect the selected filter.

### Requirement: Existing Behavior
Existing task creation and completion behavior SHALL continue to work correctly under filtering.

#### Scenario: Task Creation and Completion
**Given** the user creates or completes a task
**When** the user switches between filters
**Then** the filtered result SHALL reflect the updated task state.

