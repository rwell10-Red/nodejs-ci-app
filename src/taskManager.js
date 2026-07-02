/**
 * Task Manager
 * Simple module to add, complete, and delete tasks.
 * No server or API required.
 */

let tasks = [];
let nextId = 1;

const addTask = (title) => {
  if (!title || title.trim() === '') {
    throw new Error('Task title is required');
  }
  const task = { id: nextId, title: title.trim(), completed: false };
  nextId += 1;
  tasks.push(task);
  return task;
};

const completeTask = (id) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.completed = true;
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};

const getAllTasks = () => [...tasks];

const getPendingTasks = () => tasks.filter((t) => !t.completed);

const getCompletedTasks = () => tasks.filter((t) => t.completed);

// Used by tests to reset state
const reset = () => {
  tasks = [];
  nextId = 1;
};

module.exports = {
  addTask,
  completeTask,
  deleteTask,
  getAllTasks,
  getPendingTasks,
  getCompletedTasks,
  reset,
};
