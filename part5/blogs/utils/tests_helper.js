const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

const login = async (user) => {
  const result = await api.post('/api/login').send(user).expect(200);
  return result.body.token;
};

module.exports = { login };
