import axios from 'axios';
const baseUrl = '/api/comments';

const getConfig = () => {
  const userJSON = window.localStorage.getItem('user');

  if (!userJSON) return {};

  const user = JSON.parse(userJSON);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return config;
};

const getAll = async () => {
  const config = getConfig();
  const request = await axios.get(baseUrl, config);
  return request.data;
};

const post = async (newObject) => {
  const config = getConfig();

  const userJSON = window.localStorage.getItem('user');
  const user = JSON.parse(userJSON);
  newObject.user = user.id;

  const request = await axios.post(baseUrl, newObject, config);
  return request.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, post };
