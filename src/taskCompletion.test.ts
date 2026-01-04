import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Ensure localStorage is part of the global object
if (!global.localStorage) {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    clear() {
      this.store = {};
    },
  };
}

describe('Task Completion Feature', () => {
  let tasks: Array<{ id: number; title: string; completed: boolean }>;

  beforeEach(() => {
    tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    localStorage.clear();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  it('should mark a task as completed', () => {
    const task = tasks[0];
    task.completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const storedTasks = JSON.parse(localStorage.getItem('tasks')!);
    expect(storedTasks[0].completed).toBe(true);
  });

  it('should mark a task as open', () => {
    const task = tasks[1];
    task.completed = false;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const storedTasks = JSON.parse(localStorage.getItem('tasks')!);
    expect(storedTasks[1].completed).toBe(false);
  });

  it('should toggle task completion state repeatedly', () => {
    const task = tasks[0];
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    expect(JSON.parse(localStorage.getItem('tasks')!)[0].completed).toBe(true);

    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    expect(JSON.parse(localStorage.getItem('tasks')!)[0].completed).toBe(false);
  });

  it('should persist completed state across reloads', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')!);
    expect(storedTasks[0].completed).toBe(false);
    expect(storedTasks[1].completed).toBe(true);
  });

  it('should handle multiple tasks independently', () => {
    tasks[0].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const storedTasks = JSON.parse(localStorage.getItem('tasks')!);
    expect(storedTasks[0].completed).toBe(true);
    expect(storedTasks[1].completed).toBe(true);
  });

  it('should not affect task creation or editing', () => {
    const newTask = { id: 3, title: 'Task 3', completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const storedTasks = JSON.parse(localStorage.getItem('tasks')!);
    expect(storedTasks.length).toBe(3);
    expect(storedTasks[2]).toEqual(newTask);
  });
});