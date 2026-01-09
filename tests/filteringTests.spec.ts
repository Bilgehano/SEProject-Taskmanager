import { describe, test, expect, beforeEach } from "vitest";
import { filterTasks } from "../src/taskFilter";

describe("Filtering Tasks", () => {
  let tasks;

  beforeEach(() => {
    tasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
      { id: 3, title: "Task 3", completed: false },
      { id: 4, title: "Task 4", completed: true },
    ];
  });

  test("should filter open tasks", () => {
    const openTasks = filterTasks(tasks, "open");
    expect(openTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 3, title: "Task 3", completed: false },
    ]);
  });

  test("should filter completed tasks", () => {
    const completedTasks = filterTasks(tasks, "completed");
    expect(completedTasks).toEqual([
      { id: 2, title: "Task 2", completed: true },
      { id: 4, title: "Task 4", completed: true },
    ]);
  });

  test("should update filtered result when task completion state is toggled", () => {
    tasks[0].completed = true; // Toggle Task 1 to completed
    const completedTasks = filterTasks(tasks, "completed");
    expect(completedTasks).toContainEqual({ id: 1, title: "Task 1", completed: true });
  });

  test("should handle mixed task states correctly", () => {
    const openTasks = filterTasks(tasks, "open");
    const completedTasks = filterTasks(tasks, "completed");

    expect(openTasks).toEqual([
      { id: 1, title: "Task 1", completed: false },
      { id: 3, title: "Task 3", completed: false },
    ]);

    expect(completedTasks).toEqual([
      { id: 2, title: "Task 2", completed: true },
      { id: 4, title: "Task 4", completed: true },
    ]);
  });

  test("should reflect task creation and completion under filtering", () => {
    tasks.push({ id: 5, title: "Task 5", completed: false }); // New task
    let openTasks = filterTasks(tasks, "open");
    expect(openTasks).toContainEqual({ id: 5, title: "Task 5", completed: false });

    tasks[4].completed = true; // Complete Task 5
    const completedTasks = filterTasks(tasks, "completed");
    expect(completedTasks).toContainEqual({ id: 5, title: "Task 5", completed: true });
  });
});