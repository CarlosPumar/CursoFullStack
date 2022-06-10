const commentRouter = require('express').Router();
const Comment = require('../models/comment');
const Blog = require('../models/blog');

commentRouter.get('/', async (request, response) => {
  let comments = await Comment.find({});
  response.json(comments);
});

commentRouter.post('/', async (request, response) => {
  const blog = await Blog.findById(request.body.blog);

  const comment = new Comment(request.body);
  let result = await comment.save();

  if (!blog.comments) blog.comments = [];

  blog.comments = blog.comments.concat(result._id);
  await blog.save();

  console.log(result);

  response.status(201).json(result);
});

commentRouter.delete('/:id', async (request, response) => {
  const id = String(request.params.id);

  let comment;
  try {
    comment = await Comment.findById(id);
  } catch (Error) {
    response.status(404).json({ error: 'not found' });
  }

  let result = await Comment.findByIdAndDelete(id);
  response.status(200).json(result);
});

module.exports = commentRouter;
