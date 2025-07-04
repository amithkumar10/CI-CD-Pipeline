import request from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';

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

describe('DELETE /api/todos/:id', () => {
  it('should delete a todo and return 200', async () => {
    // Step 1: Create a new todo first
    const newTodo = { title: 'Delete Me', completed: false };
    const createRes = await request(app).post('/api/todos').send(newTodo);
    const todoId = createRes.body._id;

    // Step 2: Delete the created todo
    const deleteRes = await request(app).delete(`/api/todos/${todoId}`);
    expect(deleteRes.statusCode).toBe(200);

    // Optional: Try fetching again to confirm deletion
    const fetchRes = await request(app).get(`/api/todos/${todoId}`);
    expect(fetchRes.statusCode).toBe(404); // or whatever your app sends for not found
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});