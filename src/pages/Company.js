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

import Axios from 'axios';
import axios from 'axios';
import { Row, Button, Col, Container } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import ls from 'local-storage';

import ModalCompany from '../components/ModalCompany';

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
      data: [],
      name: '',
      logo: '',
      description: '',
      formStatus: 'Add',
      selectedId: []
    };
  }

  componentDidMount() {
    this.getCompany();
  }

  getCompany = () => {
    let url = `http://localhost:5200/api/v1/companies`;
    Axios.get(url)
      .then(response => {
        // console.log(response.data.data);
        const data = response.data.data;
        // console.log(data);
        this.setState({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  cancelButtonHandler = e => {
    e.preventDefault();
    this.setState({
      companyIdSelected: null,
      name: '',
      description: '',
      logo: '',
      location: '',
      formStatus: 'Add'
    });
  };

  closeModalForm = () => {
    document.getElementById('closeModalForm').click();
  };

  onSubmitHandler = e => {
    e.preventDefault();
    var url;
    var payload = new FormData();
    payload.set('name', this.state.name);
    payload.append('logo', this.state.logo);
    payload.set('location', this.state.location);
    payload.set('description', this.state.description);

    if (this.state.formStatus === 'Add') {
      url = 'http://localhost:5200/api/v1/companies';
      this.addCompany(url, payload);
    } else {
      this.editCompany(
        `http://localhost:5200/api/v1/companies/${this.state.companyIdSelected}`,
        payload
      );
    }
  };

  addCompany = (url, payload) => {
    axios
      .post(url, payload)
      .then(response => {
        console.log(response);
        var company = [...this.state.data];
        // console.log(company);
        company.push(response.data); //sebelumya data.data.result
        console.log(response.data);
        this.setState({
          data: company,
          name: '',
          logo: '',
          location: '',
          description: '',
          formStatus: 'Add'
        });
        this.getCompany();
        this.closeModalForm();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonDisabled: false
        });
      });
  };

  editHandler = company => {
    this.setState({
      name: company.name,
      description: company.description,
      logo: company.logo,
      location: company.location,
      formStatus: 'Edit',
      companyIdSelected: company.id
    });
  };

  editCompany = (url, payload) => {
    axios
      .patch(url, payload)
      .then(response => {
        console.log(response);
        let companies = [...this.state.data];
        let index = companies.findIndex(
          company => company.id === this.state.jobIdSelected
        );
        let res = response.data.data;
        console.log(res);

        // jobs[index].name = res.nameoke;
        // jobs[index].description = res.description;
        // jobs[index].location = res.location;
        // jobs[index].category_id = res.category_id;
        // jobs[index].company_id = res.company_id;
        // jobs[index].salary = res.salary;

        this.setState({
          data: companies,
          description: '',
          logo: '',
          location: '',
          formStatus: 'Edit'
        });

        this.getCompany();
        this.closeModalForm();
      })
      .catch(err => {
        this.setState({
          formStatus: 'Add'
        });
      });
  };

  deleteCompany = id => {
    if (window.confirm('are you sure delete this company')) {
      var url = `http://localhost:5200/api/v1/companies/${id}`;
      axios
        .delete(url)
        .then(response => {
          var companies = [...this.state.data];
          var index = companies.findIndex(company => company.id === id);
          companies.splice(index, 1);
          console.log(response);
          this.setState({
            data: companies
          });

          this.getCompany();
        })
        .catch(error => {});
    }
  };

  inputOnChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  inputFileOnChangeHandler = e => {
    console.log(e.target.files[0]);
    this.setState({
      logo: e.target.files[0]
    });
  };

  render() {
    let logintoken;
    if (ls.get('token') && ls.get('token') !== undefined) {
      logintoken = <Redirect to="/company" />;
    } else {
      logintoken = <Redirect to="/login" />;
    }
    return (
      <>
        {logintoken}
        <NavBar></NavBar>
        <Container>
          <Row>
            <Button
              data-toggle="modal"
              data-target="#modalFormCompany"
              style={{ cursor: 'pointer' }}
              tag={Link}
            >
              <i className="ni ni-ui-04" />
              Add Company
            </Button>
          </Row>
          <Row>
            <CompanyItem
              key={this.state.data.id}
              company={this.state.data}
              deleteCompany={id => this.deleteCompany(id)}
              editHandler={company => this.editHandler(company)}
              // editButtonHandler={job => this.editButtonHandler(job)}
              selected={this.state.selectedId}
              logo={this.state.logo}
              // companyIdSelected={this.state.companyIdSelected}
            ></CompanyItem>
          </Row>
        </Container>

        {/* <Sidebar></Sidebar> */}

        <ModalCompany
          formStatus={this.state.formStatus}
          onSubmitHandler={this.onSubmitHandler}
          inputOnChangeHandler={this.inputOnChangeHandler}
          inputFileOnChangeHandler={this.inputFileOnChangeHandler}
          name={this.state.name}
          logo={this.state.logo}
          location={this.state.location}
          description={this.state.description}
          company={this.state.data}
          // addJobInvalid={this.addJobInvalid}
          // dataCategory={this.state.dataCategory}
          // dataCompany={this.state.dataCompany}
          closeModalForm={this.closeModalForm}
          cancelButtonHandler={this.cancelButtonHandler}
        ></ModalCompany>
      </>
    );
  }
}

export default Company;
