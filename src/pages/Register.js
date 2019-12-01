import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/img/icons/common/4.svg';

class Register extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: false,
      message: '',
      isError: '',
      visible: false
    };
  }

  registerInvalid = () => {
    if (this.state.isError === true) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.state.message}
        </Alert>
      );
    } else {
      return (
        <>
          <Alert
            color="success"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            {this.state.message}{' '}
            <Link className="mr-7" to="/login">
              Login
            </Link>
          </Alert>
          {/* <Redirect to="/dashboard" />; */}
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

    var url = 'http://localhost:5200/api/v1/users/register';
    var payload = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(url, payload)
      .then(response => {
        console.log(response);
        let message = response.data;
        if (
          this.state.message === 'Username already exist.' ||
          this.state.message === 'Register failed.'
        ) {
          this.setState({
            buttonDisabled: true,
            message,
            visible: true
          });
        } else {
          this.setState({
            buttonDisabled: false,
            isError: false,
            message: 'Register Success',
            visible: true
          });
        }
      })
      .catch(error => {
        let message = error.response.data.message;
        console.log(error.response.data.error);
        if (error.response.data.error === true) {
          this.setState({
            message: message,
            isError: true,
            visible: true
          });
        }
      });
  };

  render() {
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-md" style={bgImage}>
              <Row className="justify-content-center mt-7">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <h2>Daftar dengan email</h2>
                      </div>
                      <Form onSubmit={this.onSubmitHandler}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.inputOnChangeHandler}
                            />
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
                              id="password"
                              className="form-control"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.inputOnChangeHandler}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button className="mt-4" color="info" type="submit">
                            Daftar
                          </Button>
                        </div>
                        <div></div>{' '}
                        <div>
                          <div className="col mt-2">
                            {this.registerInvalid()}
                          </div>{' '}
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <p className="mt-4">
                    Sudah Punya Akun?{' '}
                    <Link
                      className="btn btn-link pl-1 text-capitalize"
                      to="/login"
                      exact
                    >
                      Login disini.
                    </Link>
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        {/* <SimpleFooter /> */}
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
export default Register;
