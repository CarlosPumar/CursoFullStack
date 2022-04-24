const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1 });
  response.json(users);
});

userRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const saltRounds = 10;
  const password = await bcrypt.hash(body.password, saltRounds);

  // Manually validation
  if (body.password.length < 3 || body.username.length < 3) {
    next({
      name: 'UserValidation',
      message: 'not a valid user!',
    });
  }

  const user = new User({
    username: body.username,
    name: body.name,
    password,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = userRouter;
