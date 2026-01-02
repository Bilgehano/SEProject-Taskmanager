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

if (!form || !titleInput || !descriptionInput || !dueDateInput || !taskListEl) {
  throw new Error('Task form failed to initialize')
}


let editingTaskId: string | null = null;
const tasks: Task[] = loadTasks()
renderTasks(taskListEl, tasks)

taskListEl.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('edit-task-btn')) {
    const taskId = target.getAttribute('data-task-id');
    if (!taskId) return;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    editingTaskId = task.id;
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    dueDateInput.value = task.dueDate;
    setError('');
    // Change submit button text to indicate editing
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Save Changes';
    titleInput.focus();
  }
});

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
    // Editing existing task
    const idx = tasks.findIndex(t => t.id === editingTaskId)
    if (idx === -1) {
      setError('Task not found')
      return
    }
    // Only update fields, do not change id or createdAt
    tasks[idx] = {
      ...tasks[idx],
      title,
      description,
      dueDate
    }
    saveTasks(tasks)
    renderTasks(taskListEl, tasks)
    editingTaskId = null
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Add Task';
    form.reset()
    setError('')
    titleInput.focus()
    return
  }

  // Add new task
  const newTask: Task = {
    id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
    title,
    description,
    dueDate,
    createdAt: new Date().toISOString(),
  }
  tasks.push(newTask)
  saveTasks(tasks)
  renderTasks(taskListEl, tasks)
  form.reset()
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

    // Edit button
    const editBtn = document.createElement('button')
    editBtn.className = 'edit-task-btn'
    editBtn.textContent = 'Edit'
    editBtn.setAttribute('type', 'button')
    editBtn.setAttribute('data-task-id', task.id)

    header.append(title, date, editBtn)

    const desc = document.createElement('p')
    desc.className = 'task-desc'
    desc.textContent = task.description || 'No description'

    const meta = document.createElement('small')
    meta.className = 'task-meta'
    meta.textContent = `Created ${new Date(task.createdAt).toLocaleString()}`

    item.append(header, desc, meta)
    listEl.appendChild(item)
  })
}
