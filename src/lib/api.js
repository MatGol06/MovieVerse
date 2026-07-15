import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const backendApi = axios.create({
  baseURL,
});

export const getWatchlist = async (userId) => {
  if (!userId) return [];
  const { data } = await backendApi.get(`/watchlist/${userId}`);
  return data.data;
};

export const addToWatchlist = async (payload) => {
  const { data } = await backendApi.post('/watchlist', payload);
  return data.data;
};

export const removeFromWatchlist = async ({ userId, movieId }) => {
  const { data } = await backendApi.delete(`/watchlist/${userId}/${movieId}`);
  return data.data;
};
