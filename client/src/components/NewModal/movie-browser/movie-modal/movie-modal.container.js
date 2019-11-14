import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from 'material-ui';
import _ from 'lodash';
import { closeMovieModal } from './movie-modal.actions';
import { getMovieDetails, getMovieCredits } from '../movie-browser.actions';
import * as movieHelpers from '../movie-browser.helpers';
import Loader from '../../common/loader.component';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const styles = {
  // Can use functions to dynamically build our CSS
  dialogContent: (backgroundUrl) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundUrl})`,
    // backgroundPosition: 'fit',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
    minHeight: 100,
    color: 'white',
    padding: 10
  })
}

class MovieModalContainer extends React.Component {
  // Triggered right after a property is changed
  componentWillReceiveProps(nextProps) {
    // If we will receive a new movieId
    if (nextProps.movieId && this.props.movieId !== nextProps.movieId) {
      nextProps.getMovieDetails(nextProps.movieId);
      nextProps.getMovieCredits(nextProps.movieId);
    }
  }

  render() {
    const { isOpen, closeMovieModal, isLoading } = this.props;
    const loadingStatus = isLoading ? 'loading' : 'hide';
    const movie = movieHelpers.updateMoviePictureUrls(this.props.movie);
    const movieCredits = movieHelpers.updateMoviePictureUrls(this.props.movieCredits);
    const genres = (movie && movie.genres) ? movie.genres.map(genre => genre.name).join(', ') : '';
    console.log(movieCredits)
    return (
      <Dialog
        autoScrollBodyContent={true}
        title={null}
        modal={false}
        open={isOpen}
        onRequestClose={closeMovieModal}
      >
        <button className="close" onClick={closeMovieModal}>X</button>
        <Loader isLoading={isLoading}>

          {/* <div style={styles.dialogContent(movie.backdrop_path)}> */}
          <Row>
            <Col lg={6}>
              <div >
                <h1>{movie.title}</h1>
                <h5>{genres}</h5>
                <p>{movie.overview}</p>
                <p>Popularity: {movie.popularity}</p>
                <p>Budget: ${movie.budget}</p>
                <button type="button" className="fa fa-heart btn btn-danger btn-sm" id="favIcon" onClick={() => {
                  console.log('tmdId:', movie.id);
                  axios.put('/api/user/favorite', { body: { tmdId: movie.id } }).then(() =>
                    closeMovieModal()).catch(reason => {
                      if (reason.toString().search('530') !== -1) {
                        // TODO: Show this to the user in a better way
                        console.log('Please log in to use this feature');
                      }
                    });
                }}> Favorite</button>
                <button type="button" className="fa fa-eye btn btn-danger btn-sm m-1" id="seenIcon" onClick={() => {
                  axios.put('/api/user/seen', { body: { tmdId: movie.id } }).then(() =>
                    closeMovieModal()).catch(reason => {
                      if (reason.toString().search('530') !== -1) {
                        // TODO: Show this to the user in a better way
                        console.log('Please log in to use this feature');
                      }
                    });
                }}> Seen it!</button>
                <button type="button" className="fa fa-trash btn btn-danger btn-sm" id="rejectIcon" onClick={() => {
                  axios.put('/api/user/reject', { body: { tmdId: movie.id } }).then(() =>
                    closeMovieModal()).catch(reason => {
                      if (reason.toString().search('530') !== -1) {
                        // TODO: Show this to the user in a better way
                        console.log('Please log in to use this feature');
                      }
                    });
                }}> Reject</button>
                {/* <p>{movieCredits.cast[0].character}</p> */}
              </div>
            </Col>
            <Col lg={6}>
              <img src={movie.poster_path} alt={movie.title} />
              {/* <img  src={movieCredits.profile_path} alt={movieCredits.name} /> */}

            </Col>
          </Row>
          {/* </div> */}

        </Loader>
      </Dialog>
    );
  }
}
// "connect" our movie modal to the component store
export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    // Using lodash get, recursively check that a property is defined
    // before try to access it - if it is undefined, it will return your default value
    // _.get(object, 'path.to.targets[0].neat.stuff', defaultValue)
    isOpen: _.get(state, 'movieBrowser.movieModal.isOpen', false),
    movieId: _.get(state, 'movieBrowser.movieModal.movieId'),
    movie: _.get(state, 'movieBrowser.movieDetails.response', {}),
    movieCredits: _.get(state, 'movieBrowser.movieCredits.response', {}),
    isLoading: _.get(state, 'movieBrowser.movieDetails.isLoading', false),
  }),
  // Map an action to a prop, ready to be dispatched
  { closeMovieModal, getMovieDetails, getMovieCredits }
)(MovieModalContainer);