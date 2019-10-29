import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';

import NavBar from './components/NavBar';
import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import './assets/scss/argon-dashboard-react.scss';

function App() {
  return (
    <BrowserRouter>
      {/* <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/register">Regis</Link>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/" component={Login} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/dashboard" component={Dashboard} exact></Route>
      </Switch> */}

      <Switch>
        <Route path="/" component={Login} exact></Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/dashboard" component={Dashboard} exact></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
