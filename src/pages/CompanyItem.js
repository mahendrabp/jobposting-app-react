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
import {
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';

const CompanyItem = props =>
  props.company.map(company => {
    // console.log(company);
    return (
      // <div className="main-content" key={company.id}>
      //   <Container className="mt-2">
      //     <Row className="ml-9">
      //       <ListGroup className="list-group" key={company.id}>
      //         <ListGroupItem key={company.id}>
      //           {company.name}:<br></br>
      //           {company.description}
      // <div>
      //   <Button
      //     className="float-right ml-2"
      //     color="primary"
      //     onClick={() => props.editHandler(company)}
      //     size="sm"
      //     data-toggle="modal"
      //     data-target="#modalFormCompany"
      //   >
      //     Edit
      //   </Button>
      //   <Button
      //     className="float-right ml-2"
      //     color="danger"
      //     onClick={() => props.deleteCompany(company.id)}
      //     size="sm"
      //   >
      //     Delete
      //   </Button>
      // </div>
      //         </ListGroupItem>
      //       </ListGroup>
      //     </Row>
      //   </Container>
      // </div>
      <>
        <Card className="m-3" style={centerStyles} key={company.id}>
          <CardImg
            alt="..."
            src={`http://localhost:5200/public/logo/${company.logo}`}
            top
            className="rounded mx-auto d-block"
            style={{ maxWidth: '10rem', maxHeight: '10rem' }}
            key={company.id}
          />
          <CardBody>
            <CardTitle style={{ maxWidth: '100px' }}>{company.name}</CardTitle>

            <div style={{ alignContent: 'center' }}>
              <Button
                className="float-right ml-2"
                color="primary"
                onClick={() => props.editHandler(company)}
                size="sm"
                data-toggle="modal"
                data-target="#modalFormCompany"
              >
                Edit
              </Button>
              <Button
                className="float-right ml-2"
                color="danger"
                onClick={() => props.deleteCompany(company.id)}
                size="sm"
              >
                Delete
              </Button>
            </div>
          </CardBody>
        </Card>
      </>
    );
  });

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row'
};
export default CompanyItem;
