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
        <button type="submit" id="submit-btn">Add Task</button>
        <button type="button" id="cancel-btn" style="display: none;">Cancel</button>
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
const submitBtn = document.querySelector<HTMLButtonElement>('#submit-btn')
const cancelBtn = document.querySelector<HTMLButtonElement>('#cancel-btn')

if (!form || !titleInput || !descriptionInput || !dueDateInput || !taskListEl || !submitBtn || !cancelBtn) {
  throw new Error('Task form failed to initialize')
}

let editingTaskId: string | null = null

const tasks: Task[] = loadTasks()
renderTasks(taskListEl, tasks)

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const description = descriptionInput.value.trim()
  const dueDate = dueDateInput.value

  if (!title || !dueDate) {
    setError('Title and due date are required')
    return
  }

  if (editingTaskId) {
    const taskIndex = tasks.findIndex((t) => t.id === editingTaskId)
    if (taskIndex !== -1) {
      tasks[taskIndex].title = title
      tasks[taskIndex].description = description
      tasks[taskIndex].dueDate = dueDate
    }
    clearEditState()
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
  renderTasks(taskListEl, tasks)

  form.reset()
  setError('')
  titleInput.focus()
})

cancelBtn.addEventListener('click', () => {
  clearEditState()
  form.reset()
  setError('')
  titleInput.focus()
})

function clearEditState() {
  editingTaskId = null
  if (submitBtn) submitBtn.textContent = 'Add Task'
  if (cancelBtn) cancelBtn.style.display = 'none'
}

function startEdit(task: Task) {
  editingTaskId = task.id
  if (titleInput) titleInput.value = task.title
  if (descriptionInput) descriptionInput.value = task.description
  if (dueDateInput) dueDateInput.value = task.dueDate
  if (submitBtn) submitBtn.textContent = 'Save Changes'
  if (cancelBtn) cancelBtn.style.display = 'inline-block'
  setError('')
  if (titleInput) titleInput.focus()
}

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

    const editBtn = document.createElement('button')
    editBtn.className = 'edit-btn'
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', () => startEdit(task))

    actions.appendChild(editBtn)

    item.append(header, desc, meta, actions)
    listEl.appendChild(item)
  })
}
