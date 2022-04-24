const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.user);

  const blog = new Blog(request.body);
  let result = await blog.save();

  if (!user.blogs) user.blogs = [];

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = String(request.params.id);
  const user_id = String(response.locals.user.id);

  let blog = null;
  try {
    blog = await Blog.findById(id);
  } catch (Error) {
    response.status(404).json({ error: 'not found' });
  }

  let result = null;

  if (blog.user.toString() === user_id) {
    result = await Blog.findByIdAndDelete(id);
    response.status(200).json(result);
  }

  response.status(404).json({ error: 'error' });
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };

  let result = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(result);
});

module.exports = blogsRouter;
