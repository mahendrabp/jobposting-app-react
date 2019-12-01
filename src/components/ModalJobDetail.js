import React, { Fragment } from 'react';
// import Job from '../pages/Job';
// import { Container } from '@material-ui/core';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';
import rupiah from 'rupiah-format';
import ls from 'local-storage';
import { Link } from 'react-router-dom';

const ModalJobDetail = props => {
  let showSalary;
  if (ls.get('token') && ls.get('token') !== undefined) {
    showSalary = (
      <p className="lead ml-2 mr-2 mt-0">
        <i className="ni ni-money-coins"></i> {rupiah.convert(props.salary)}
      </p>
    );
  } else {
    showSalary = (
      <Link className="nav-link-icon" to="/login" tag={Link}>
        <span className="nav-link-inner--text">Login untuk melihat gaji</span>
      </Link>
    );
  }
  return (
    <div
      class="modal fade"
      id="modalFormJobDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalFormJobDetailLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog mw-100 w-75" role="document">
        <div className="modal-content">
          <div className="modal-header mb--3">
            <button
              type="button"
              id="closeModalForm"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Fragment>
              <div
                className="jumbotron jumbotron-fluid"
                style={{
                  marginTop: '-25px',
                  minHeight: '350px',
                  backgroundImage:
                    'url("https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-013.jpg")'
                }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-8">
                      <h1
                        className="display-4"
                        style={{
                          fontSize: '35px',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        {props.name}
                      </h1>
                      <p
                        style={{
                          fontSize: '25px',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        <i className="fas fa-building" /> {props.company}
                      </p>
                      <p style={{ color: 'white' }}>
                        <i className="fas fa-map-marker-alt" /> {props.location}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <i className="fas fa-briefcase" /> {props.category}
                        {/* &nbsp;&nbsp;|&nbsp;&nbsp; */}
                        {/* <i className="fas fa-money-bill-wave" />{' '}
                  {localStorage.getItem('Authorization')
                    ? v.salary
                    : 'Login to see salary'} */}
                      </p>
                      <p style={{ color: 'white' }}>{showSalary}</p>
                    </div>
                    <div className="col-12 col-lg-4">
                      <img
                        src={`http://localhost:5200/public/logo/${props.logo}`}
                        width="300px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container" style={{ marginTop: '0px' }}>
                <div className="row">
                  <div className="col-12 col-lg-8 text-justify">
                    <div className="card shadow border-0">
                      <div className="card-body p-5">
                        <p
                          style={{
                            // lineHeight: '1.8',
                            // fontSize: '16px',
                            // letterSpacing: '1.8px'
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            position: 'relative'
                          }}
                        >
                          {props.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="card shadow border-0">
                      <div className="card-body p-5">
                        <h4 className="text-center">Tentang {props.company}</h4>
                        <hr />
                        <p className="" style={{}}>
                          <Fragment>{props.companyDesc}</Fragment>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-info btn-raised"
              data-dismiss="modal"
              onClick={props.cancelButtonHandler}
            >
              Apply
            </button>
            <button
              type="button"
              class="btn btn-danger btn-raised"
              data-dismiss="modal"
              onClick={props.cancelButtonHandler}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const fullScreeModal = {
//   width: '100%',
//   height: '100%',
//   margin: '0',
//   top: '0',
//   left: '0'
// };

const squareLogo = {
  overflow: 'hidden',
  position: 'absolute'
};

const jumbotron = {
  backgroundImage:
    'url(https://www.pngix.com/pngfile/big/11-115194_bright-background-vector-png-background-design-vector-png.png)',
  backgroundSize: 'cover'
};

export default ModalJobDetail;
