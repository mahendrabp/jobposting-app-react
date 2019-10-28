import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Alert, Form, Input, Button, Row, Col, FormGroup } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: false,
      message: '',
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  registerResult = () => {
    if (this.state.message === 'success adding new user') {
      return (
        <>
          <Alert
            color="success"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            {this.state.message}
          </Alert>
          <Redirect to="/dashboard" />
        </>
      );
    } else if (
      this.state.message === 'Username already exist.' ||
      this.state.message === 'email already exist'
    ) {
      return (
        <>
          <Alert
            color="danger"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            {this.state.message}
          </Alert>
        </>
      );
    }
  };

  inputOnChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ buttonDisabled: true });

    var url = 'http://localhost:5000/api/v1/users/register/';
    var payload = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(url, payload)
      .then(res => {
        console.log(res);
        let message = res.data.message;
        if (message === 'Success to register new user') {
          this.setState({
            buttonDisabled: true,
            message: 'success adding new user'
          });
        } else {
          this.setState({
            buttonDisabled: false,
            message: 'email already exist'
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonDisabled: false,
          message: 'email already exist'
        });
      });
  };

  render() {
    return (
      <>
        <div
          style={{
            marginRight: '-400px',
            marginLeft: '500px',
            marginTop: '40px'
          }}
        >
          <Row>
            <Col lg="5" md="7">
              <h2>
                <b>Register</b>
              </h2>
              <Form onSubmit={this.onSubmitHandler}>
                <FormGroup>
                  <Input
                    type="text"
                    name="email"
                    placeholder="Email..."
                    value={this.state.email}
                    onChange={this.inputOnChangeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password..."
                    value={this.state.password}
                    onChange={this.inputOnChangeHandler}
                  />
                </FormGroup>

                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  disabled={this.state.buttonDisabled}
                >
                  Create account
                </Button>
              </Form>

              <p>
                Already have an account? <Link to="/login">Login Here</Link>{' '}
              </p>
              {this.registerResult()}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Register;
