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
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container, FormGroup, Label, Input, Row, Col } from 'reactstrap';
// core components

import JobItem from './JobItem';
import Loading from '../components/Loading';
import ModalJob from '../components/ModalJob';
import ls from 'local-storage';

// import routes from 'routes.js';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      next: '',
      prev: '',
      isLoading: true,

      search: '',
      company: '',
      limit: 5,
      page: '1',
      sortby: 'name',
      orderby: 'asc',
      totalPage: '',

      selectedId: [],
      name: '',
      description: '',
      salary: '',
      location: '',
      category_id: 1,
      company_id: 1,
      formStatus: 'Add',
      buttonDisabled: false
    };
  }

  getJobs = (search, company, limit, page, sortby, orderby) => {
    let url = `http://localhost:5200/api/v1/jobs?name=${search}&company=${company}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`;
    Axios.get(url)
      .then(result => {
        const data = result.data.data.result;
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
    // this.getJobs().then(data => {
    //   // console.log(data);
    //   this.setState({
    //     data
    //   });
    // });
    this.getJobs(
      this.state.search,
      this.state.company,
      this.state.limit,
      this.state.page,
      this.state.sortby,
      this.state.orderby
    );
  }

  getSort = e => {
    e.preventDefault();
    let sortby = e.target.value;
    this.setState({
      sortby
    });
    this.getJobs(
      this.state.search,
      this.state.company,
      this.state.limit,
      this.state.page,
      sortby,
      this.state.orderby
    );
  };

  getOrder = e => {
    e.preventDefault();
    let orderby = e.target.value;
    this.setState({
      orderby
    });
    this.getJobs(
      this.state.search,
      this.state.company,
      this.state.limit,
      this.state.page,
      this.state.sortby,
      orderby
    );
  };

  getSearch = e => {
    e.preventDefault();
    let search = e.target.value;
    console.log(search.length);
    this.setState({
      search
    });
    if (search.length >= 3) {
      this.setState({
        page: 1
      });

      this.getJobs(
        search,
        this.state.company,
        this.state.limit,
        this.state.page,
        this.state.sortby,
        this.state.orderby
      );
    } else {
      this.getJobs(
        '',
        this.state.company,
        this.state.limit,
        this.state.page,
        this.state.sortby,
        this.state.orderby
      );
    }
  };

  getCompany = e => {
    e.preventDefault();
    let company = e.target.value;
    this.setState({
      company
    });
    if (company.length >= 3) {
      this.setState({
        page: 1
      });
      this.getJobs(
        this.state.search,
        company,
        this.state.limit,
        this.state.page,
        this.state.sortby,
        this.state.orderby
      );
    } else {
      this.getJobs(
        this.state.search,
        '',
        this.state.limit,
        this.state.page,
        this.state.sortby,
        this.state.orderby
      );
    }
  };

  getLimit = e => {
    e.preventDefault();
    let limit = e.target.value;
    this.setState({
      page: 1,
      limit
    });
    this.getJobs(
      this.state.search,
      this.state.company,
      limit,
      this.state.page, // sebelumnya 1
      this.state.sortby,
      this.state.orderby
    );
  };

  pagination = e => {
    const totalPage = this.state.totalPage;
  };

  // ifEmptyJobs = () => {
  //   const data = this.state.data;
  //   if (data.length <= 0 || data.length === null) {
  //     return <h2 className="h5 text-center">Jobs not found.</h2>;
  //   }
  // };

  ifEmptyJobs = () => {
    let data = [...this.state.data];
    // console.log(data);
    if (data && data !== undefined && data.length >= 1) {
      return (
        <div class="row">
          {data !== '' && data !== [] && data !== null && data !== 0 ? (
            <JobItem
              job={this.state.data}

              // selected={this.state.selectedId}
              // menuClick={(id) => this.menuClickHandler(id)}
              // editButtonClick={(product) => this.editButtonHandler(product)}
              // deleteButtonClick={(id) => this.deleteButtonHandler(id)}
            />
          ) : (
            <Loading />
          )}
        </div>
      );
    } else {
      return <h2 className="h5 text-center">Items not found.</h2>;
    }
  };

  inputOnChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // inputFileOnChangeHandler = e => {
  //   this.setState({
  //     image: e.target.files[0]
  //   });
  // };

  addJob = (url, payload, header) => {
    axios
      .post(url, payload, header)
      .then(response => {
        console.log(response);
        var job = [...this.state.data];
        console.log(job);
        job.push(response.data.data.result);
        this.setState({
          data: job,

          name: '',
          description: '',
          location: '',
          category_id: '',
          company_id: '',
          salary: '',
          formStatus: 'Add'
        });
        this.getJobs(
          this.state.search,
          this.state.company,
          this.state.limit,
          this.state.page, // sebelumnya 1
          this.state.sortby,
          this.state.orderby
        );
        this.closeModalForm();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          buttonDisabled: false
        });
      });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    // this.setState({ buttonDisabled: true });

    // var url;
    const url = 'http://localhost:5200/api/v1/jobs';

    var payload = new FormData();

    payload.set('name', this.state.name);
    payload.set('description', this.state.description);
    payload.set('salary', this.state.salary);
    payload.set('location', this.state.location);
    // payload.append('image', this.state.image);
    payload.set('category_id', this.state.category_id);
    payload.set('company_id', this.state.company_id);

    const header = {
      headers: {
        Authorization: `Bearer ${ls.get('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    this.addJob(url, payload, header);

    // if (this.state.formStatus === 'Add') {
    //   url = 'http://localhost:5200/api/v1/jobs';
    //   this.addJob(url, payload, header);
    // } else {
    //   url = `http://localhost:5200/api/v1/jobs`;
    //   this.addJob(url, payload, header);
    // }
  };

  // getData = async () => {
  //   const url = await Axios.get('http://localhost:5200/api/v1/jobs');
  //   const getAllJobs = url.data.data.result;
  //   console.log(getAllJobs);
  //   return getAllJobs;
  // };

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  render() {
    return (
      <>
        <div className="main-content" ref="mainContent">
          <Row className="ml-7">
            {/* <div className="form-group col-md-4 bmd-form-group bmd-form-group-sm">
              <label for="search">Search Item Name</label>
              <input
                type="name"
                name="search"
                id="search"
                class="form-control form-control-sm"
                value={this.state.search}
                onChange={this.getSearch}
              />
            </div> */}

            <FormGroup>
              <Label for="search">Search</Label>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="search placeholder"
                className="form-control"
                value={this.state.search}
                onChange={this.getSearch}
              />
            </FormGroup>

            <FormGroup>
              <Label for="company">Search</Label>
              <input
                type="company"
                name="company"
                id="company"
                placeholder="search placeholder"
                className="form-control"
                value={this.state.company}
                onChange={this.getCompany}
              />
            </FormGroup>

            {/* <div className="form-group col-md-2">
              <label for="sort">Sort</label>
              <select
                name="sort"
                id="sort"
                className="form-control form-control-sm"
                onChange={this.getSort}
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
              </select>
            </div> */}

            <FormGroup>
              <Label for="exampleSelect">Limit per page</Label>
              <Input
                type="select"
                className="form-control"
                name="limit"
                id="limit"
                onChange={this.getLimit}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Sort By</Label>
              <Input
                type="select"
                className="form-control"
                name="sortby"
                id="sortby"
                onChange={this.getSort}
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
              </Input>
            </FormGroup>

            {/* <div className="form-group col-md-2">
              <label for="order">Order</label>
              <select
                name="order"
                id="order"
                className="form-control form-control-sm"
                onChange={this.getOrder}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div> */}

            <FormGroup>
              <Label for="exampleSelect">Order By</Label>
              <Input
                type="select"
                className="form-control"
                name="orderby"
                id="orderby"
                onChange={this.getOrder}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descendinng</option>
              </Input>
            </FormGroup>
          </Row>

          {this.ifEmptyJobs()}
          <ModalJob
            formStatus={this.state.formStatus}
            onSubmitHandler={this.onSubmitHandler}
            inputOnChangeHandler={this.inputOnChangeHandler}
            name={this.state.name}
            description={this.state.description}
            location={this.state.location}
            category_id={this.state.category_id}
            company_id={this.state.company_id}
            salary={this.state.salary}
          ></ModalJob>

          {/* {this.state.data.map(
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
                  logo={job.logo}
                ></JobItem>
              )
            )
          )} */}
        </div>
      </>
    );
  }
}

export default Job;
