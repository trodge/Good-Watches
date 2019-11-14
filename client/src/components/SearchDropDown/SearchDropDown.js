import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row, Container } from "../Grid";
import {connect} from 'react-redux';
import Downshift from "downshift";
import axios from "axios";
import * as movieService from './recommendation-service.js';
import * as movieActions from './recommendation.actions.js';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import Movies from "./Movies";
import "./styles.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      recommendations : []
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.fetchRecommendations = this.fetchRecommendations.bind(this);
    this.downshiftOnChange = this.downshiftOnChange.bind(this);
  }

  inputOnChange(event) {
    if (!event.target.value) {
      return;
    }
    this.fetchMovies(event.target.value);
  }

  downshiftOnChange(selectedMovie) {
    // alert(`your favourite movie is ${selectedMovie.title}`);
    console.log(selectedMovie) 
    console.log(selectedMovie.id)
    if (!selectedMovie) {
      return;
    }
    this.fetchRecommendations(selectedMovie.id);

    // const movieURL = movieService.getRecommendations(selectedMovie.id); 
    // console.log(movieURL)
    // this.fetchRecommendations();
  }

  fetchRecommendations(movieId) {
    // movieService.getRecommendations(movieId); 
    // https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=<<api_key>>&language=en-US&page=1

    const moviesURL = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=1b5adf76a72a13bad99b8fc0c68cb085&language=en-US`;
    axios.get(moviesURL).then(response => {
      this.setState({ recommendations: response.data.results });
    });
  }
  fetchMovies(movie) {
    // createMovieDbUrl({ relativeUrl: `/movie/${movie.tmdId}/recommendations` })
    const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=${movie}`;
    axios.get(moviesURL).then(response => {
      this.setState({ movies: response.data.results });
    });
  }

  render() {
    const {recMovies} = this.props;
    let movies = movieHelpers.getMoviesList(recMovies.response);
    console.log(this.state.recommendations)
    return (
      <Container>
      <Downshift
        onChange={this.downshiftOnChange}
        itemToString={item => (item ? item.title : "")}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          getLabelProps
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
              Search for a movie you like and we will give you movie recommendations
            </label>{" "}
            <br />
            <input
              {...getInputProps({
                placeholder: "Search movies",
                onChange: this.inputOnChange
              })}
            />
            {isOpen ? (
              <div className="downshift-dropdown">
                {this.state.movies
                  .filter(
                    item =>
                      !inputValue ||
                      item.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
        
      </Downshift>
      
      <Row>
      <Movies list={this.state.recommendations} />
      </Row>
    </Container>
    );
  }
}
// export default Dropdown;
export default connect(
  // Map nodes in our state to a properties of our component
  (state) => ({
    recMovies : state.movieBrowser.recMovies
  }),
  // Map action creators to properties of our component
  { ...movieActions }
)(Dropdown);