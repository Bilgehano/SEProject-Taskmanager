import './style.css'

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  createdAt: string
}

const STORAGE_KEY = 'taskmanager.tasks'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App container missing')
}

app.innerHTML = `
  <main class="app">
    <h1>Task Tracker</h1>
    <form id="task-form" class="task-form">
      <div class="field">
        <label for="title">Title *</label>
        <input id="title" name="title" type="text" autocomplete="off" required />
      </div>
      <div class="field">
        <label for="description">Description</label>
        <textarea id="description" name="description" rows="3"></textarea>
      </div>
      <div class="field">
        <label for="dueDate">Due date *</label>
        <input id="dueDate" name="dueDate" type="date" required />
      </div>
      <div class="actions">
        <button type="submit" id="submit-button">Add Task</button>
        <button type="button" id="cancel-edit" class="ghost-button" hidden>Cancel edit</button>
        <span id="error" class="error" role="status" aria-live="polite"></span>
      </div>
    </form>

    <section>
      <h2>Tasks</h2>
      <ul id="task-list" class="task-list"></ul>
    </section>
  </main>
`

function requireElement<T extends Element>(element: T | null, message: string): T {
  if (!element) {
    throw new Error(message)
  }
  return element
}

const form = requireElement(document.querySelector<HTMLFormElement>('#task-form'), 'Task form failed to initialize')
const titleInput = requireElement(document.querySelector<HTMLInputElement>('#title'), 'Title input missing')
const descriptionInput = requireElement(
  document.querySelector<HTMLTextAreaElement>('#description'),
  'Description input missing',
)
const dueDateInput = requireElement(document.querySelector<HTMLInputElement>('#dueDate'), 'Due date input missing')
const submitButton = requireElement(document.querySelector<HTMLButtonElement>('#submit-button'), 'Submit button missing')
const cancelEditButton = requireElement(document.querySelector<HTMLButtonElement>('#cancel-edit'), 'Cancel button missing')
const errorEl = document.querySelector<HTMLSpanElement>('#error')
const taskListEl = requireElement(document.querySelector<HTMLUListElement>('#task-list'), 'Task list missing')

const tasks: Task[] = loadTasks()
renderTasks(taskListEl, tasks)

let editingTaskId: string | null = null

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const description = descriptionInput.value.trim()
  const dueDate = dueDateInput.value

  if (!title || !dueDate) {
    setError('Title and due date are required')
    return
  }

  const updates = { title, description, dueDate }

  if (editingTaskId) {
    const index = tasks.findIndex((task) => task.id === editingTaskId)
    if (index === -1) {
      console.warn('Editing target task was not found; creating a new task instead')
      tasks.push(createTask(updates))
    } else {
      tasks[index] = { ...tasks[index], ...updates }
    }
  } else {
    tasks.push(createTask(updates))
  }

  saveTasks(tasks)
  renderTasks(taskListEl, tasks)

  resetFormState()
  setError('')
  titleInput.focus()
})

cancelEditButton.addEventListener('click', () => {
  resetFormState()
  setError('')
  titleInput.focus()
})

function setError(message: string) {
  if (!errorEl) return
  errorEl.textContent = message
}

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Task[]
  } catch (error) {
    console.warn('Failed to read tasks from LocalStorage', error)
    return []
  }
}

function saveTasks(nextTasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks))
  } catch (error) {
    console.error('Failed to save tasks to LocalStorage', error)
  }
}

function createTask({ title, description, dueDate }: Pick<Task, 'title' | 'description' | 'dueDate'>): Task {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
    title,
    description,
    dueDate,
    createdAt: new Date().toISOString(),
  }
}

function enterEditMode(task: Task) {
  editingTaskId = task.id
  titleInput.value = task.title
  descriptionInput.value = task.description || ''
  dueDateInput.value = task.dueDate
  submitButton.textContent = 'Save Changes'
  cancelEditButton.hidden = false
  cancelEditButton.disabled = false
  titleInput.focus()
  setError('')
}

function resetFormState() {
  form.reset()
  editingTaskId = null
  submitButton.textContent = 'Add Task'
  cancelEditButton.hidden = true
}

function renderTasks(listEl: HTMLUListElement, nextTasks: Task[]) {
  listEl.innerHTML = ''

  if (!nextTasks.length) {
    const empty = document.createElement('li')
    empty.className = 'empty'
    empty.textContent = 'No tasks yet'
    listEl.appendChild(empty)
    return
  }

  nextTasks.forEach((task) => {
    const item = document.createElement('li')
    item.className = 'task-item'

    const header = document.createElement('div')
    header.className = 'task-header'

    const title = document.createElement('span')
    title.className = 'task-title'
    title.textContent = task.title

    const date = document.createElement('span')
    date.className = 'task-date'
    date.textContent = `Due ${task.dueDate}`

    header.append(title, date)

    const desc = document.createElement('p')
    desc.className = 'task-desc'
    desc.textContent = task.description || 'No description'

    const meta = document.createElement('small')
    meta.className = 'task-meta'
    meta.textContent = `Created ${new Date(task.createdAt).toLocaleString()}`

    const actions = document.createElement('div')
    actions.className = 'task-actions'

    const editButton = document.createElement('button')
    editButton.type = 'button'
    editButton.className = 'link-button'
    editButton.textContent = 'Edit'
    editButton.addEventListener('click', () => enterEditMode(task))

    actions.append(editButton)

    item.append(header, desc, meta, actions)
    listEl.appendChild(item)
  })
}
