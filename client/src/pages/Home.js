import React, { Component } from 'react';

import Card from '../components/Card';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { Col, Container, Row } from '../components/Grid';
import Jumbotron from '../components/Jumbotron';
import { List } from '../components/List';
import Movie from '../components/Movies/Movie.js';
import Dropdown from "../components/SearchDropDown/SearchDropDown"

import "../homepage.css"
class Home extends Component {
  state = {
    movies: [],
    q: '',
    message: 'Search a movie or genre to find what you should watch!'
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  refreshMovies = () => {}/*getMovies(this.state.q)
    .then(res => this.setState({ movies: res.data }))
    .catch(err => this.setState({
      movies: [],
      message: err || 'No new movies found, try a different query.'
    }));*/

  handleFormSubmit = event => {
    event.preventDefault();
    this.refreshMovies();
  };

  render() {
    
    return (
        
          <Container>
            <Jumbotron fluid>
            <Col size='md-12'>
              
              <h1 className='text-center'>
                <strong>Find something good to watch</strong>
              </h1>
              <br/>
              <h5 className='text-center'>Your one place shop to find recommendations and information on movies and tv shows.</h5>

            </Col>
            <Row>
              
              <Col size='md-12'>
                <Card title='Having trouble finding something to watch?' icon='far fa-movie'>
                  {/* <Form
                    handleInputChange={this.handleInputChange} handleFormSubmit=
                    {this.handleFormSubmit} q=
                    {
                      this.state.q
                    } /> */}
                    <Dropdown />
                </Card >
              </Col>
            </Row>
            
            <Row>
              {/* <Col size='md-12'>
                <Card title='Results'> {
                  this.state.movies.length ?
                    (<List>{this.state.movies.map((movie, i) => (
                      <Movie
                        key={i}
                        title={movie.title}
                        link={movie.link}
                        Button={() => (
                          <button
                            onClick={() => this.handleMovieSave(movie.id)}
                            className='btn btn-primary ml-2'
                          >
                            Save
                            </button>
                        )}
                      />
                    ))}
                    </List>
                    ) : (
                      <h2 className="text-center">{this.state.message}</h2>
                    )}
                </Card>
              </Col> */}
            </Row>
            <Row>
              
            </Row>
            </Jumbotron>
          </Container>
        
    );
  }
}

export default Home;
