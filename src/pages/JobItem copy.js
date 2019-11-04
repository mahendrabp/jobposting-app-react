import React from 'react';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Link,
  NavLink
} from 'reactstrap';
import './styles.css';
import ls from 'local-storage';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';
import { Container } from '@material-ui/core';

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
            Delete
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
      <Container>
        <Row>
          <Col md="2">
            <>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="customCheck1"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Unchecked
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  defaultChecked
                  id="customCheck2"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheck2">
                  Checked
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  disabled
                  id="customCheck3"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheck3">
                  Disabled Unchecked
                </label>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  defaultChecked
                  disabled
                  id="customCheck4"
                  type="checkbox"
                />
                <label className="custom-control-label" htmlFor="customCheck4">
                  Disabled Checked
                </label>
              </div>
            </>
          </Col>
          <Col md="10">
            <div key={job.id.toString()}>
              <div
                className={`flex-fill card menu${menuSelectedClass}`}
                id={job.id}
              >
                <Card className="card-profile shadow card-list">
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <Row className="justify-content-center">
                      <Col md="6" className="order-lg-6" lg="8" pt="10px">
                        {/* <h3>{job.job}</h3> */}
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
                        <i className="ni business_briefcase-24 mr-2" />
                        {job.company} - {job.location}
                        <div className="h5 mt-3"></div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          {job.category}
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          {/* {job.updated_at} */}

                          {/* <Moment locale="id">{job.updated_at}</Moment> */}
                          <p>
                            updated at :{' '}
                            {moment(job.updated_at).format(
                              'MMMM Do YYYY, h:mm a'
                            )}
                          </p>
                        </div>
                      </Col>
                      <Col>
                        <div className="card-profile-image mt-2">
                          <a onClick={e => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              // src={require('http://localhost:5200/public/logo' +
                              //   job.log)}

                              src={`http://localhost:5200/public/logo/${job.logo}`}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <div className="text-left">
                      <hr className="my-4" />
                      <p className={props.readMore ? 'read-more' : 'read-less'}>
                        {job.description}
                      </p>
                      <p
                        onClick={() => {
                          props.handleReadMoreClick(job.id.toString());
                        }}
                      >
                        <b>
                          {' '}
                          {props.readMore
                            ? 'Show less'
                            : 'Continue reading.....'}
                        </b>
                      </p>
                    </div>
                    {}
                    {deletebutton}
                    {/* <Button
              className="float-right ml-2"
              color="info"
              href="#pablo"
              onClick={e => e.preventDefault()}
              size="sm"
            >
              Lamar
            </Button>
            <Button
              className="float-right"
              color="default"
              href="#pablo"
              onClick={e => e.preventDefault()}
              size="sm"
            >
              Email
            </Button> */}
                  </CardBody>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  });

export default JobItem;
