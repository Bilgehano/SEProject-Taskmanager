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
        <button type="submit">Add Task</button>
        <span id="error" class="error" role="status" aria-live="polite"></span>
      </div>
    </form>

    <section>
      <h2>Tasks</h2>
      <ul id="task-list" class="task-list"></ul>
    </section>
  </main>
`

const form = document.querySelector<HTMLFormElement>('#task-form')
const titleInput = document.querySelector<HTMLInputElement>('#title')
const descriptionInput = document.querySelector<HTMLTextAreaElement>('#description')
const dueDateInput = document.querySelector<HTMLInputElement>('#dueDate')
const errorEl = document.querySelector<HTMLSpanElement>('#error')
const taskListEl = document.querySelector<HTMLUListElement>('#task-list')
const submitButton = document.querySelector<HTMLButtonElement>('button[type="submit"]')

if (!form) {
  throw new Error('Task form failed to initialize')
}

if (!titleInput) {
  throw new Error('Title input missing')
}

if (!descriptionInput) {
  throw new Error('Description input missing')
}

if (!dueDateInput) {
  throw new Error('Due date input missing')
}

if (!taskListEl) {
  throw new Error('Task list missing')
}

if (!submitButton) {
  throw new Error('Submit button missing')
}

const taskForm = form as HTMLFormElement
const taskTitleInput = titleInput as HTMLInputElement
const taskDescriptionInput = descriptionInput as HTMLTextAreaElement
const taskDueDateInput = dueDateInput as HTMLInputElement
const taskList = taskListEl as HTMLUListElement
const taskSubmitButton = submitButton as HTMLButtonElement

const tasks: Task[] = loadTasks()
renderTasks(taskList, tasks)

let editingTaskId: string | null = null

taskForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = taskTitleInput.value.trim()
  const description = taskDescriptionInput.value.trim()
  const dueDate = taskDueDateInput.value

  if (!title || !dueDate) {
    setError('Title and due date are required')
    return
  }

  if (editingTaskId) {
    const taskIndex = tasks.findIndex((task) => task.id === editingTaskId)
    if (taskIndex === -1) {
      setError('Unable to locate task to edit')
      resetFormState()
      return
    }

    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      dueDate,
    }
  } else {
    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
      title,
      description,
      dueDate,
      createdAt: new Date().toISOString(),
    }

    tasks.push(newTask)
  }

  saveTasks(tasks)
  renderTasks(taskList, tasks)
  resetFormState()
})

function setError(message: string) {
  if (!errorEl) return
  errorEl.textContent = message
}

function setSubmitLabel(label: string) {
  taskSubmitButton.textContent = label
}

function resetFormState() {
  taskForm.reset()
  editingTaskId = null
  setSubmitLabel('Add Task')
  setError('')
  taskTitleInput.focus()
}

function startEditTask(task: Task) {
  editingTaskId = task.id
  taskTitleInput.value = task.title
  taskDescriptionInput.value = task.description
  taskDueDateInput.value = task.dueDate
  setSubmitLabel('Save Task')
  setError('')
  taskTitleInput.focus()
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
    editButton.textContent = 'Edit'
    editButton.addEventListener('click', () => startEditTask(task))

    actions.append(editButton)

    item.append(header, desc, meta, actions)
    listEl.appendChild(item)
  })
}
