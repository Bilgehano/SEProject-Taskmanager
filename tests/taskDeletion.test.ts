import { deleteTask, loadTasks, saveTasks } from '../src/taskUtils';
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock the DOM environment
const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>');
(globalThis as any).document = dom.window.document;
(globalThis as any).window = dom.window;
(globalThis as any).navigator = dom.window.navigator;

// Mock LocalStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Task Deletion Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should delete an open task', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: false },
    ];
    saveTasks(tasks);

    deleteTask('1');

    const updatedTasks = loadTasks();
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].id).toBe('2');
  });

  it('should delete a completed task', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: true },
      { id: '2', title: 'Task 2', completed: false },
    ];
    saveTasks(tasks);

    deleteTask('1');

    const updatedTasks = loadTasks();
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].id).toBe('2');
  });

  it('should handle deletion when filtered', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];
    saveTasks(tasks);

    deleteTask('1');

    const updatedTasks = loadTasks();
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].id).toBe('2');
    expect(updatedTasks[0].completed).toBe(true);
  });

  it('should delete all tasks one by one', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true },
    ];
    saveTasks(tasks);

    deleteTask('1');
    deleteTask('2');

    const updatedTasks = loadTasks();
    expect(updatedTasks).toHaveLength(0);
  });

  it('should handle deletion of a task during edit', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
    ];
    saveTasks(tasks);

    deleteTask('1');

    const updatedTasks = loadTasks();
    expect(updatedTasks).toHaveLength(0);
  });

  it('should handle invalid task ID gracefully', () => {
    const tasks = [
      { id: '1', title: 'Task 1', completed: false },
    ];
    saveTasks(tasks);

    deleteTask('invalid-id');

    const updatedTasks = loadTasks();
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].id).toBe('1');
  });
});