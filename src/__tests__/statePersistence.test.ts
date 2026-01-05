import { loadTasksFromStorage, saveTasksToStorage } from '../counter';

declare const global: any;

beforeAll(() => {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
});

describe('State Persistence', () => {
  test('should save tasks to LocalStorage', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    saveTasksToStorage(tasks);
    expect(localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks));
  });

  test('should load tasks from LocalStorage', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];
    (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(tasks));
    const loadedTasks = loadTasksFromStorage();
    expect(loadedTasks).toEqual(tasks);
  });
});