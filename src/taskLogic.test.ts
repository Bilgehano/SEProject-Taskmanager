/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest'

/**
 * Task type matching the application's Task structure
 */
type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  createdAt: string
  completed: boolean
}

const STORAGE_KEY = 'taskmanager.tasks'

/**
 * Helper to create a task with default values
 */
function createTask(overrides: Partial<Task> = {}): Task {
  return {
    id: crypto.randomUUID(),
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2026-01-15',
    createdAt: new Date().toISOString(),
    completed: false,
    ...overrides,
  }
}

/**
 * Helper to load tasks from localStorage
 */
function loadTasksFromStorage(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw) as Task[]
}

/**
 * Helper to save tasks to localStorage
 */
function saveTasksToStorage(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

/**
 * Simulates the deleteTask logic from main.ts
 * This replicates the application's delete behavior for testing
 */
function deleteTask(tasks: Task[], id: string): Task[] {
  const index = tasks.findIndex((task) => task.id === id)
  if (index !== -1) {
    tasks.splice(index, 1)
    saveTasksToStorage(tasks)
  }
  return tasks
}

describe('Delete Task Logic', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Scenario: Delete removes task from storage', () => {
    it('should remove the deleted task from LocalStorage', () => {
      // GIVEN multiple tasks exist in LocalStorage
      const taskA = createTask({ id: 'task-a', title: 'Task A' })
      const taskB = createTask({ id: 'task-b', title: 'Task B' })
      const taskC = createTask({ id: 'task-c', title: 'Task C' })
      const tasks = [taskA, taskB, taskC]
      saveTasksToStorage(tasks)

      // WHEN a task is deleted by its ID
      deleteTask([...tasks], 'task-b')

      // THEN the deleted task is no longer present in LocalStorage
      const storedTasks = loadTasksFromStorage()
      const deletedTask = storedTasks.find((t) => t.id === 'task-b')
      expect(deletedTask).toBeUndefined()
    })

    it('should decrease the total task count by one', () => {
      // GIVEN multiple tasks exist in LocalStorage
      const taskA = createTask({ id: 'task-a', title: 'Task A' })
      const taskB = createTask({ id: 'task-b', title: 'Task B' })
      const taskC = createTask({ id: 'task-c', title: 'Task C' })
      const tasks = [taskA, taskB, taskC]
      saveTasksToStorage(tasks)

      // WHEN a task is deleted by its ID
      deleteTask([...tasks], 'task-b')

      // THEN the total task count decreases by one
      const storedTasks = loadTasksFromStorage()
      expect(storedTasks.length).toBe(2)
    })
  })

  describe('Scenario: Delete preserves other tasks', () => {
    it('should preserve Task A when Task B is deleted', () => {
      // GIVEN three tasks exist in LocalStorage (Task A, Task B, Task C)
      const taskA = createTask({ id: 'task-a', title: 'Task A', description: 'Desc A' })
      const taskB = createTask({ id: 'task-b', title: 'Task B', description: 'Desc B' })
      const taskC = createTask({ id: 'task-c', title: 'Task C', description: 'Desc C' })
      const tasks = [taskA, taskB, taskC]
      saveTasksToStorage(tasks)

      // WHEN Task B is deleted
      deleteTask([...tasks], 'task-b')

      // THEN Task A remains in LocalStorage with all properties unchanged
      const storedTasks = loadTasksFromStorage()
      const storedTaskA = storedTasks.find((t) => t.id === 'task-a')
      expect(storedTaskA).toBeDefined()
      expect(storedTaskA?.title).toBe('Task A')
      expect(storedTaskA?.description).toBe('Desc A')
      expect(storedTaskA?.id).toBe('task-a')
    })

    it('should preserve Task C when Task B is deleted', () => {
      // GIVEN three tasks exist in LocalStorage (Task A, Task B, Task C)
      const taskA = createTask({ id: 'task-a', title: 'Task A', description: 'Desc A' })
      const taskB = createTask({ id: 'task-b', title: 'Task B', description: 'Desc B' })
      const taskC = createTask({ id: 'task-c', title: 'Task C', description: 'Desc C' })
      const tasks = [taskA, taskB, taskC]
      saveTasksToStorage(tasks)

      // WHEN Task B is deleted
      deleteTask([...tasks], 'task-b')

      // THEN Task C remains in LocalStorage with all properties unchanged
      const storedTasks = loadTasksFromStorage()
      const storedTaskC = storedTasks.find((t) => t.id === 'task-c')
      expect(storedTaskC).toBeDefined()
      expect(storedTaskC?.title).toBe('Task C')
      expect(storedTaskC?.description).toBe('Desc C')
      expect(storedTaskC?.id).toBe('task-c')
    })
  })

  describe('Scenario: Delete first task preserves remaining tasks', () => {
    it('should preserve all other tasks when the first task is deleted', () => {
      // GIVEN multiple tasks exist in LocalStorage
      const taskFirst = createTask({ id: 'task-first', title: 'First Task' })
      const taskSecond = createTask({ id: 'task-second', title: 'Second Task' })
      const taskThird = createTask({ id: 'task-third', title: 'Third Task' })
      const tasks = [taskFirst, taskSecond, taskThird]
      saveTasksToStorage(tasks)

      // WHEN the first task is deleted
      deleteTask([...tasks], 'task-first')

      // THEN all other tasks remain in LocalStorage with properties unchanged
      const storedTasks = loadTasksFromStorage()
      expect(storedTasks.length).toBe(2)
      expect(storedTasks.find((t) => t.id === 'task-second')).toBeDefined()
      expect(storedTasks.find((t) => t.id === 'task-third')).toBeDefined()
      expect(storedTasks.find((t) => t.id === 'task-first')).toBeUndefined()
    })
  })

  describe('Scenario: Delete last task preserves remaining tasks', () => {
    it('should preserve all other tasks when the last task is deleted', () => {
      // GIVEN multiple tasks exist in LocalStorage
      const taskFirst = createTask({ id: 'task-first', title: 'First Task' })
      const taskSecond = createTask({ id: 'task-second', title: 'Second Task' })
      const taskLast = createTask({ id: 'task-last', title: 'Last Task' })
      const tasks = [taskFirst, taskSecond, taskLast]
      saveTasksToStorage(tasks)

      // WHEN the last task is deleted
      deleteTask([...tasks], 'task-last')

      // THEN all other tasks remain in LocalStorage with properties unchanged
      const storedTasks = loadTasksFromStorage()
      expect(storedTasks.length).toBe(2)
      expect(storedTasks.find((t) => t.id === 'task-first')).toBeDefined()
      expect(storedTasks.find((t) => t.id === 'task-second')).toBeDefined()
      expect(storedTasks.find((t) => t.id === 'task-last')).toBeUndefined()
    })
  })

  describe('Scenario: Delete middle task preserves surrounding tasks', () => {
    it('should preserve tasks before and after the deleted middle task', () => {
      // GIVEN at least three tasks exist in LocalStorage
      const taskBefore = createTask({ id: 'task-before', title: 'Before Task' })
      const taskMiddle = createTask({ id: 'task-middle', title: 'Middle Task' })
      const taskAfter = createTask({ id: 'task-after', title: 'After Task' })
      const tasks = [taskBefore, taskMiddle, taskAfter]
      saveTasksToStorage(tasks)

      // WHEN a task in the middle of the list is deleted
      deleteTask([...tasks], 'task-middle')

      // THEN tasks before and after the deleted task remain unchanged
      const storedTasks = loadTasksFromStorage()
      expect(storedTasks.length).toBe(2)

      const storedBefore = storedTasks.find((t) => t.id === 'task-before')
      const storedAfter = storedTasks.find((t) => t.id === 'task-after')

      expect(storedBefore).toBeDefined()
      expect(storedBefore?.title).toBe('Before Task')

      expect(storedAfter).toBeDefined()
      expect(storedAfter?.title).toBe('After Task')

      expect(storedTasks.find((t) => t.id === 'task-middle')).toBeUndefined()
    })
  })
})
