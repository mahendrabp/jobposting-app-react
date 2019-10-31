import React from 'react';

import { Button, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import './styles.css';
const JobItem = props =>
  props.job.map(job => {
    var menuSelectedClass = '';
    var buttonCart = 'Add to Cart';
    if (props.selected.includes(job.id)) {
    }
    return (
      <div
        className="col-sm-10 col-md-10 d-flex ml-7 mb-5"
        key={job.id.toString()}
      >
        <div className={`flex-fill card menu${menuSelectedClass}`} id={job.id}>
          <Card className="card-profile shadow card-list">
            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <Row className="justify-content-center">
                <Col md="6" className="order-lg-6" lg="8" pt="10px">
                  <h3>{job.job}</h3>
                  <i className="ni business_briefcase-24 mr-2" />
                  {job.company} - {job.location}
                  <div className="h5 mt-3"></div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {job.category}
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
                    {props.readMore ? 'Show less' : 'Continue reading.....'}
                  </b>
                </p>
              </div>
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
              <Button
                className="float-right ml-2"
                color="danger"
                onClick={() => props.deleteButtonHandler(job.id)}
                size="sm"
              >
                Delete
              </Button>
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
    );
  });

export default JobItem;
