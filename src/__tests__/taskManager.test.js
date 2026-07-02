const {
  addTask,
  completeTask,
  deleteTask,
  getAllTasks,
  getPendingTasks,
  getCompletedTasks,
  reset,
} = require('../taskManager');

beforeEach(() => {
  reset();
});

describe('addTask', () => {
  test('adds a task and returns it', () => {
    const task = addTask('Buy groceries');
    expect(task).toEqual({ id: 1, title: 'Buy groceries', completed: false });
  });

  test('increments id for each new task', () => {
    const t1 = addTask('Task one');
    const t2 = addTask('Task two');
    expect(t1.id).toBe(1);
    expect(t2.id).toBe(2);
  });

  test('throws if title is empty', () => {
    expect(() => addTask('')).toThrow('Task title is required');
  });

  test('throws if title is only whitespace', () => {
    expect(() => addTask('   ')).toThrow('Task title is required');
  });
});

describe('completeTask', () => {
  test('marks a task as completed', () => {
    addTask('Walk the dog');
    const task = completeTask(1);
    expect(task.completed).toBe(true);
  });

  test('returns null for unknown id', () => {
    expect(completeTask(999)).toBeNull();
  });
});

describe('deleteTask', () => {
  test('deletes an existing task', () => {
    addTask('Clean the house');
    expect(deleteTask(1)).toBe(true);
    expect(getAllTasks()).toHaveLength(0);
  });

  test('returns false for unknown id', () => {
    expect(deleteTask(999)).toBe(false);
  });
});

describe('getAllTasks', () => {
  test('returns all tasks', () => {
    addTask('Task A');
    addTask('Task B');
    expect(getAllTasks()).toHaveLength(2);
  });
});

describe('getPendingTasks', () => {
  test('returns only incomplete tasks', () => {
    addTask('Task A');
    addTask('Task B');
    completeTask(1);
    expect(getPendingTasks()).toHaveLength(1);
    expect(getPendingTasks()[0].title).toBe('Task B');
  });
});

describe('getCompletedTasks', () => {
  test('returns only completed tasks', () => {
    addTask('Task A');
    addTask('Task B');
    completeTask(1);
    expect(getCompletedTasks()).toHaveLength(1);
    expect(getCompletedTasks()[0].title).toBe('Task A');
  });
});
