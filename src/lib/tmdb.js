import axios from 'axios';

// TMDB API Key from environment variables
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Create an Axios instance specifically for TMDB
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const fetchTrendingMovies = async () => {
  // Wait shortly to demonstrate loading states if needed
  const { data } = await tmdbApi.get('/trending/movie/day');
  return data.results;
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const { data } = await tmdbApi.get('/search/movie', {
    params: { query },
  });
  return data.results;
};
