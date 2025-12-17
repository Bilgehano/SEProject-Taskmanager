## 1. Implementation
- [x] 1.1 Add an Edit button to each task item in the task list.
- [x] 1.2 On Edit click, populate the form with the selected task's title, description, and due date; store the editing task ID.
- [x] 1.3 Change the form submit button label to "Save Changes" when editing.
- [x] 1.4 On submit in edit mode, update the existing task (by ID) instead of creating a new one.
- [x] 1.5 Validate title and due date are present; show error in existing error element if invalid.
- [x] 1.6 Persist updated task array to LocalStorage.
- [x] 1.7 Clear edit state and reset form after successful save.
- [x] 1.8 Add Cancel button (visible only during edit) to discard changes and reset form.

## 2. Validation
- [x] 2.1 Verify editing a task updates it in the list and LocalStorage without creating a duplicate.
- [x] 2.2 Confirm validation prevents saving with empty title or due date, showing error message.
- [x] 2.3 Confirm Cancel discards changes and clears edit state.
- [x] 2.4 Run `openspec validate edit-existing-tasks --strict`.
