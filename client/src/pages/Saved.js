import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {

  };


  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>User Data</strong>
              </h1>
              <h2 className="text-center">See what you have favorited and watched.</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Favorites">
             
            </Card>
          </Col>
          <Col size="md-12">
            <Card title="Watched">
             
            </Card>
          </Col>
          <Col size="md-12">
            <Card title="No watch list">
             
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
