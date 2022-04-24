const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { login } = require('../utils/tests_helper');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Pepe',
    url: 'www.pepe.com',
    likes: 10,
  },
  {
    title: 'Luisillo el golosillo',
    author: 'Luisillo',
    url: 'www.luisilloelpillo.com',
    likes: 1000,
  },
];

const initialUser = {
  username: 'carluntux',
  name: 'carlos',
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

  let blogs = initialBlogs.map((blog) => {
    blog.user = user.id;
    return new Blog(blog);
  });

  let savePromises = blogs.map((blog) => blog.save());
  await Promise.all(savePromises);
});

test('Json format and good return value', async () => {
  const token = await login(initialUser);

  const blogs = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/);

  expect(blogs.body).toHaveLength(2);
});

test('there are two elements', async () => {
  const token = await login(initialUser);
  await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/);
});

test('has id?', async () => {
  const token = await login(initialUser);
  let blogs = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`);
  expect(blogs.body[0].id).toBeDefined();
});

test('post test', async () => {
  const token = await login(initialUser);

  let user = await User.find({ username: initialUser.username });

  const newBlog = {
    title: 'Voy a por ello',
    author: 'JP',
    url: 'www.jpyt.com',
    likes: 10,
    user: user[0]._id,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201);
  let response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test('default likes value to 0', async () => {
  await Blog.deleteMany();
  const token = await login(initialUser);
  let user = await User.find({ username: initialUser.username });

  const newBlog = {
    title: 'Voy a por ello',
    author: 'JP',
    url: 'www.jpyt.com',
    user: user[0]._id,
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201);
  let response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
  expect(response.body[0].likes).toBe(0);
});

test('blog has to have author and title', async () => {
  const token = await login(initialUser);
  const newBlogs = [
    {
      title: 'Voy a por ello',
      url: 'www.jpyt.com',
    },
    {
      author: 'Currice',
      url: 'www.ccyt.com',
    },
  ];

  let request = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlogs[0])
    .expect(400);
});

test('delete one', async () => {
  const token = await login(initialUser);

  let user = await User.find({ username: initialUser.username });

  let blogs = await Blog.find({ user: user[0]._id });

  await api
    .delete('/api/blogs/' + blogs[0]._id)
    .set('Authorization', `Bearer ${token}`)
    .expect(200);
  await api
    .delete('/api/blogs/' + '1000')
    .set('Authorization', `Bearer ${token}`)
    .expect(404);
});

afterAll(() => {
  mongoose.connection.close();
});
