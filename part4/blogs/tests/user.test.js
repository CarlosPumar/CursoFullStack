const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const Blog = require('../models/blog');
const bcrypt = require('bcryptjs');

const { login } = require('../utils/tests_helper');

const api = supertest(app);

const initialUser = {
  username: 'admin',
  name: 'admin',
  password: '1234',
};

beforeAll(async () => {
  await Blog.deleteMany();
  await User.deleteMany();

  const user = await new User(initialUser);
  const saltRounds = 10;
  const password = await bcrypt.hash(user.password, saltRounds);
  user.password = password;
  await user.save();
});

describe('post users', () => {
  test('post correct user', async () => {
    const token = await login(initialUser);
    const user = {
      username: 'carluntux',
      name: 'Carlos Pumar',
      password: '1234',
    };

    const newUser = await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(200);
    expect(user.name).toBe(newUser.body.name);
    expect(user.username).toBe(newUser.body.username);
  });

  test('post without name', async () => {
    const token = await login(initialUser);
    const user = {
      username: 'carluntux',
      password: '1234',
    };

    await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(400);
  });

  test('post username length < 3', async () => {
    const token = await login(initialUser);
    const user = {
      username: 'a',
      name: 'Carlos Pumar',
      password: '1234',
    };

    await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(400);
  });

  test('post name length < 3', async () => {
    const token = await login(initialUser);
    const user = {
      username: 'carluntux',
      name: 'a',
      password: '1234',
    };

    await api
      .post('/api/users')
      .set('Authorization', `Bearer ${token}`)
      .send(user)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
