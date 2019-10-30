// import React from 'react';

// import { Link, Redirect } from 'react-router-dom';
// import NavBar from '../components/NavBar';
// import Sidebar from '../components/Sidebar';

// class Company extends React.Component {
//   render() {
//     return <></>;
//   }
// }

// export default Company;

import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import CompanyItem from './CompanyItem';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

// const Company = props => {
//   return (
//     <div>
//       <NavBar></NavBar>
//       <CompanyItem></CompanyItem>
//       <Sidebar></Sidebar>
//     </div>
//   );
// };

class Company extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <CompanyItem></CompanyItem>
        <Sidebar></Sidebar>
      </div>
    );
  }
}

export default Company;
