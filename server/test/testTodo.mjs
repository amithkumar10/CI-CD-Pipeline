import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';
 // path to your Express app

describe('GET /api/todos', () => {
  it('should return 200 and an array of todos', async () => {
    const res = await request(app).get('/api/todos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});


describe('POST /api/todos', () => {
  it('should create a new todo and return 201', async () => {
    const todo = { title: 'Test Todo' };
    const res = await request(app).post('/api/todos').send(todo);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Todo');
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});
