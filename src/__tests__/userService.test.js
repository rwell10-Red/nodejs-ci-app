const userService = require('../services/userService');

beforeEach(() => {
  userService.reset();
});

describe('userService', () => {
  test('getAllUsers returns all users', () => {
    const users = userService.getAllUsers();
    expect(users).toHaveLength(2);
  });

  test('getUserById returns correct user', () => {
    const user = userService.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'Alice', email: 'alice@example.com' });
  });

  test('getUserById returns null for unknown id', () => {
    expect(userService.getUserById(999)).toBeNull();
  });

  test('createUser adds a user and returns it', () => {
    const user = userService.createUser({ name: 'Carol', email: 'carol@example.com' });
    expect(user).toEqual({ id: 3, name: 'Carol', email: 'carol@example.com' });
    expect(userService.getAllUsers()).toHaveLength(3);
  });

  test('deleteUser removes an existing user', () => {
    expect(userService.deleteUser(1)).toBe(true);
    expect(userService.getAllUsers()).toHaveLength(1);
  });

  test('deleteUser returns false for unknown id', () => {
    expect(userService.deleteUser(999)).toBe(false);
  });
});
