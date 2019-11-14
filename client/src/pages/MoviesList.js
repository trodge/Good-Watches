import React, {Component} from "react";

import { search } from "../utils/utils.js";
import Movies from "../components/Movies/Movies";

import MovieBrowser from '../components/NewModal/movie-browser/movie-browser.container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class NewReleases extends Component {
  state = {
    movies: null,
    loading: false,
 
  };
  
  search = async val => {
    this.setState({ loading: true });
    const results = await search( 
      `/api/movies/search/${val}`
    );
    const movies = results;

    this.setState({ movies, loading: false });
  };

  onChangeHandler = async e => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  get renderMovies() {
    let movies = <h1 className="text-center">Search for a tv show to find information about it!</h1>;
    if (this.state.movies) {
      movies = <Movies list={this.state.movies} />;
    }

    return movies;
  }

  render() {
    return (
      <MuiThemeProvider>
        <MovieBrowser />
      </MuiThemeProvider>
    );
  }
}

export default NewReleases;
