import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class MoviePage extends Component {
  state = {

  };


  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Movie Data</strong>
              </h1>
              <h2 className="text-center">Currently in development!</h2>
              
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MoviePage;
