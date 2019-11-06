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

const JobItem = props =>
  props.job.map(job => {
    console.log(job.id);
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
    // if (props.selected.includes(job.id)) {
    // }
    return (
      <div key={job.id.toString()} className="mt-2">
        <div className={`flex-fill card menu${menuSelectedClass}`} id={job.id}>
          <Card
            className="shadow card-list"
            style={{ backgroundColor: '#fff' }}
          >
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <Row className="justify-content-center">
                <Col md="4">
                  <div className="card-profile-image mt-4">
                    <a href="" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        // src={require('http://localhost:5200/public/logo' +
                        //   job.log)}

                        src={`http://localhost:5200/public/logo/${job.logo}`}
                      />
                    </a>
                  </div>
                </Col>
                <Col md="8" className="order-lg-6 " lg="8" pt="10px">
                  {/* <h3>{job.job}</h3> */}
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
                  <div className="d-flex align-items-start">
                    <i className="ni business_briefcase-24 mr-2" />
                    {job.company} - {job.location}
                  </div>

                  <div className="d-flex align-items-start">
                    <i className="ni education_hat mr-2" />
                    {job.category}
                  </div>
                  <div className="d-flex align-items-start">
                    <i className="ni education_hat mr-2" />
                    {/* {job.updated_at} */}

                    {/* <Moment locale="id">{job.updated_at}</Moment> */}
                    <p>
                      terakhir update :{' '}
                      {/* {moment(job.updated_at).format('MMMM Do YYYY, h:mm a')} */}
                      {moment(job.updated_at).fromNow(true)} yang lalu
                    </p>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="mt--5">
              <div className="text-left">
                <hr className="my-4" />
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

// const logoStyle = {
//   position: 'relative',
//   overflow: 'hidden',
//   position: 'absolute',
//   width: '200px',
//   height: '200px'
// };

export default JobItem;
