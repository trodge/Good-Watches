import axios from "axios";


export const getTopMovies = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/top_rated',
      params: {
        page: page
      }
    }
  });
};


export const getRecommendations = async (movieId) => {
  console.log('get recs:', movieId);
  return axios.put(`/api/recommend/${movieId}`);
}


export const searchMovies = async (query) => {
  return axios.get(`/api/movies/search/${query}`);
}

export const getMovieDetails = async ({ movieId }) => {
  const fullUrl = `/tv/${movieId}`;
  return fetch(fullUrl);
}
export const getMovieCredits = async ({ movieId }) => {
  const fullUrl = `/tv/${movieId}/credits`;
  return fetch(fullUrl);
}