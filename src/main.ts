import './style.css'
import { type TaskFilterMode } from './taskFilter'
import { loadTasks, saveTasks, deleteTask, filterTasksByCompletion } from './taskUtils'

type Task = {
  id: string
  title: string
  description: string
  dueDate: string
  createdAt: string
  completed: boolean
}

const FILTER_STORAGE_KEY = 'taskmanager.filter'

// Wrap DOM-dependent logic in a function to avoid execution during import
export function initializeApp() {
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
        <div class="filters">
          <label for="task-filter">Show</label>
          <select id="task-filter" name="task-filter">
            <option value="all">All Tasks</option>
            <option value="open">Open Tasks</option>
            <option value="completed">Completed Tasks</option>
          </select>
        </div>
        <ul id="task-list" class="task-list"></ul>
      </section>
    </main>
  `

  const form = document.querySelector<HTMLFormElement>('#task-form')
  const titleInput = document.querySelector<HTMLInputElement>('#title')
  const descriptionInput = document.querySelector<HTMLTextAreaElement>('#description')
  const dueDateInput = document.querySelector<HTMLInputElement>('#dueDate')
  const errorEl = document.querySelector<HTMLSpanElement>('#error')
  const filterEl = document.querySelector<HTMLSelectElement>('#task-filter')
  const taskListEl = document.querySelector<HTMLUListElement>('#task-list')

  if (!form || !titleInput || !descriptionInput || !dueDateInput || !filterEl || !taskListEl) {
    throw new Error('Task form failed to initialize')
  }

  const tasks: Task[] = loadTasks()

  let taskFilter: TaskFilterMode = 'open'

  let editingTaskId: string | null = null
  let editError = ''
  render()

  // Load the filter state from LocalStorage
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY)
  if (savedFilter === 'completed' || savedFilter === 'open' || savedFilter === 'all') {
    taskFilter = savedFilter as TaskFilterMode
    filterEl.value = taskFilter
  }

  filterEl.addEventListener('change', () => {
    const selectedFilter = filterEl.value
    taskFilter = selectedFilter as TaskFilterMode
    localStorage.setItem(FILTER_STORAGE_KEY, taskFilter) // Persist filter state
    render()
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = titleInput.value.trim()
    const description = descriptionInput.value.trim()
    const dueDate = dueDateInput.value

    if (!title || !dueDate) {
      setError('Title and due date are required')
      return
    }

    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
      title,
      description,
      dueDate,
      createdAt: new Date().toISOString(),
      completed: false,
    }

    tasks.push(newTask)
    saveTasks(tasks)
    render()

    form.reset()
    setError('')
    titleInput.focus()
  })

  function setError(message: string) {
    if (!errorEl) return
    errorEl.textContent = message
  }

  function render() {
    const visibleTasks = filterTasksByCompletion(tasks, taskFilter)
    if (taskListEl) {
      renderTasks(taskListEl, visibleTasks)
    } else {
      console.error('Task list element is missing')
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
      if (task.completed) {
        item.classList.add('completed')
      }

      if (editingTaskId === task.id) {
        // Edit form
        const form = document.createElement('form')
        form.className = 'task-form'
        form.style.marginBottom = '0'

        const titleField = document.createElement('div')
        titleField.className = 'field'
        const titleLabel = document.createElement('label')
        titleLabel.htmlFor = `edit-title-${task.id}`
        titleLabel.textContent = 'Title *'
        const titleInput = document.createElement('input')
        titleInput.id = `edit-title-${task.id}`
        titleInput.type = 'text'
        titleInput.value = task.title
        titleInput.required = true
        titleField.append(titleLabel, titleInput)

        const descField = document.createElement('div')
        descField.className = 'field'
        const descLabel = document.createElement('label')
        descLabel.htmlFor = `edit-desc-${task.id}`
        descLabel.textContent = 'Description'
        const descInput = document.createElement('textarea')
        descInput.id = `edit-desc-${task.id}`
        descInput.rows = 3
        descInput.value = task.description
        descField.append(descLabel, descInput)

        const dateField = document.createElement('div')
        dateField.className = 'field'
        const dateLabel = document.createElement('label')
        dateLabel.htmlFor = `edit-date-${task.id}`
        dateLabel.textContent = 'Due date *'
        const dateInput = document.createElement('input')
        dateInput.id = `edit-date-${task.id}`
        dateInput.type = 'date'
        dateInput.value = task.dueDate
        dateInput.required = true
        dateField.append(dateLabel, dateInput)

        const actions = document.createElement('div')
        actions.className = 'actions'
        const saveBtn = document.createElement('button')
        saveBtn.type = 'submit'
        saveBtn.textContent = 'Save'
        const cancelBtn = document.createElement('button')
        cancelBtn.type = 'button'
        cancelBtn.textContent = 'Cancel'
        actions.append(saveBtn, cancelBtn)

        const errorSpan = document.createElement('span')
        errorSpan.className = 'error'
        errorSpan.style.minHeight = '20px'
        errorSpan.textContent = editError

        form.append(titleField, descField, dateField, actions, errorSpan)

        form.addEventListener('submit', (e) => {
          e.preventDefault()
          const newTitle = titleInput.value.trim()
          const newDesc = descInput.value.trim()
          const newDate = dateInput.value
          if (!newTitle || !newDate) {
            editError = 'Title and due date are required'
            render()
            return
          }
          // Update task in array
          const idx = tasks.findIndex(t => t.id === task.id)
          if (idx !== -1) {
            tasks[idx] = {
              ...tasks[idx],
              title: newTitle,
              description: newDesc,
              dueDate: newDate
            }
            saveTasks(tasks)
          }
          editingTaskId = null
          editError = ''
          render()
        })

        cancelBtn.addEventListener('click', () => {
          editingTaskId = null
          editError = ''
          render()
        })

        item.appendChild(form)
      } else {
        // Read-only view
        const header = document.createElement('div')
        header.className = 'task-header'

        // Completion toggle
        const completeToggle = document.createElement('input')
        completeToggle.type = 'checkbox'
        completeToggle.checked = task.completed
        completeToggle.title = task.completed ? 'Mark as open' : 'Mark as completed'
        completeToggle.style.marginRight = '8px'
        completeToggle.addEventListener('change', () => {
          const idx = tasks.findIndex(t => t.id === task.id)
          if (idx !== -1) {
            tasks[idx] = {
              ...tasks[idx],
              completed: !tasks[idx].completed
            }
            saveTasks(tasks)
            render()
          }
        })
        header.append(completeToggle)

        const title = document.createElement('span')
        title.className = 'task-title'
        title.textContent = task.title

        const date = document.createElement('span')
        date.className = 'task-date'
        date.textContent = `Due ${task.dueDate}`

        header.append(title, date)

        const editBtn = document.createElement('button')
        editBtn.type = 'button'
        editBtn.textContent = 'Edit'
        editBtn.style.marginLeft = '8px'
        editBtn.addEventListener('click', () => {
          editingTaskId = task.id
          editError = ''
          render()
        })
        header.append(editBtn)

        const deleteBtn = document.createElement('button')
        deleteBtn.type = 'button'
        deleteBtn.textContent = 'Delete'
        deleteBtn.className = 'danger'
        deleteBtn.style.marginLeft = '8px'
        deleteBtn.setAttribute('aria-label', `Delete ${task.title}`)
        deleteBtn.addEventListener('click', () => {
          deleteTask(task.id)
        })
        header.append(deleteBtn)

        const desc = document.createElement('p')
        desc.className = 'task-desc'
        desc.textContent = task.description || 'No description'

        const meta = document.createElement('small')
        meta.className = 'task-meta'
        meta.textContent = `Created ${new Date(task.createdAt).toLocaleString()}`

        item.append(header, desc, meta)
      }
      listEl.appendChild(item)
    })
  }
}
