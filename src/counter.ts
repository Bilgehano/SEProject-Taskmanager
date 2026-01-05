export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}

export function createTask(title: string, description: string, dueDate: Date) {
  if (!title) {
    throw new Error('Title is required');
  }
  return { title, description, dueDate, id: Date.now() };
}

export function editTask(task: any, title: string, description: string, dueDate: Date) {
  if (!title) {
    throw new Error('Title is required');
  }
  return { ...task, title, description, dueDate };
}

export function toggleTaskCompletion(task: any) {
  return { ...task, completed: !task.completed };
}

export function saveTasksToStorage(tasks: any[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}
