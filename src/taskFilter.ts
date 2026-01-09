export type TaskFilterMode = 'open' | 'completed' | 'all';

export function filterTasksByCompletion(tasks: { completed: boolean }[], filter: TaskFilterMode) {
  if (filter === 'completed') {
    return tasks.filter(task => task.completed);
  } else if (filter === 'open') {
    return tasks.filter(task => !task.completed);
  } else if (filter === 'all') {
    return tasks; // Show all tasks
  }
  return tasks;
}