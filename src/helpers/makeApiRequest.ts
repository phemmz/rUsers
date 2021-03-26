const BASE_URL = 'https://randomuser.me/api';

const makeApiRequest = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`);

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default makeApiRequest;
