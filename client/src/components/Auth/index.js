import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-social';
import { Col, Row} from '../Grid';
import "./style.css";
import AUTH from "../../utils/AUTH";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class Auth extends Component {
  
  state = {
    authenticated: "",
    buttonLabel: "",
    open: false,
    width: window.innerWidth,
    show: false
  };
  constructor(props) {
    super(props);
    console.log(this.props);


  }
  authenticated = () => {
    AUTH.isAuthenticated()
      .then(
        res => {
          console.log("AuthStatement: " + res);
          this.setState({authenticated: res.data})
        })
    .catch(err => console.log("AuthStatement: " + err))
  }
  
  logoff = () => {
    AUTH.logoff()
      .then(res => {
        this.authenticated();
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  showModal = e => {
    this.setState({
      show: true
    });
  };

  closeModal = e => {
    this.setState({
      show: false
    });
  };

  
  updateWidth = () => {
    const newState = { width: window.innerWidth };

    if (this.state.open && newState.width > 991) {
      newState.open = false;
    }

    this.setState(newState);
  };

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
    if(this.authenticated()){
      console.log("Authenticated")
    }
    
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    return (
        <div>
        {this.state.authenticated ? (<button type="button" className="btn btn-danger btn-lg" onClick={() => {this.logoff()}}>
          Log off
          </button>) : (<button type="button" className="btn btn-danger btn-sm" onClick={() => {this.showModal()}}>
        Log In
        </button>)
        }
        <Modal centered="True" show={this.state.show} >
        <Modal.Header >
          <Modal.Title>Sign up to access more!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
              <Col size="md-6">
                <a id="google-button" class="btn btn-block btn-social btn-google" href="/auth/google">
                  <i class="fa fa-google"></i> Sign in with Google
                </a>
            </Col>
                <Col size="md-6">
                <a id="twitter-button" class="btn btn-block btn-social btn-twitter" href="/auth/twitter">
                  <i class="fa fa-twitter"></i> Sign in with Twitter
                </a>
              </Col>
            </Row>
          </Modal.Body>
        <Modal.Footer>
          <button  type="button" className="btn btn-danger btn-sm" onClick={e => {
                this.closeModal();
          }}
            > Close </button>
        </Modal.Footer>
        </Modal>
        </div>
    );
  }
}

export default Auth;
