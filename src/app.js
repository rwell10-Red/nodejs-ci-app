const express = require('express');
const userRoutes = require('./routes/users');
const healthRoutes = require('./routes/health');

const app = express();

app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack); // eslint-disable-line no-console
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
