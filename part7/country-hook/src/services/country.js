import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  console.log(response);
  return response.data;
};

const get = async (name) => {
  let response;
  try {
    response = await axios.get(`${baseUrl}/name/${name}?fullText=true`);
    return response.data[0];
  } catch {
    response = null;
    return response;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, get };
