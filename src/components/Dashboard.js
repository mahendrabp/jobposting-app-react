import React from 'react';

// core components
import NavBar from './NavBar';
// import Sidebar from './Sidebar';
import Job from '../pages/Job';
// import Company from '../pages/Company';
import Footer from './Footer';
// import routes from 'routes.js';

class Dashboard extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }

  render() {
    return (
      <>
        <NavBar></NavBar>

        <Job></Job>
        {/* <Company></Company> */}
        <Footer></Footer>
      </>
    );
    // } else {
    //   return <Redirect to="/login" exact></Redirect>;
    // }
  }
}

export default Dashboard;
