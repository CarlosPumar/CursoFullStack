const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  // await User.deleteMany({});

  response.status(204).end();
});

router.post('/poblate', async (request, response) => {
  const user = await User.findOne({ username: 'carluntux' });
  const blogs = [
    {
      title: 'test1',
      author: 'author1',
      url: 'test1.com',
      likes: 10,
      user: user,
    },
    {
      title: 'test2',
      author: 'author2',
      url: 'test2.com',
      likes: 20,
      user: user,
    },
    {
      title: 'test3',
      author: 'author3',
      url: 'test3.com',
      likes: 30,
      user: user,
    },
  ];

  const newBlogs = blogs.map((blog) => new Blog(blog));

  if (!user.blogs) user.blogs = [];

  for (let i = 0; i < newBlogs.length; i++) {
    let blog = newBlogs[i];
    let result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
  }
  await user.save();

  response.status(204).end();
});

module.exports = router;
