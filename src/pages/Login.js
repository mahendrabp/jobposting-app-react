/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ls from 'local-storage';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Alert,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container
} from 'reactstrap';

class Login extends Component {
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleChange(e) {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  onSubmitHandler = e => {
    e.preventDefault();

    var url = 'http://localhost:5200/api/v1/users/login';
    var payload = {
      email: this.state.email,
      password: this.state.password
    };

    Axios.post(url, payload)
      .then(res => {
        var dataResponse = res.data;
        let success = dataResponse.status;
        console.log(success);

        if (success === 200) {
          this.setState({
            buttonDisable: true,
            message: 'Login Success'
          });
        } else {
          this.setState({
            buttonDisable: false,
            message: 'Login Failed'
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonDisable: false,
          message: 'Login Failed'
        });
      });
  };

  loginInvalid = () => {
    if (this.state.message === 'Login Failed') {
      return (
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          Invalid email/password
        </Alert>
      );
    } else if (this.state.message === 'Login Success') {
      return (
        <>
          <Alert
            color="success"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            Login Success
          </Alert>
          <Redirect to="/dashboard" />
        </>
      );
    }
  };

  render() {
    return (
      <>
        <Container fluid>
          <div
            style={{
              marginRight: '-400px',
              marginLeft: '500px',
              marginTop: '40px'
            }}
          >
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <h2>sign in with credentials</h2>
                  </div>
                  <Form onSubmit={this.onSubmitHandler}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          placeholder="email..."
                          value={this.state.email}
                          onChange={this.handleChange}
                        ></Input>
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="password..."
                          value={this.state.password}
                          onChange={this.handleChange}
                        ></Input>
                      </InputGroup>
                    </FormGroup>

                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                    </div>

                    <div className="text-center">
                      <FormGroup>
                        <Button color="success"> Login </Button>
                      </FormGroup>
                    </div>

                    <Col>
                      <div>{this.loginInvalid()}</div>
                    </Col>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col className="text-right" xs="6">
                  <div>
                    Don't have an account?{' '}
                    <Link to="/register"> Register Here</Link>{' '}
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Container>
      </>
    );
  }
}

export default Login;
