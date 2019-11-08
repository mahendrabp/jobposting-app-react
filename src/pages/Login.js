import React, { Component } from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import backgroundImage from '../assets/img/icons/common/4.svg';

// reactstrap components
import {
  Button,
  Card,
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
      visible: true,
      isLogin: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false, isLogin: '' });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
        console.log(res);
        if (success === 200) {
          ls.set('token', dataResponse.token);
          // ls.set('email', dataResponse.email);
          this.setState({
            isLogin: true,
            buttonDisable: true,
            message: dataResponse.message,
            visible: true
          });
        } else {
          this.setState({
            isLogin: false,
            buttonDisable: false,
            visible: true
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLogin: false,
          buttonDisable: false,
          message: err.response.data.message,
          visible: true
        });
      });
  };

  loginInvalid = () => {
    if (this.state.isLogin === false) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.state.message}
        </Alert>
      );
    } else if (this.state.isLogin === true) {
      return (
        <>
          <Alert
            color="success"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            {this.state.message}
          </Alert>
          <Redirect to="/dashboard" />;
        </>
      );
    }
  };

  render() {
    let logintoken;
    if (ls.get('token') && ls.get('token') !== undefined) {
      logintoken = <Redirect to="/" />;
    } else {
      logintoken = <Redirect to="/login" />;
    }
    return (
      <>
        {logintoken}
        <div>
          <Container
            className="pt-lg-md"
            // style={{ backgroundImage: `url(${backgroundImage})` }}
            style={bgImage}
          >
            <Row className="justify-content-center mt-7">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <h2>Masuk dengan email</h2>
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
                            placeholder="Email"
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
                            placeholder="Password"
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
                          <Button color="primary"> Login </Button>
                        </FormGroup>
                      </div>

                      <Col>
                        <div>{this.loginInvalid()}</div>
                      </Col>
                    </Form>
                  </CardBody>
                </Card>

                {/* <Col className="text-justify-center" xs="6">
                  <div>Don't have an account?</div>
                  <div>
                    <Link to="/register"> Register Here</Link>{' '}
                  </div>
                </Col> */}
                <p className="mt-4">
                  Belum punya akun?{' '}
                  <Link
                    className="btn btn-link pl-1 text-capitalize"
                    to="/register"
                    exact
                  >
                    Daftar disini
                  </Link>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const bgImage = {
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${backgroundImage})`
};

export default Login;
