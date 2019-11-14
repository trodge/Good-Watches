
import axios from 'axios';

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

export const getUpcoming = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/upcoming',
      params: {
        page: page
      }
    }
  });
};

export const getNowPlaying = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/now_playing',
      params: {
        page: page
      }
    }
  });
};

export const getPopular = async ({ page }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: '/movie/popular',
      params: {
        page: page
      }
    }
  });
};

export const getRecommendations = async ({ movieId }) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: `/movie/${movieId}/recommendations`
    }
  });
};


export const searchMovies = async ({ query }) => {
  return axios.get(`/api/movies/search/${query}`);
};

export const getMovieDetails = async ({movieId}) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: `/movie/${movieId}`
    }
  });
}
export const getMovieCredits = async ({movieId}) => {
  return axios.put('/api/movies', {
    query: {
      relativeUrl: `/movie/${movieId}/credits`
    }
  });
}