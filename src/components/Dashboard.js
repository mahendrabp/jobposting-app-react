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
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import JobItem from '../pages/JobItem';

// import routes from 'routes.js';

class Dashbboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      next: '',
      prev: '',
      isLoading: true
    };
  }

  componentDidMount() {
    this.getData().then(data => {
      // console.log(data);
      this.setState({
        data
      });
    });
  }

  getData = async () => {
    const url = await Axios.get('http://localhost:5000/api/v1/jobs');
    const getAllJobs = url.data.data.result;
    // console.log(getAllJobs);
    return getAllJobs;
  };

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  render() {
    return (
      <>
        <NavBar></NavBar>
        <Sidebar
          {...this.props}
          // routes={routes}
          logo={{
            innerLink: '/admin/index',
            imgSrc: require('../assets/img/brand/argon-react.png'),
            imgAlt: '...'
          }}
        />
        <div className="main-content" ref="mainContent">
          {this.state.data.map(
            (job, index) => (
              console.log(job),
              (
                <JobItem
                  key={index}
                  job={job.job}
                  location={job.location}
                  category={job.category}
                  company={job.company}
                  description={job.description}
                ></JobItem>
              )
            )
          )}
        </div>
      </>
    );
  }
}

export default Dashbboard;
