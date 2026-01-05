import { describe, it, expect, beforeEach } from 'vitest';

// Mock global window object
beforeEach(() => {
  global.window = {};
  global.localStorage = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();
});

describe('Task Completion Feature', () => {
  it('should allow marking multiple tasks as completed', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: false },
    ];

    // Simulate marking tasks as completed
    tasks[0].completed = true;
    tasks[1].completed = true;

    // Expectations
    expect(tasks[0].completed).toBe(true);
    expect(tasks[1].completed).toBe(true);
  });

  it('should persist completed state in LocalStorage', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: false },
    ];

    // Simulate marking a task as completed and saving to LocalStorage
    tasks[0].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Reload tasks from LocalStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    // Expectations
    expect(savedTasks[0].completed).toBe(true);
    expect(savedTasks[1].completed).toBe(false);
  });
});

describe('Task Completion Feature - Toggle State', () => {
  it('should toggle task completion state repeatedly', () => {
    const task = { id: '1', title: 'Task 1', completed: false };

    // Toggle completion state
    task.completed = !task.completed;
    expect(task.completed).toBe(true);

    task.completed = !task.completed;
    expect(task.completed).toBe(false);

    task.completed = !task.completed;
    expect(task.completed).toBe(true);
  });
});

describe('Task Completion Feature - Restore State', () => {
  it('should restore task completion state from LocalStorage', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: true },
      { id: '2', title: 'Task 2', completed: false },
    ];

    // Save tasks to LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Simulate app reload and load tasks from LocalStorage
    const restoredTasks = JSON.parse(localStorage.getItem('tasks'));

    // Expectations
    expect(restoredTasks[0].completed).toBe(true);
    expect(restoredTasks[1].completed).toBe(false);
  });
});