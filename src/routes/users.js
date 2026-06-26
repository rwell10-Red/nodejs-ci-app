const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  const users = userService.getAllUsers();
  res.status(200).json(users);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = userService.getUserById(Number(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(200).json(user);
});

// POST /api/users
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }
  const user = userService.createUser({ name, email });
  return res.status(201).json(user);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const deleted = userService.deleteUser(Number(req.params.id));
  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(204).send();
});

module.exports = router;
