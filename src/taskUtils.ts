export function loadTasks() {
  try {
    const raw = localStorage.getItem('taskmanager.tasks');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(task => ({
      ...task,
      completed: typeof task.completed === 'boolean' ? task.completed : false,
    }));
  } catch (error) {
    console.warn('Failed to read tasks from LocalStorage', error);
    return [];
  }
}

export function saveTasks(nextTasks) {
  try {
    localStorage.setItem('taskmanager.tasks', JSON.stringify(nextTasks));
  } catch (error) {
    console.error('Failed to save tasks to LocalStorage', error);
  }
}

export function deleteTask(taskId) {
  const tasks = loadTasks();
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  tasks.splice(idx, 1);
  saveTasks(tasks);
}

export function filterTasksByCompletion(tasks, filter) {
  if (filter === 'completed') {
    return tasks.filter(task => task.completed);
  } else if (filter === 'open') {
    return tasks.filter(task => !task.completed);
  }
  return tasks;
}