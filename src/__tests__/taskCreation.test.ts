import { createTask } from '../counter';

describe('Task Creation', () => {
  test('should create a task with valid inputs', () => {
    const task = createTask('Title', 'Description', new Date());
    expect(task).toHaveProperty('title', 'Title');
    expect(task).toHaveProperty('description', 'Description');
    expect(task).toHaveProperty('dueDate');
  });

  test('should not create a task without a title', () => {
    expect(() => createTask('', 'Description', new Date())).toThrow('Title is required');
  });
});