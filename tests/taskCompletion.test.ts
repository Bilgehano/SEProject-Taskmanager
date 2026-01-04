import { expect, test, beforeEach } from 'vitest'

// Simulate LocalStorage for testing
global.localStorage = {
  store: {} as Record<string, string>,
  getItem(key: string) { return this.store[key] || null },
  setItem(key: string, value: string) { this.store[key] = value },
  removeItem(key: string) { delete this.store[key] },
  clear() { this.store = {} },
} as any

const STORAGE_KEY = 'taskmanager.tasks'

function saveTasks(tasks: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw)
}

test('Task can be marked complete and uncomplete, and persists', () => {
  const task = { id: '1', title: 'Test', description: '', dueDate: '2026-01-04', createdAt: '2026-01-04T00:00:00Z', completed: false }
  saveTasks([task])

  // Mark complete
  let tasks = loadTasks()
  tasks[0].completed = true
  saveTasks(tasks)
  tasks = loadTasks()
  expect(tasks[0].completed).toBe(true)

  // Mark uncomplete
  tasks[0].completed = false
  saveTasks(tasks)
  tasks = loadTasks()
  expect(tasks[0].completed).toBe(false)
})
