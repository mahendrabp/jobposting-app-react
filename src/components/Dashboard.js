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
import React from 'react';
import Axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import ls from 'local-storage';
// reactstrap components
import { Container } from 'reactstrap';

// core components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import Job from '../pages/Job';
// import Company from '../pages/Company';

// import routes from 'routes.js';

class Dashboard extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  render() {
    if (ls.get('token') && ls.get('token') !== undefined) {
      return (
        <>
          <NavBar></NavBar>
          <Sidebar
            {...this.props}
            // routes={routes}
            // logo={{
            //   innerLink: '/admin/index',
            //   imgSrc: require('../assets/img/brand/argon-react.png'),
            //   imgAlt: '...'
            // }}
          />
          <Job></Job>
          {/* <Company></Company> */}
        </>
      );
    } else {
      return <Redirect to="/login" exact></Redirect>;
    }
  }
}

export default Dashboard;
