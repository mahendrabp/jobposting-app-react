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

import CompanyItem from './CompanyItem';
import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';
import Axios from 'axios';
import ModalJob from '../components/ModalJob';

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

    this.state = {
      data: []
    };
  }

  getCompany = () => {
    let url = `http://localhost:5200/api/v1/companies`;
    Axios.get(url)
      .then(result => {
        console.log(result.data.data);
        const data = result.data.data;
        // console.log(data);
        this.setState({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCompany();
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <CompanyItem company={this.state.data}></CompanyItem>
        <Sidebar></Sidebar>
        {/* <ModalJob dataCompany={this.state.data}></ModalJob> */}
      </div>
    );
  }
}

export default Company;
