// In-memory store — swap this out for a real DB layer
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];
let nextId = 3;

const getAllUsers = () => [...users];

const getUserById = (id) => users.find((u) => u.id === id) || null;

const createUser = ({ name, email }) => {
  const user = { id: nextId, name, email };
  nextId += 1;
  users.push(user);
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};

// Used by tests to reset state
const reset = () => {
  users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];
  nextId = 3;
};

module.exports = { getAllUsers, getUserById, createUser, deleteUser, reset };
