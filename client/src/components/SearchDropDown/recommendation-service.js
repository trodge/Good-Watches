// const BASEURL = "https://api.themoviedb.org/3/discover/movie?api_key="
// "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

// WARNING: Don't check your actual API key into GitHub
const MOVIE_DB_API_KEY = 'd9761b9f704ad5a0f60b04f11dbf4503';
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

export const getTopMovies = async ({page}) => {
  const fullUrl = createMovieDbUrl('/movie/top_rated', {
    page
  });
  return fetch(fullUrl);
}
// https://api.themoviedb.org/3/movie/upcoming?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US&page=1


// https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=dbc0a6d62448554c27b6167ef7dabb1b&language=en-US&page=1
export const getRecommendations = async (movieId) => {
  console.log(movieId)
  const fullUrl = createMovieDbUrl(`/movie/${movieId}/recommendations`);
  return fetch(fullUrl);
}


export const searchMovies = async ({ page, query}) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query
  });
  return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`/tv/${movieId}`);
  return fetch(fullUrl);
}
export const getMovieCredits = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`/tv/${movieId}/credits`);
  return fetch(fullUrl);
}