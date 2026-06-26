const request = require('supertest');
const app = require('../app');
const userService = require('../services/userService');

beforeEach(() => {
  userService.reset();
});

describe('GET /api/users', () => {
  it('returns all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /api/users/:id', () => {
  it('returns a user by id', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Alice');
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Carol', email: 'carol@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBe(3);
    expect(res.body.name).toBe('Carol');
  });

  it('returns 400 when name or email is missing', async () => {
    const res = await request(app).post('/api/users').send({ name: 'NoEmail' });
    expect(res.statusCode).toBe(400);
  });
});

describe('DELETE /api/users/:id', () => {
  it('deletes an existing user', async () => {
    const res = await request(app).delete('/api/users/1');
    expect(res.statusCode).toBe(204);
  });

  it('returns 404 when user does not exist', async () => {
    const res = await request(app).delete('/api/users/999');
    expect(res.statusCode).toBe(404);
  });
});
