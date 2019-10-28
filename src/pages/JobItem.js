import React from 'react';
import Axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import './JobItem.styles.scss';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';

class JobItem extends React.Component {
  render() {
    return (
      <>
        <Container className="mt-5" fluid>
          <Col className="mx-auto order-xl-2 mb-5 mb-xl-0" xl="9">
            <Card className="card-profile shadow card-list">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        //   src={require('assets/img/theme/team-4-800x800.jpg')}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
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
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>{this.props.job}</h3>
                  <i className="ni business_briefcase-24 mr-2" />
                  {this.props.company} - {this.props.location}
                  <div className="h5 mt-3"></div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {this.props.category}
                  </div>
                  <hr className="my-4" />
                  <p>{this.props.description.substring(0, 300)}</p>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </>
    );
  }
}

export default JobItem;
