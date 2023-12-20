import axios from 'axios';

const API_URL = 'https://funny-sock-lion.cyclic.app';

export const getAllData = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
