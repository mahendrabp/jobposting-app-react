import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Button,
  Row,
  Col,
  Container
} from 'reactstrap';
import Job from '../pages/Job';
// import { Container } from '@material-ui/core';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/id';

const ModalJobDetail = props => (
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
          <Jumbotron>
            <Container>
              <Row>
                <Col md="10">
                  <Row>
                    <div>
                      <h1>{props.name}</h1>
                    </div>
                  </Row>
                  <Row>
                    <p className="lead ml-2 mr-2 mt--1">
                      <i className="ni ni-building"></i> {props.company}
                    </p>{' '}
                    <p className="mt--1">|</p>
                    <p className="lead ml-2 mr-2 mt--1">
                      <i className="ni ni-pin-3"></i> {props.location}
                    </p>
                  </Row>
                  <Row>
                    <p className="ml-2 mr-2 mt--2">
                      <i className="ni ni-align-center"></i>{' '}
                      <span>{props.category.toUpperCase()}</span>
                    </p>{' '}
                    <p className="mt--2">|</p>
                    <p className="ml-2 mr-2 mt--2">
                      <i className="ni ni-calendar-grid-58"></i>{' '}
                      <span>
                        {moment(props.updated_at).fromNow(true)} yang lalu
                      </span>
                    </p>
                  </Row>
                  <Row>
                    <Col>Simpan</Col>
                    <Col>Bagikan</Col>
                    <Col>Laporkan</Col>
                  </Row>
                </Col>
                <Col md="2">
                  <div className="card-profile-image mt-2">
                    <a>
                      <img
                        style={squareLogo}
                        alt="..."
                        // src={require('http://localhost:5200/public/logo' +
                        //   job.log)}

                        src={`http://localhost:5200/public/logo/${props.logo}`}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </Jumbotron>

          <hr></hr>
          <Container>
            <Row>
              <Col>{props.description}</Col>
            </Row>
          </Container>
        </div>
        <div class="modal-footer">
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

const fullScreeModal = {
  width: '100%',
  height: '100%',
  margin: '0',
  top: '0',
  left: '0'
};

const squareLogo = {
  position: 'relative',
  overflow: 'hidden',
  position: 'absolute'
};

export default ModalJobDetail;
