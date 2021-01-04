import Axios from 'axios';
// List of movie modal action type keys
export const keys = {
  'OPEN_MOVIE_MODAL': 'OPEN_MOVIE_MODAL',
  'CLOSE_MOVIE_MODAL': 'CLOSE_MOVIE_MODAL',
}

// Opens the <MovieModal /> with a movieId
export const openMovieModal = (movieId) => {
  return {
    type: keys.OPEN_MOVIE_MODAL,
    movieId
  };
}

// Closes the <MovieModal />
export const closeMovieModal = () => {
  return {
    type: keys.CLOSE_MOVIE_MODAL
  };
}

// Favorites a movie.
export const favoriteMovie = async (id) => {
  await Axios.put('/api/user/favorite', { body: { tmdId: id } });
  return closeMovieModal();
}

// Marks a movie seen.
export const seenMovie = async (id) => {
  await Axios.put('/api/user/seen', { body: { tmdId: id } });
  return closeMovieModal();
}

// Rejects a movie.
export const rejectMovie = async (id) => {
  await Axios.put('/api/user/reject', { body: { tmdId: id } });
  return closeMovieModal();
}
