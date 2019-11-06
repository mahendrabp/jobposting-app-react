import React from 'react';
import Axios from 'axios';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getJobRedux } from '../redux/action/job';
// reactstrap components
import {
  FormGroup,
  Input,
  Row,
  Alert,
  Col,
  Container,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  UncontrolledTooltip,
  Card,
  CardBody,
  CardText
} from 'reactstrap';
// core components

import JobItem from './JobItem';
import Loading from '../components/Loading';
import ModalJob from '../components/ModalJob';
import ModalJobDetail from '../components/ModalJobDetail';
import ls from 'local-storage';

// import routes from 'routes.js';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCategory: [],
      dataCompany: [],
      next: '',
      prev: '',
      totalPage: '',
      infoPage: {},
      isLoading: true,
      jobIdSelected: null,

      //for query
      // search: '',
      // location: '',
      // limit: 5,
      // page: 1,
      // sortby: 'j.updated_at',
      // orderby: 'desc',

      //for add
      selectedId: [],
      name: '',
      description: '',
      salary: '',
      location: '',
      logo: '',

      category_id: 1,
      company_id: 1,
      formStatus: 'Add',
      buttonDisabled: false,
      category: '',
      company: '',
      status: '',
      readMore: false,
      isError: true,
      message: '',
      isVisible: 'false',
      locationArray: ['Jakarta', 'Bandung', 'Solo']
    };
  }

  async componentDidMount() {
    // this.getJobs().then(data => {
    //   // console.log(data);
    //   this.setState({
    //     data
    //   });
    // });

    this
      .getJobs
      // this.state.search,
      // this.state.location,
      // this.state.limit,
      // this.state.page,
      // this.state.sortby,
      // this.state.orderby
      ();

    this.getData = () => {
      this.props.dispatch(getJobRedux());
    };
  }

  // async getJobs(
  //   search = '',
  //   location = '',
  //   limit = 5,
  //   page = 1,
  //   sortby = 'j.updated_at',
  //   orderby = 'desc'
  // ) {
  //   await this.props.dispatch(
  //     getJobRedux(search, location, limit, page, sortby, orderby)
  //   );
  //   this.setState({
  //     search: search,
  //     location: location,
  //     limit: location,
  //     page: page,
  //     sortby: sortby,
  //     orderby: orderby
  //   });
  // }
  // getJobs = (search, location, limit, page, sortby, orderby) => {
  //   let url = `http://localhost:5200/api/v1/jobs?name=${search}&location=${location}&limit=${limit}&page=${page}&sortby=${sortby}&orderby=${orderby}`;
  //   Axios.get(url)
  //     .then(result => {
  //       const data = result.data.data.result;
  //       console.log(result.data.status);

  //       this.setState({
  //         data: data,
  //         totalPage: result.data.data.infoPage.maxPage,
  //         infoPage: result.data.data.infoPage
  //       });
  //     })
  //     .catch(err => {
  //       // console.log(err.response.data.status);
  //       this.setState({
  //         // errMessage: 'err.response.data.message.message',
  //         // errStatus: err.response.data.status,
  //         data: []
  //       });
  //     });
  // };

  getJobs = async (
    search = '',
    location = '',
    limit = 5,
    page = 1,
    sortby = 'j.updated_at',
    orderby = 'desc'
  ) => {
    // const result = await this.props.dispatch(
    //   getJobRedux(search, location, limit, page, sortby, orderby)
    // );
    // const dataResult = result.value.result.data.data;
    // // console.log(result.value.result.data.data.infoPage);
    // this.setState({
    //   data: dataResult.result,
    //   totalPage: dataResult.infoPage.maxPage,
    //   infoPage: dataResult.infoPage
    // });

    try {
      const result = await this.props.dispatch(
        getJobRedux(search, location, limit, page, sortby, orderby)
      );

      const dataResult = result.value.result.data.data;

      this.setState({
        data: dataResult.result,
        totalPage: dataResult.infoPage.maxPage,
        infoPage: dataResult.infoPage
      });
    } catch (err) {
      console.log(err);
      this.setState({
        data: []
      }); // TypeError: failed to fetch
    }
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
      this.state.location,
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
      this.state.location,
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
        this.state.location,
        this.state.limit,
        this.state.page,
        this.state.sortby,
        this.state.orderby
      );
    } else {
      this.getJobs(
        '',
        this.state.location,
        this.state.limit,
        this.state.page,
        this.state.sortby,
        this.state.orderby
      );
    }
  };

  getLocation = e => {
    e.preventDefault();
    let location = e.target.value;
    this.setState({
      location
    });
    if (location.length >= 3) {
      this.setState({
        page: 1
      });
      this.getJobs(
        this.state.search,
        location,
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
      this.state.location,
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
      this.state.location,
      this.state.limit,
      page,
      this.state.sortby,
      this.state.orderby
    );
  };

  pagination = () => {
    var totalPage = this.state.totalPage;
    console.log(totalPage);
    console.log(this.state.data.length);
    var pageButton = [];

    if (this.state.data.length !== 0) {
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
    } else {
      return <div></div>;
    }
  };

  ifEmptyJobs = () => {
    let data = [...this.state.data];
    const err = this.state.errStatus;
    console.log();
    if (data && data !== undefined && data.length >= 1 && data !== []) {
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
              showButtonHandler={job => this.showButtonHandler(job)}
            />
          ) : (
            <Loading />
          )}
        </div>
      );
    } else if (err === 404) {
      return <h2 className="h5 text-center">Pekerjaan tidak ditemukan.</h2>;
    } else {
      return <h2 className="h5 text-center">Pekerjaan tidak ditemukan.</h2>;
    }
  };

  alertJobFound = () => {
    let data = [...this.state.data];
    if (data.length !== 0) {
      return (
        <Alert color="primary">
          {this.state.infoPage.totalAllJob} Pekerjaan ditemukan !!!
        </Alert>
      );
    } else {
      return <Alert color="danger">Pekerjaan tidak ditemukan !!!</Alert>;
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

  closeModalForm = () => {
    document.getElementById('closeModalForm').click();
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ buttonDisabled: true });

    var url;

    var payload = new FormData();
    payload.set('name', this.state.name);
    payload.set('description', this.state.description);
    payload.set('salary', this.state.salary);
    payload.set('location', this.state.location);
    // payload.append('image', this.state.image);
    payload.set('category_id', this.state.category_id);
    payload.set('company_id', this.state.company_id);

    // const header = {
    //   headers: {
    //     Authorization: `Bearer ${ls.get('token')}`,
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };

    // this.addJob(url, payload, header);

    if (this.state.formStatus === 'Add') {
      url = 'http://localhost:5200/api/v1/jobs';
      this.addJob(url, payload);
    } else {
      url = `http://localhost:5200/api/v1/jobs/${this.state.jobIdSelected}`;
      this.editJob(url, payload);
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
  onShowAlert = () => {
    this.setState({ isVisible: true }, () => {
      window.setTimeout(() => {
        this.setState({ isVisible: false });
      }, 3000);
    });
  };

  jobAlert = () => {
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

  addJob = (url, payload) => {
    axios
      .post(url, payload)
      .then(response => {
        console.log(response.data.error);
        console.log(response.data.message);
        var job = [...this.state.data];
        var isError = response.data.error;
        var message = response.data.message;
        console.log(job);
        job.push(response.data.data); //sebelumya data.data.result
        // console.log(response.data.data);
        this.setState({
          data: job,
          name: '',
          description: '',
          location: '',
          category_id: '',
          company_id: '',
          salary: '',
          formStatus: 'Add',
          isError: isError,
          message: message,
          isVisible: true
        });
        this.getJobs(
          this.state.search,
          this.state.location,
          this.state.limit,
          this.state.page,
          this.state.sortby,
          this.state.orderby
        );
        this.closeModalForm();
        this.onShowAlert();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // addJobInvalid = () => {
  //   if (this.state.status === 200) {
  //     return (
  //       <Alert
  //         color="danger"
  //         isOpen={this.state.visible}
  //         toggle={this.onDismiss}
  //       >
  //         {this.state.message}
  //       </Alert>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Alert
  //           color="success"
  //           isOpen={this.state.visible}
  //           toggle={this.onDismiss}
  //         >
  //           {this.state.message}
  //         </Alert>
  //         <Redirect to="/dashboard" />
  //       </>
  //     );
  //   }
  // };

  addJobClick = () => {
    this.setState({
      name: '',
      description: '',
      salary: '',
      location: '',
      category_id: 1,
      company_id: 1,
      formStatus: 'Add'
    });
  };

  editJob = (url, payload) => {
    Axios.patch(url, payload)
      .then(response => {
        let jobs = [...this.state.data];
        // let index = jobs.findIndex(job => job.id === this.state.jobIdSelected);
        // let res = response.data.data.result;
        jobs.findIndex(job => job.id === this.state.jobIdSelected);
        let res = response.data.data.result;
        console.log(response);

        // jobs[index].name = res.nameoke;
        // jobs[index].description = res.description;
        // jobs[index].location = res.location;
        // jobs[index].category_id = res.category_id;
        // jobs[index].company_id = res.company_id;
        // jobs[index].salary = res.salary;

        this.setState({
          data: jobs,
          name: '',
          description: '',
          salary: '',
          location: '',
          category_id: 1,
          company_id: 1,
          formStatus: 'Add',
          isError: response.data.error,
          message: response.data.message
        });

        this.getJobs(
          this.state.search,
          this.state.location,
          this.state.limit,
          this.state.page,
          this.state.sortby,
          this.state.orderby
        );
        this.closeModalForm();
        this.onShowAlert();
      })
      .catch(err => {
        this.setState({
          buttonDisabled: false
        });
      });
  };

  editButtonHandler = job => {
    this.setState({
      name: job.job, //get from query //from table is name
      description: job.description,
      location: job.location,
      category_id: job.category_id,
      company_id: job.company_id,
      salary: job.salary,

      formStatus: 'Edit',
      jobIdSelected: job.id
    });
  };

  showButtonHandler = job => [
    this.setState({
      name: job.job, //get from query //from table is name
      description: job.description,
      location: job.location,
      category_id: job.category_id,
      company_id: job.company_id,
      category: job.category,
      company: job.company,
      salary: job.salary,
      logo: job.logo,
      updated_at: job.updated_at,
      formStatus: 'Add',
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
          // console.log(jobs);
          console.log(response);
          // console.log(index);
          jobs.splice(index, 1);
          console.log(jobs);
          this.setState({
            data: jobs,
            isError: response.data.error,
            message: response.data.message
          });
          this.getJobs(
            this.state.search,
            this.state.location,
            this.state.limit,
            this.state.page,
            this.state.sortby,
            this.state.orderby
          );
          this.onShowAlert();
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };

  cancelButtonHandler = e => {
    e.preventDefault();
    this.setState({
      selectedId: [],
      name: '',
      description: '',
      salary: '',
      location: '',
      category_id: 1,
      company_id: 1,
      formStatus: 'Add',
      buttonDisabled: false
    });
  };

  addJobBtn = () => {
    if (ls.get('token') && ls.get('token') !== undefined) {
      return (
        <Button
          data-toggle="modal"
          data-target="#modalFormJob"
          style={{ cursor: 'pointer' }}
          tag={Link}
          onClick={() => this.addJobClick()}
        >
          <i className="ni ni-spaceship" />
          <span>Tambah Pekerjaan</span>
        </Button>
      );
    }
  };

  render() {
    return (
      <>
        <div className="main-content" ref="mainContent">
          <Container>
            {this.jobAlert()}
            <Row className="mb-4"></Row>
            <Form size="lg">
              <Row>
                <Col md="5">
                  <FormGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Cari Pekerjaan"
                        className="form-control"
                        value={this.state.search}
                        onChange={this.getSearch}
                        data-placement="top"
                        id="tooltip611234743"
                      />
                    </InputGroup>
                  </FormGroup>
                  <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip611234743"
                  >
                    Cari Pekerjaan
                  </UncontrolledTooltip>
                </Col>

                <Col md="4">
                  <FormGroup>
                    <InputGroup className="mb-4">
                      <input
                        type="location"
                        name="location"
                        id="location"
                        placeholder="Cari Kota"
                        className="form-control"
                        value={this.state.location}
                        onChange={this.getLocation}
                        data-placement="top"
                        id="tooltip611234744"
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="ni ni-building" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip611234744"
                  >
                    Cari Kota
                  </UncontrolledTooltip>
                </Col>

                <Col md="1">
                  <FormGroup>
                    <InputGroup className="mb-4">
                      <Input
                        type="select"
                        className="form-control"
                        name="limit"
                        id="limit"
                        onChange={this.getLimit}
                        data-placement="top"
                        id="tooltip611234745"
                      >
                        <option value="" disabled>
                          Tampilan banyak kerja per halaman
                        </option>

                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip611234745"
                  >
                    Tampilan banyak kerja per halaman
                  </UncontrolledTooltip>
                </Col>
                <Col md="1">
                  <FormGroup>
                    <InputGroup className="mb-4">
                      {/* <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-zoom-split-in" />
                        </InputGroupText>
                      </InputGroupAddon> */}
                      <Input
                        type="select"
                        className="form-control"
                        name="sortby"
                        id="sortby"
                        onChange={this.getSort}
                        data-placement="top"
                        id="tooltip611234746"
                      >
                        <option value="" disabled>
                          Sortir berdasarkan
                        </option>
                        {/* <option value="updated_at">Sort By : </option> */}

                        <option value="name">Pekerjaan</option>
                        <option value="category">Kategori</option>
                        <option value="updated_at">Terbaru</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip611234746"
                  >
                    Sortir berdasarkan nama, kategory, atau kerja update terbaru
                  </UncontrolledTooltip>
                </Col>
                <Col md="1">
                  <FormGroup>
                    <InputGroup className="mb-4">
                      {/* <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-bold-down" />
                        </InputGroupText>
                      </InputGroupAddon> */}
                      <Input
                        type="select"
                        className="form-control"
                        name="orderby"
                        id="orderby"
                        onChange={this.getOrder}
                        data-placement="top"
                        id="tooltip611234747"
                      >
                        <option value="asc" disabled>
                          Urutkan berdasarkan :{' '}
                        </option>
                        <option value="asc">A to Z</option>
                        <option value="desc">Z to A</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip611234747"
                  >
                    Urutkan dari kecil ke besar dan sebaliknya
                  </UncontrolledTooltip>
                </Col>
              </Row>
            </Form>
          </Container>

          <Container>
            <Col>{this.alertJobFound()}</Col>
          </Container>

          <Container>
            <Row className="mt-2">
              <Col md="3">
                <>
                  <div className="mb-4 d-flex align-items-center ml-5">
                    {this.addJobBtn()}
                  </div>
                  <Card style={{ width: '250px' }}>
                    <CardBody>
                      <CardText>
                        <span>Pilih Lokasi</span>
                        <br></br>
                        <span>-tahap pengembangan-</span>
                      </CardText>
                      {this.state.locationArray.map((v, i) => (
                        <div className="custom-control custom-checkbox mb-3">
                          <input
                            className="custom-control-input"
                            id="check"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="check"
                            key={v}
                          >
                            {' '}
                            {v}
                          </label>
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                </>
              </Col>
              <Col md="9">{this.ifEmptyJobs()}</Col>
            </Row>
          </Container>
          <Container className="mt-2">{this.pagination()}</Container>

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
            // addJobInvalid={this.addJobInvalid}
            dataCategory={this.state.dataCategory}
            dataCompany={this.state.dataCompany}
            cancelButtonHandler={this.cancelButtonHandler}
            closeModalForm={this.closeModalForm}
          ></ModalJob>
          <ModalJobDetail
            formStatus={this.state.formStatus}
            onSubmitHandler={this.onSubmitHandler}
            inputOnChangeHandler={this.inputOnChangeHandler}
            name={this.state.name}
            description={this.state.description}
            location={this.state.location}
            category={this.state.category}
            company={this.state.company}
            salary={this.state.salary}
            updated_at={this.state.updated_at}
            logo={this.state.logo}
            job={this.state.data}
            // addJobInvalid={this.addJobInvalid}

            dataCategory={this.state.dataCategory}
            dataCompany={this.state.dataCompany}
            cancelButtonHandler={this.cancelButtonHandler}
          ></ModalJobDetail>
        </div>
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
    data: state.job
  };
};
export default connect(mapStateToProps)(Job);
