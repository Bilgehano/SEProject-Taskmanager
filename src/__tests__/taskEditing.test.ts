import { editTask } from '../counter';

describe('Task Editing', () => {
  test('should edit a task with valid inputs', () => {
    const task = { id: 1, title: 'Old Title', description: 'Old Description', dueDate: new Date() };
    const updatedTask = editTask(task, 'New Title', 'New Description', new Date());
    expect(updatedTask).toHaveProperty('title', 'New Title');
    expect(updatedTask).toHaveProperty('description', 'New Description');
  });

  test('should not edit a task without a title', () => {
    const task = { id: 1, title: 'Old Title', description: 'Old Description', dueDate: new Date() };
    expect(() => editTask(task, '', 'New Description', new Date())).toThrow('Title is required');
  });
});