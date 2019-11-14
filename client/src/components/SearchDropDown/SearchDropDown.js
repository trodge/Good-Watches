import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row, Container } from "../Grid";
import { connect } from 'react-redux';
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
            recommendations: []
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
        console.log(selectedMovie)
        if (!selectedMovie) {
            return;
        }
        this.fetchRecommendations(selectedMovie._id);

        // const movieURL = movieService.getRecommendations(selectedMovie.id); 
        // console.log(movieURL)
        // this.fetchRecommendations();
    }

    fetchRecommendations(movieId) {
        movieService.getRecommendations(movieId).then(response => {
            this.setState({ recommendations: response.data });
        });
    }

    fetchMovies(query) {
        movieService.searchMovies(query).then(response => {
            console.log(response.data);
            this.setState({ movies: response.data });
        });
    }

    render() {
        const { recMovies } = this.props;
        console.log('recommendations:', this.state.recommendations)
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
                                        {Array.isArray(this.state.movies) && this.state.movies
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
        recMovies: state.movieBrowser.recMovies
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(Dropdown);