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
import { Route, Switch, Redirect } from 'react-router-dom';
// reactstrap components
import { FormGroup, Label, Input, Row, Alert } from 'reactstrap';
// core components

import JobItem from './JobItem';
import Loading from '../components/Loading';
import ModalJob from '../components/ModalJob';
import ls from 'local-storage';

// import routes from 'routes.js';

class Job extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCategory: [],
      dataCompany: [],
      next: '',
      prev: '',
      totalPage: '',
      isLoading: true,
      jobIdSelected: null,

      //for query
      search: '',
      company: '',
      limit: 5,
      page: 1,
      sortby: 'j.updated_at',
      orderby: 'desc',

      //for add
      selectedId: [],
      name: '',
      description: '',
      salary: '',
      location: '',
      category_id: 1,
      company_id: 1,
      formStatus: 'Add',
      buttonDisabled: false,

      status: '',
      readMore: false,
      message: ''
    };
  }

  getJobs = (search, company, limit, page, sortby, orderby) => {
    let url = `http://localhost:5200/api/v1/jobs?name=${search}&company=${company}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`;
    Axios.get(url)
      .then(result => {
        const data = result.data.data.result;
        // console.log();
        this.setState({
          data: data,
          totalPage: result.data.data.infoPage.maxPage
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  dataCategory = () => {
    const url = 'http://localhost:5200/api/v1/categories';
    Axios.get(url)
      .then(result => {
        const dataCategory = result.data.data;
        console.log(result.data.data);
        this.setState({
          dataCategory: dataCategory
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  dataCompany = () => {
    let url = `http://localhost:5200/api/v1/companies`;
    Axios.get(url)
      .then(result => {
        console.log(result.data.data);
        const data = result.data.data;
        // console.log(data);
        this.setState({
          dataCompany: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this._isMounted = true;
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

    // this.inputOnChangeHandler = this.inputOnChangeHandler.bind(this);
    // this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentWillMount() {
    this.dataCategory();
    this.dataCompany();
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
      1,
      this.state.sortby,
      this.state.orderby
    );
  };

  getPage = page => {
    this.setState({
      page
    });
    this.getJobs(
      this.state.search,
      this.state.company,
      this.state.limit,
      page,
      this.state.sortby,
      this.state.orderby
    );
  };

  pagination = () => {
    var totalPage = this.state.totalPage;
    console.log(totalPage);
    var pageButton = [];
    for (let i = 1; i <= totalPage; i++) {
      pageButton.push(i);
      // console.log(pageButton.push(i));
    }
    // console.log(pageButton);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center pagination-sm">
          {pageButton.map(page => (
            <li
              key={page}
              className={`page-item${
                page === this.state.page ? ' active' : ''
              }`}
            >
              <a
                className="page-link"
                onClick={() => this.getPage(page)}
                style={{ cursor: 'pointer' }}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  ifEmptyJobs = () => {
    let data = [...this.state.data];
    // console.log(data);
    if (data && data !== undefined && data.length >= 1) {
      return (
        <div class="row">
          {data !== '' && data !== [] && data !== null && data !== 0 ? (
            <JobItem
              job={this.state.data}
              readMore={this.state.readMore}
              handleReadMoreClick={this.handleReadMoreClick}
              selected={this.state.selectedId}
              deleteButtonHandler={id => this.deleteButtonHandler(id)}
              editButtonHandler={job => this.editButtonHandler(job)}
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

  handleReadMoreClick = () => {
    this.setState({ readMore: !this.state.readMore });
  };

  inputOnChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addJob = (url, payload, header) => {
    axios
      .post(url, payload, header)
      .then(response => {
        // console.log(response);
        var job = [...this.state.data];
        console.log(job);
        job.push(response.data.data); //sebelumya data.data.result
        console.log(response.data.data);
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
          this.state.page,
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
    this.setState({ buttonDisabled: true });

    var url;
    // const url = 'http://localhost:5200/api/v1/jobs';

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

    // this.addJob(url, payload, header);

    if (this.state.formStatus === 'Add') {
      url = 'http://localhost:5200/api/v1/jobs';
      this.addJob(url, payload, header);
    } else {
      url = `http://localhost:5200/api/v1/jobs/${this.state.jobIdSelected}`;
      this.editJob(url, payload, header);
    }
  };

  // getData = async () => {
  //   const url = await Axios.get('http://localhost:5200/api/v1/jobs');
  //   const getAllJobs = url.data.data.result;
  //   console.log(getAllJobs);
  //   return getAllJobs;
  // };

  // componentDidUpdate(e) {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.mainContent.scrollTop = 0;
  // }

  addJobInvalid = () => {
    if (this.state.status === 200) {
      return (
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.state.message}
        </Alert>
      );
    } else {
      return (
        <>
          <Alert
            color="success"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            {this.state.message}
          </Alert>
          <Redirect to="/dashboard" />
        </>
      );
    }
  };

  editJob = (url, payload) => {
    Axios.patch(url, payload)
      .then(response => {
        let jobs = [...this.state.data];
        let index = jobs.findIndex(job => job.id === this.state.jobIdSelected);
        let res = response.data.data.result;
        // console.log(res.data.data.result);

        jobs[index].name = res.name;
        jobs[index].description = res.description;
        jobs[index].location = res.location;
        jobs[index].category_id = res.category_id;
        jobs[index].company_id = res.company_id;
        jobs[index].salary = res.salary;

        this.setState({
          data: jobs,
          name: '',
          description: '',
          salary: '',
          location: '',
          category_id: 1,
          company_id: 1,
          formStatus: 'Add'
        });

        this.getJobs(
          this.state.search,
          this.state.company,
          this.state.limit,
          this.state.page,
          this.state.sortby,
          this.state.orderby
        );
        this.closeModalForm();
      })
      .catch(err => {
        // console.log(err);
      });
  };

  editButtonHandler = job => [
    this.setState({
      name: job.job, //get from query
      description: job.description,
      location: job.location,
      category_id: job.category_id,
      company_id: job.company_id,
      salary: job.salary,
      formStatus: 'Edit',
      jobIdSelected: job.id
    })
  ];

  deleteButtonHandler = id => {
    if (window.confirm('Are you sure to delete this job?')) {
      var url = `http://localhost:5200/api/v1/jobs/${id}`;
      // const header = {
      //   headers: {
      //     Authorization: `Bearer ${ls.get('token')}`
      //   }
      // };
      axios
        .delete(url)
        .then(response => {
          var jobs = [...this.state.data];
          var index = jobs.findIndex(job => job.id === id);
          console.log(index);
          jobs.splice(index, 1);
          console.log(jobs);
          this.setState({ data: jobs });
          this.getJobs(
            this.state.search,
            this.state.company,
            this.state.limit,
            this.state.page,
            this.state.sortby,
            this.state.orderby
          );
        })
        .catch(error => {
          // console.log(error);
        });
    }
  };

  closeModalForm = () => {
    document.getElementById('closeModalForm').click();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <div className="main-content" ref="mainContent">
          <Row className="">
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

            <FormGroup className="mx-auto">
              <Label for="search"></Label>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="search Job"
                className="form-control"
                value={this.state.search}
                onChange={this.getSearch}
              />
            </FormGroup>

            <FormGroup className="mx-auto">
              <Label for="company"></Label>
              <input
                type="company"
                name="company"
                id="company"
                placeholder="search company"
                className="form-control"
                value={this.state.company}
                onChange={this.getCompany}
              />
            </FormGroup>

            <FormGroup className="mx-auto">
              <Label for="exampleSelect"></Label>
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

            <FormGroup className="mx-auto">
              <Label for="exampleSelect"></Label>
              <Input
                type="select"
                className="form-control"
                name="sortby"
                id="sortby"
                onChange={this.getSort}
              >
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="updated_at">updated_at</option>
              </Input>
            </FormGroup>

            <FormGroup className="mx-auto">
              <Label for="exampleSelect"></Label>
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
          {this.pagination()}

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
            job={this.state.data}
            addJobInvalid={this.addJobInvalid}
            dataCategory={this.state.dataCategory}
            dataCompany={this.state.dataCompany}
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
