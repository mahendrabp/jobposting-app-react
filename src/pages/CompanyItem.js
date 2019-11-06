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
import { Button, Card, CardBody, CardImg, CardTitle } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CompanyItem extends React.Component {
  render() {
    return (
      <>
        {this.props.company.company.map(company => (
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
              <CardTitle style={{ maxWidth: '100px' }}>
                {company.name}
              </CardTitle>

              <div style={{ alignContent: 'center' }}>
                <Button
                  className="float-right ml-2"
                  color="primary"
                  onClick={() => this.props.editHandler(company)}
                  size="sm"
                  data-toggle="modal"
                  data-target="#modalFormCompany"
                >
                  Edit
                </Button>
                <Button
                  className="float-right ml-2"
                  color="danger"
                  onClick={() => this.props.deleteCompany(company.id)}
                  size="sm"
                >
                  Hapus
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </>
    );
  }
}

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row'
};

// class CompanyItem extends React.Component {
//   render() {
//     console.log(this.props.company.company);
//     return (
//       <>
//         {this.props.company.company.map(v => (
//           <React.Fragment key={v.id}>
//             <div>
//               {v.name} <span>{v.name}</span>
//             </div>
//             <div>{v.gender}</div>
//           </React.Fragment>
//         ))}
//       </>
//     );
//   }
// }

const mapStateToProps = state => ({
  company: state.company
});
export default connect(mapStateToProps)(CompanyItem);

// export default CompanyItem;
