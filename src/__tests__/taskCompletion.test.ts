import { toggleTaskCompletion } from '../counter';

describe('Task Completion', () => {
  test('should mark a task as completed', () => {
    const task = { id: 1, completed: false };
    const updatedTask = toggleTaskCompletion(task);
    expect(updatedTask).toHaveProperty('completed', true);
  });

  test('should mark a completed task as open', () => {
    const task = { id: 1, completed: true };
    const updatedTask = toggleTaskCompletion(task);
    expect(updatedTask).toHaveProperty('completed', false);
  });
});