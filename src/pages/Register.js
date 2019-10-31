import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

// import backgroundImage from './6.svg';
// import '../login.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonDisabled: false,
      message: '',
      isSuccess: false
    };
  }

  registerResult = () => {
    console.log();
    if (this.state.message === 'Success to register new user') {
      return (
        <>
          <div class="alert alert-success mt-4" role="alert">
            {this.state.message}
          </div>
          <Redirect to="/" />
        </>
      );
    } else if (this.state.message === 'email already exist.') {
      return (
        <div class="alert alert-danger mt-4" role="alert">
          {this.state.message}
        </div>
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
        let message = response.data.message;
        if (
          this.state.message === 'Username already exist.' ||
          this.state.message === 'Register failed.'
        ) {
          this.setState({
            buttonDisabled: true,
            message
          });
        } else {
          this.setState({
            buttonDisabled: false,
            message: 'Register failed.'
          });
        }
      })
      .catch(error => {
        let message = error.response.data.message;
        console.log(message);
        if (this.state.isSuccess === false) {
          this.setState({
            message: message
          });
        }
        // if (message === 'email already exist.') {
        //   this.setState({
        //     buttonDisabled: false,
        //     message
        //   });
        // } else {
        //   this.setState({
        //     buttonDisabled: false,
        //     message: 'Register failed.'
        //   });
        // }
      });
  };

  render() {
    return (
      <section class="fdb-block py-0">
        <div
          class="container py-5 my-5"
          // style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div class="row">
            <div class="col-12 col-md-8 col-lg-7 col-xl-5 text-left fdb-box">
              <form onSubmit={this.onSubmitHandler}>
                <div class="row">
                  <div class="col">
                    <h1>Register</h1>
                  </div>
                </div>
                <div class="row">
                  <div class="col mt-4">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.inputOnChangeHandler}
                    />
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.inputOnChangeHandler}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <button class="btn btn-primary btn-raised" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </form>
              <p className="mt-4">
                Already have an account?{' '}
                <Link
                  className="btn btn-link pl-1 text-capitalize"
                  to="/"
                  exact
                >
                  Login here.
                </Link>
              </p>
              {this.registerResult()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
