import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const classifyMood = async (text) => {
  try {
    const response = await api.post('/mood', { text, type: 'text' });
    return response.data;
  } catch (error) {
    console.error('Error classifying mood:', error);
    throw error;
  }
};

export const getRecommendations = async (mood) => {
  try {
    const response = await api.get(`/recommendations?mood=${mood}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export default api;
