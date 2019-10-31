// import React from 'react';

// import { Link, Redirect } from 'react-router-dom';
// import NavBar from '../components/NavBar';
// import Sidebar from '../components/Sidebar';

// class Company extends React.Component {
//   render() {
//     return <></>;
//   }
// }

// export default Company;

import React from 'react';
import { Col, Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

const CompanyItem = props =>
  props.company.map(company => {
    return (
      <div key={company.id.toString()}>
        <Container className="mt-2">
          <Col className="mx-auto">
            <ListGroup className="list-group">
              <ListGroupItem>
                {company.name}:<br></br>
                {company.description}
                <div>
                  <Button
                    className="float-right ml-2"
                    color="primary"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    className="float-right ml-2"
                    color="danger"
                    // onClick={() => props.deleteButtonHandler(job.id)}
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Container>
      </div>
    );
  });

export default CompanyItem;
