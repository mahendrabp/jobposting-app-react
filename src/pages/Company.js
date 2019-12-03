import React from 'react';

import CompanyItem from './CompanyItem';
import NavBar from '../components/NavBar';

import axios from 'axios';
import { Row, Button, Container, Alert } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import { connect } from 'react-redux';
import { getCompanyRedux, addCompanyRedux } from '../redux/action/company';

import ModalCompany from '../components/ModalCompany';

class Company extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      name: '',
      logo: '',
      description: '',
      formStatus: 'Add',
      selectedId: [],
      isError: true,
      message: '',
      isVisible: 'false'
    };
  }

  componentDidMount() {
    // this.getCompany();
    this.getDataCompany();
  }

  getDataCompany = () => {
    this.props.dispatch(getCompanyRedux());
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

  onShowAlert = () => {
    this.setState({ isVisible: true }, () => {
      window.setTimeout(() => {
        this.setState({ isVisible: false });
      }, 3000);
    });
  };

  companyAlert = () => {
    if (!this.state.isError) {
      return (
        <Alert
          color="success"
          isOpen={this.state.isVisible}
          style={alertFixed}
          className="text-center"
        >
          {this.state.message}
        </Alert>
      );
    } else if (this.state.isError === '' || this.state.isError === null) {
      return <div></div>;
    }
  };

  onSubmitHandler = e => {
    e.preventDefault();
    // var url;
    var payload = new FormData();
    payload.set('name', this.state.name);
    payload.append('logo', this.state.logo);
    payload.set('location', this.state.location);
    payload.set('description', this.state.description);

    if (this.state.formStatus === 'Add') {
      this.addCompany(payload);
    } else {
      this.editCompany(
        `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies/${this.state.companyIdSelected}`,
        payload
      );
    }
  };

  addCompany = async payload => {
    // e.preventDefault();
    // 					props.dispatch(addCompany({ name, location, logo, description }))
    // 					setTimeout(() => {
    // 						props.history.push('/companies')
    //           }, 500)

    try {
      await this.props.dispatch(addCompanyRedux(payload));
      this.setState({
        isVisible: true,
        message: this.props.company.message
      });
      this.getDataCompany();
      this.closeModalForm();
      this.onShowAlert();
    } catch (error) {
      console.log(error);
      alert(this.props.company.message);
      this.getDataCompany();
    }

    // axios
    //   .post(url, payload)
    //   .then(response => {
    //     console.log(response);
    //     var company = [...this.state.data];
    //     // console.log(company);
    //     company.push(response.data); //sebelumya data.data.result
    //     console.log(response.data);
    // this.setState({
    //   data: company,
    //   name: '',
    //   logo: '',
    //   location: '',
    //   description: '',
    //   formStatus: 'Add',
    //   isError: response.data.error,
    //   message: response.data.message
    // });
    //     this.getDataCompany();
    //     this.closeModalForm();
    //     this.onShowAlert();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({
    //       buttonDisabled: false
    //     });
    //   });
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
        // let res = response.data.data;
        console.log(index);
        console.log(this.logo);
        // console.log(response.data.error);
        // console.log(response.data.message);

        // companies[index].name = res.name;
        // companies[index].logo = response.logo;
        // companies[index].description = res.description;
        // companies[index].location = res.location;

        this.setState({
          // data: companies,
          name: '',
          description: '',
          logo: '',
          location: '',
          formStatus: 'Edit',
          isError: response.data.error,
          message: response.data.message
        });

        this.getDataCompany();
        this.closeModalForm();
        this.onShowAlert();
      })
      .catch(err => {
        this.setState({
          logo: '',
          formStatus: 'Add'
        });
      });
  };

  deleteCompany = id => {
    if (window.confirm('are you sure delete this company')) {
      var url = `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies/${id}`;
      axios
        .delete(url)
        .then(response => {
          var companies = [...this.state.data];
          var index = companies.findIndex(company => company.id === id);
          companies.splice(index, 1);
          console.log(response);
          this.setState({
            // data: companies,
            isError: response.data.error,
            message: response.data.message
          });

          this.getDataCompany();
          this.onShowAlert();
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  inputOnChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  inputFileOnChangeHandler = e => {
    console.log(e.target.files[0]);
    if (
      typeof e.target.files[0] !== 'undefined' ||
      e.target.files[0] == e.target.files[0]
    ) {
      this.setState({
        logo: e.target.files[0]
      });
    }
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
          {this.companyAlert()}
          <Row className="d-flex justify-content-center mt-2">
            <Button
              data-toggle="modal"
              data-target="#modalFormCompany"
              style={{ cursor: 'pointer' }}
              tag={Link}
            >
              <i className="ni ni-fat-add" />
              <span>Tambah Perusahaan</span>
            </Button>
          </Row>
          <Row>
            <CompanyItem
              key={this.state.data.id}
              // company={this.state.data}
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

const alertFixed = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '100%',
  zIndex: '9999',
  borderRadius: '0px'
};

const mapStateToProps = state => {
  return {
    company: state.company
  };
};
export default connect(mapStateToProps)(Company);

// export default Company;
