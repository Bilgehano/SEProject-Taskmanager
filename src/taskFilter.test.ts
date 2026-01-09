import { describe, it, expect } from 'vitest'
import { filterTasksByCompletion, type TaskFilterMode } from './taskFilter'

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  createdAt: string
  completed: boolean
}

function createTask(overrides: Partial<Task> = {}): Task {
  return {
    id: `task-${Date.now()}-${Math.random()}`,
    title: 'Test Task',
    description: 'Test description',
    dueDate: '2026-01-15',
    createdAt: new Date().toISOString(),
    completed: false,
    ...overrides,
  }
}

describe('filterTasksByCompletion', () => {
  describe('Unit Tests', () => {
    it('returns only open tasks when filter is "open"', () => {
      const tasks = [
        createTask({ id: '1', completed: false }),
        createTask({ id: '2', completed: true }),
        createTask({ id: '3', completed: false }),
      ]

      const result = filterTasksByCompletion(tasks, 'open')

      expect(result).toHaveLength(2)
      expect(result.every(task => !task.completed)).toBe(true)
      expect(result.map(t => t.id)).toEqual(['1', '3'])
    })

    it('returns only completed tasks when filter is "completed"', () => {
      const tasks = [
        createTask({ id: '1', completed: false }),
        createTask({ id: '2', completed: true }),
        createTask({ id: '3', completed: true }),
      ]

      const result = filterTasksByCompletion(tasks, 'completed')

      expect(result).toHaveLength(2)
      expect(result.every(task => task.completed)).toBe(true)
      expect(result.map(t => t.id)).toEqual(['2', '3'])
    })

    it('returns all tasks when filter is "all"', () => {
      const tasks = [
        createTask({ id: '1', completed: false }),
        createTask({ id: '2', completed: true }),
        createTask({ id: '3', completed: false }),
      ]

      const result = filterTasksByCompletion(tasks, 'all')

      expect(result).toHaveLength(3)
      expect(result).toEqual(tasks)
    })

    it('returns all tasks for unexpected filter values (fallback behavior)', () => {
      const tasks = [
        createTask({ id: '1', completed: false }),
        createTask({ id: '2', completed: true }),
      ]

      // Cast to bypass TypeScript type check for testing fallback
      const result = filterTasksByCompletion(tasks, 'invalid' as TaskFilterMode)

      expect(result).toHaveLength(2)
      expect(result).toEqual(tasks)
    })

    it('returns empty array when no tasks match the filter', () => {
      const allCompletedTasks = [
        createTask({ id: '1', completed: true }),
        createTask({ id: '2', completed: true }),
      ]

      const openResult = filterTasksByCompletion(allCompletedTasks, 'open')
      expect(openResult).toHaveLength(0)

      const allOpenTasks = [
        createTask({ id: '3', completed: false }),
        createTask({ id: '4', completed: false }),
      ]

      const completedResult = filterTasksByCompletion(allOpenTasks, 'completed')
      expect(completedResult).toHaveLength(0)
    })

    it('handles empty task array gracefully', () => {
      const emptyTasks: Task[] = []

      expect(filterTasksByCompletion(emptyTasks, 'open')).toEqual([])
      expect(filterTasksByCompletion(emptyTasks, 'completed')).toEqual([])
      expect(filterTasksByCompletion(emptyTasks, 'all')).toEqual([])
    })
  })

  describe('Integration Tests: Mixed Completion States', () => {
    it('filters multiple tasks with mixed completion states correctly with "open"', () => {
      const tasks = [
        createTask({ id: '1', title: 'Open 1', completed: false }),
        createTask({ id: '2', title: 'Completed 1', completed: true }),
        createTask({ id: '3', title: 'Open 2', completed: false }),
        createTask({ id: '4', title: 'Completed 2', completed: true }),
        createTask({ id: '5', title: 'Open 3', completed: false }),
      ]

      const result = filterTasksByCompletion(tasks, 'open')

      expect(result).toHaveLength(3)
      expect(result.map(t => t.title)).toEqual(['Open 1', 'Open 2', 'Open 3'])
    })

    it('filters multiple tasks with mixed completion states correctly with "completed"', () => {
      const tasks = [
        createTask({ id: '1', title: 'Open 1', completed: false }),
        createTask({ id: '2', title: 'Completed 1', completed: true }),
        createTask({ id: '3', title: 'Open 2', completed: false }),
        createTask({ id: '4', title: 'Completed 2', completed: true }),
        createTask({ id: '5', title: 'Open 3', completed: false }),
      ]

      const result = filterTasksByCompletion(tasks, 'completed')

      expect(result).toHaveLength(2)
      expect(result.map(t => t.title)).toEqual(['Completed 1', 'Completed 2'])
    })

    it('shows all tasks when filter is "all" regardless of completion state', () => {
      const tasks = [
        createTask({ id: '1', title: 'Open 1', completed: false }),
        createTask({ id: '2', title: 'Completed 1', completed: true }),
        createTask({ id: '3', title: 'Open 2', completed: false }),
      ]

      const result = filterTasksByCompletion(tasks, 'all')

      expect(result).toHaveLength(3)
      expect(result.map(t => t.title)).toEqual(['Open 1', 'Completed 1', 'Open 2'])
    })
  })

  describe('Integration Tests: Toggling Completion State', () => {
    it('excludes task from "open" filter after toggling to completed', () => {
      const tasks = [
        createTask({ id: '1', title: 'Task 1', completed: false }),
        createTask({ id: '2', title: 'Task 2', completed: false }),
      ]

      // Initial state: both appear in open filter
      let openResult = filterTasksByCompletion(tasks, 'open')
      expect(openResult).toHaveLength(2)

      // Toggle task 1 to completed
      tasks[0].completed = true

      // Re-filter: task 1 should be excluded
      openResult = filterTasksByCompletion(tasks, 'open')
      expect(openResult).toHaveLength(1)
      expect(openResult[0].id).toBe('2')
    })

    it('excludes task from "completed" filter after toggling to open', () => {
      const tasks = [
        createTask({ id: '1', title: 'Task 1', completed: true }),
        createTask({ id: '2', title: 'Task 2', completed: true }),
      ]

      // Initial state: both appear in completed filter
      let completedResult = filterTasksByCompletion(tasks, 'completed')
      expect(completedResult).toHaveLength(2)

      // Toggle task 1 to open
      tasks[0].completed = false

      // Re-filter: task 1 should be excluded
      completedResult = filterTasksByCompletion(tasks, 'completed')
      expect(completedResult).toHaveLength(1)
      expect(completedResult[0].id).toBe('2')
    })

    it('includes toggled task in "all" filter regardless of state change', () => {
      const tasks = [
        createTask({ id: '1', title: 'Task 1', completed: false }),
        createTask({ id: '2', title: 'Task 2', completed: true }),
      ]

      // Initial state
      let allResult = filterTasksByCompletion(tasks, 'all')
      expect(allResult).toHaveLength(2)

      // Toggle task 1 to completed
      tasks[0].completed = true

      // Re-filter: both still appear
      allResult = filterTasksByCompletion(tasks, 'all')
      expect(allResult).toHaveLength(2)

      // Toggle task 2 to open
      tasks[1].completed = false

      // Re-filter: both still appear
      allResult = filterTasksByCompletion(tasks, 'all')
      expect(allResult).toHaveLength(2)
    })
  })

  describe('Integration Tests: Task Creation Under Filtering', () => {
    it('newly created tasks (completed=false) appear in "open" filter', () => {
      const existingTasks = [
        createTask({ id: '1', title: 'Existing', completed: true }),
      ]

      // Create new task (default completed=false)
      const newTask = createTask({ id: '2', title: 'New Task', completed: false })
      const tasks = [...existingTasks, newTask]

      const result = filterTasksByCompletion(tasks, 'open')

      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('New Task')
    })

    it('newly created tasks (completed=false) do not appear in "completed" filter', () => {
      const existingTasks = [
        createTask({ id: '1', title: 'Existing Completed', completed: true }),
      ]

      // Create new task (default completed=false)
      const newTask = createTask({ id: '2', title: 'New Task', completed: false })
      const tasks = [...existingTasks, newTask]

      const result = filterTasksByCompletion(tasks, 'completed')

      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Existing Completed')
      expect(result.find(t => t.title === 'New Task')).toBeUndefined()
    })

    it('newly created tasks appear in "all" filter', () => {
      const existingTasks = [
        createTask({ id: '1', title: 'Existing Open', completed: false }),
        createTask({ id: '2', title: 'Existing Completed', completed: true }),
      ]

      // Create new task
      const newTask = createTask({ id: '3', title: 'New Task', completed: false })
      const tasks = [...existingTasks, newTask]

      const result = filterTasksByCompletion(tasks, 'all')

      expect(result).toHaveLength(3)
      expect(result.find(t => t.title === 'New Task')).toBeDefined()
    })
  })
})
