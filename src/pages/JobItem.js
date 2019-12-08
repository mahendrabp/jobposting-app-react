import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  NavLink
} from 'reactstrap';
import './styles.css';
import ls from 'local-storage';
// import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';
import rupiah from 'rupiah-format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const JobItem = props =>
  props.job.job.map(job => {
    // console.log(job.id);
    var menuSelectedClass = '';
    let deletebutton;
    if (ls.get('token') && ls.get('token') !== undefined) {
      deletebutton = (
        <div>
          <Button
            className="float-right ml-2"
            color="danger"
            onClick={() => props.deleteButtonHandler(job.id)}
            size="sm"
          >
            Hapus
          </Button>
          <Button
            className="float-right ml-2"
            color="primary"
            onClick={() => props.editButtonHandler(job)}
            size="sm"
            data-toggle="modal"
            data-target="#modalFormJob"
          >
            Edit
          </Button>
        </div>
      );
    } else {
      deletebutton = '';
    }

    let showSalary;
    if (ls.get('token') && ls.get('token') !== undefined) {
      showSalary = (
        <div>
          <i className="ni ni-money-coins"></i> {rupiah.convert(job.salary)}
        </div>
      );
    } else {
      showSalary = (
        <Link className="nav-link-icon mt-5" to="/login" tag={Link}>
          <span className="nav-link-inner--text mt-4">
            Login untuk melihat gaji
          </span>
        </Link>
      );
    }

    return (
      <div key={job.id.toString()} className="d-flex mb-2">
        <div className={`flex-fill card menu${menuSelectedClass}`} id={job.id}>
          <Card
            className="shadow card-list"
            style={{ backgroundColor: '#fff' }}
          >
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <Row className="justify-content-center">
                <Col md="4" xs="12" sm="12">
                  <div>
                    <a href="/#" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        // src={require('https://crownhire.site/public/logo' +
                        //   job.log)}
                        style={thumbImg}
                        src={`https://crownhire.site/public/logo/${job.logo}`}
                      />
                    </a>
                  </div>
                </Col>
                <Col
                  md="8"
                  className="order-lg-6 "
                  lg="8"
                  pt="10px"
                  xs="12"
                  sm="12"
                >
                  <Row>
                    <div className="d-flex align-items-start">
                      <NavLink
                        data-toggle="modal"
                        data-target="#modalFormJobDetail"
                        style={{ cursor: 'pointer' }}
                        onClick={() => props.showButtonHandler(job)}
                      >
                        <h3>
                          <span>{job.job}</span>
                        </h3>
                      </NavLink>
                    </div>
                  </Row>
                  <Row>
                    <div className="d-flex align-items-start mb-2">
                      <small>
                        <i className="ni ni-align-center mt-1"></i> {''}
                        {job.category}
                      </small>
                    </div>
                  </Row>
                  <Row>
                    <div className="d-flex align-items-start mr-2 mb-2">
                      <small>
                        <i className="ni ni-building mt-1"></i> {job.company}
                      </small>
                    </div>{' '}
                    <div>|</div>
                    <div className="d-flex align-items-start mr-2 mb-2">
                      <small>
                        <i className="ni ni-pin-3 mt-1"></i> {job.location}
                      </small>
                    </div>{' '}
                    <div>|</div>{' '}
                    <div className="d-flex align-items-start mt-1 mb-2">
                      <small>{showSalary}</small>
                    </div>
                  </Row>

                  <Row>
                    <div className="d-flex align-items-start">
                      <small>
                        <i className="ni ni-calendar-grid-58"></i>{' '}
                        {moment(job.updated_at).fromNow(true)} yang lalu
                      </small>
                    </div>
                  </Row>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="mt--5">
              <div className="text-left">
                <hr />
                <p>{job.description.substring(0, 205)} ....</p>
              </div>
              {}
              {deletebutton}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  });

const thumbImg = {
  objectFit: 'cover',
  overflow: 'hidden',
  maxHeight: '150px',
  maxWidth: '150px'
};

// class JobItem extends React.Component {
//   render() {
//     this.props.job.job.map(job => {
//       let menuSelectedClass = '';
//       let deletebutton;
//       if (ls.get('token') && ls.get('token') !== undefined) {
//         deletebutton = (
//           <div>
//             <Button
//               className="float-right ml-2"
//               color="danger"
//               onClick={() => props.deleteButtonHandler(job.id)}
//               size="sm"
//             >
//               Hapus
//             </Button>
//             <Button
//               className="float-right ml-2"
//               color="primary"
//               onClick={() => props.editButtonHandler(job)}
//               size="sm"
//               data-toggle="modal"
//               data-target="#modalFormJob"
//             >
//               Edit
//             </Button>
//           </div>
//         );
//       } else {
//         deletebutton = '';
//       }

//       let showSalary;
//       if (ls.get('token') && ls.get('token') !== undefined) {
//         showSalary = (
//           <p>
//             <i className="ni ni-money-coins"></i> {rupiah.convert(job.salary)}
//           </p>
//         );
//       } else {
//         showSalary = (
//           <Link className="nav-link-icon" to="/login" tag={Link}>
//             <span className="nav-link-inner--text">
//               Login untuk melihat gaji
//             </span>
//           </Link>
//         );
//       }
//     });

//     return (
//       <>
//         {this.props.job.job.map((job, index) => (
//           <div key={job.id.toString()} className="mt-2">
//             <div
//               className={`flex-fill card menu${this.menuSelectedClass}`}
//               id={job.id}
//             >
//               <Card
//                 className="shadow card-list"
//                 style={{ backgroundColor: '#fff' }}
//               >
//                 <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
//                   <Row className="justify-content-center">
//                     <Col md="4" xs="12" sm="12">
//                       <div className="card-profile-image mt-4">
//                         <a href="" onClick={e => e.preventDefault()}>
//                           <img
//                             alt="..."
//                             // src={require('https://crownhire.site/public/logo' +
//                             //   job.log)}

//                             src={`https://crownhire.site/public/logo/${job.logo}`}
//                           />
//                         </a>
//                       </div>
//                     </Col>
//                     <Col
//                       md="8"
//                       className="order-lg-6 "
//                       lg="8"
//                       pt="10px"
//                       xs="12"
//                       sm="12"
//                     >
//                       <Row>
//                         <div className="d-flex align-items-start">
//                           <NavLink
//                             data-toggle="modal"
//                             data-target="#modalFormJobDetail"
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => this.props.showButtonHandler(job)}
//                           >
//                             <h3>
//                               <span>{job.job}</span>
//                             </h3>
//                           </NavLink>
//                         </div>
//                       </Row>
//                       <Row>
//                         <div className="d-flex align-items-start mb-2">
//                           <i className="ni ni-align-center"></i> {job.category}
//                         </div>
//                       </Row>
//                       <Row>
//                         <div className="d-flex align-items-start mr-2 mb-2">
//                           <i className="ni ni-building"></i> {job.company}
//                         </div>{' '}
//                         <div className="d-flex align-items-start mr-2 mb-2">
//                           <i className="ni ni-pin-3"></i> {job.location}
//                         </div>
//                         <div className="d-flex align-items-start">
//                           {showSalary}
//                         </div>
//                       </Row>

//                       <Row>
//                         <div className="d-flex align-items-start">
//                           <i className="ni education_hat mr-2" />

//                           <p>
//                             terakhir update :{' '}
//                             {moment(job.updated_at).fromNow(true)} yang lalu
//                           </p>
//                         </div>
//                       </Row>
//                     </Col>
//                   </Row>
//                 </CardHeader>
//                 <CardBody className="mt--5">
//                   <div className="text-left">
//                     <hr className="my-4" />
//                     <p>{job.description.substring(0, 205)} ....</p>
//                   </div>
//                   {}
//                   {deletebutton}
//                 </CardBody>
//               </Card>
//             </div>
//           </div>
//         ))}
//       </>
//     );
//   }
// }

// const logoStyle = {
//   position: 'relative',
//   overflow: 'hidden',
//   position: 'absolute',
//   width: '200px',
//   height: '200px'
// };

const mapStateToProps = state => ({
  job: state.job
});
export default connect(mapStateToProps)(JobItem);
