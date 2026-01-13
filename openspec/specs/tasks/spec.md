# tasks Specification

## Purpose
TBD - created by archiving change add-task-creation. Update Purpose after archive.
## Requirements
### Requirement: Task Creation
The system SHALL let users create a task with a title, description, and due date.
The system SHALL let users edit the title, description, and due date of an existing task.

#### Scenario: Create task successfully
- **WHEN** the user enters a title and due date (description optional) and submits the form
- **THEN** the task is saved with its title, description, due date, and creation timestamp
- **AND** the new task appears in the task list without requiring a page reload

#### Scenario: Edit task successfully
- **WHEN** the user triggers edit on a task, changes the title, description, or due date, and submits
- **THEN** the task is updated in memory and LocalStorage, preserving its `id` and `createdAt`
- **AND** the updated task appears in the list without requiring a page reload

#### Scenario: Persist tasks to LocalStorage
- **WHEN** a task is saved or edited
- **THEN** it is stored in LocalStorage using a stable key
- **AND** the saved task remains available after a browser refresh

#### Scenario: Required fields validated
- **WHEN** the user submits without a title or due date (on create or edit)
- **THEN** the task is not saved or updated
- **AND** the user is informed that required fields are missing

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

### Requirement: Delete Task
The system SHALL allow the user to delete a task from the task list. When a task is deleted, it MUST be removed from both the task list displayed to the user and the persisted storage.

#### Scenario: Delete Task from List
**Given** the user is viewing the task list,
**When** the user clicks the "Delete" button for a task,
**Then** the task MUST be removed from the task list in the UI,
**And** the task MUST be removed from LocalStorage.

#### Scenario: Delete Task Persistence
**Given** the user has deleted a task,
**When** the user refreshes the page,
**Then** the deleted task MUST not appear in the task list.

#### Scenario: No Side Effects
**Given** the user deletes a task,
**When** the task list is updated,
**Then** no other tasks MUST be affected by the deletion.

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
