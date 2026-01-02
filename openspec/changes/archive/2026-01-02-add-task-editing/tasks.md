## 1. Edit UI
- [ ] 1.1 Add an edit trigger on each rendered task that toggles an inline edit form with the current title, description, and due date pre-filled.
- [ ] 1.2 Allow users to cancel editing to restore the read-only task view without saving changes.

## 2. Saving & validation
- [ ] 2.1 Reuse the existing required-field validation for edit submissions so blank titles or due dates are blocked with inline error feedback.
- [ ] 2.2 Update the persistence layer so successful edits mutate the in-memory task list and LocalStorage entry without changing `id` or `createdAt`.

## 3. Verification
- [ ] 3.1 Manually test creating a task, editing all three fields, cancelling an edit, and refreshing to confirm LocalStorage contains the updated task data.
