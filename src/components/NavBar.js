// /*!

// =========================================================
// * Argon Dashboard React - v1.0.0
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import React from 'react';
// import { Link } from 'react-router-dom';

// // reactstrap components
// import {
//   UncontrolledCollapse,
//   NavbarBrand,
//   Navbar,
//   NavItem,
//   NavLink,
//   Nav,
//   Container,
//   Row,
//   Col
// } from 'reactstrap';
// import NavBar from './NavBar';
// import ls from 'local-storage';

// class Header extends React.Component {
//   render() {
//     // if (isLoggedIn) {
//     //   button = <LogoutButton onClick={this.handleLogoutClick} />;
//     // } else {
//     //   button = <LoginButton onClick={this.handleLoginClick} />;
//     // }
//     let loginlogout;
//     if (ls.get('token') && ls.get('token') !== undefined) {
//       loginlogout = (
//         <NavLink
//           className="nav-link-icon"
//           to="/admin/user-profile"
//           to="/logout"
//           tag={Link}
//         >
//           <i className="ni ni-single-02" />
//           <span className="nav-link-inner--text">Logout</span>
//         </NavLink>
//       );
//     } else {
//       loginlogout = (
//         <NavLink
//           className="nav-link-icon"
//           to="/admin/user-profile"
//           to="/login"
//           tag={Link}
//         >
//           <i className="ni ni-single-02" />
//           <span className="nav-link-inner--text">Login</span>
//         </NavLink>
//       );
//     }

//     let company;
//     if (ls.get('token') && ls.get('token') !== undefined) {
//       company = (
//         <NavLink className="nav-link-icon" to="/company" tag={Link}>
//           <i className="ni ni-circle-08" />
//           <span className="nav-link-inner--text">Company</span>
//         </NavLink>
//       );
//     } else {
//       company = (
//         <NavLink className="nav-link-icon" to="/login" tag={Link}>
//           <i className="ni ni-circle-08" />
//           <span className="nav-link-inner--text">Login to see Company</span>
//         </NavLink>
//       );
//     }

//     return (
//       <>
//         <div className="bg-gradient-info ">
//           <Navbar
//             className="navbar-top navbar-horizontal navbar-dark"
//             expand="md"
//           >
//             <Container className="px-4">
//               <NavbarBrand to="/" tag={Link}>
//                 {/* <img alt="..." src={require('')} /> */}
//               </NavbarBrand>
//               <button className="navbar-toggler" id="navbar-collapse-main">
//                 <span className="navbar-toggler-icon" />
//               </button>
//               <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
//                 <div className="navbar-collapse-header d-md-none">
//                   <Row>
//                     <Col className="collapse-brand" xs="6">
//                       <Link to="/">
//                         <img
//                           alt="..."
//                           src={require('../assets/img/brand/argon-react.png')}
//                         />
//                       </Link>
//                     </Col>
//                     <Col className="collapse-close" xs="6">
//                       <button
//                         className="navbar-toggler"
//                         id="navbar-collapse-main"
//                       >
//                         <span />
//                         <span />
//                       </button>
//                     </Col>
//                   </Row>
//                 </div>
//                 <Nav className="ml-auto" navbar>
//                   <NavItem>
//                     <NavLink className="nav-link-icon" to="/" tag={Link}>
//                       <i className="ni ni-planet" />
//                       <span className="nav-link-inner--text">Dashboard</span>
//                     </NavLink>
//                   </NavItem>
//                   <NavItem>{company}</NavItem>
//                   {/* <NavItem>
//                     <NavLink
//                       className="nav-link-icon"
//                       to="/auth/login"
//                       tag={Link}
//                     >
//                       <i className="ni ni-key-25" />
//                       <span className="nav-link-inner--text">Add Job</span>
//                     </NavLink>
//                   </NavItem> */}
//                   <NavItem>{loginlogout}</NavItem>
//                 </Nav>
//               </UncontrolledCollapse>
//             </Container>
//           </Navbar>
//         </div>
//       </>
//     );
//   }
// }

// export default Header;

// import React, { useState } from 'react';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from 'reactstrap';
// import ls from 'local-storage';

// const Header = props => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <div>
//       <Navbar color="light" light expand="md">
//         <NavbarBrand href="/">reactstrap</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="ml-auto" navbar>
//             <NavItem>
//               <NavLink href="/dashboard/">Dashboard</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/company">Company</NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 --This is User Section--
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem>Edit Profile</DropdownItem>
//                 <DropdownItem divider />

//                 <DropdownItem>Logout</DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';
import ls from 'local-storage';
// import { Button } from '@material-ui/core';
import color from '@material-ui/core/colors/cyan';

class Header extends React.Component {
  render() {
    let loginlogout;
    if (ls.get('token') && ls.get('token') !== undefined) {
      loginlogout = (
        <UncontrolledDropdown nav>
          {/* <NavLink
            aria-expanded={false}
            aria-haspopup={true}
            data-toggle="dropdown"
           
            id="navbar-primary_dropdown_1"
            onClick={e => e.preventDefault()}
            role="button"
          >
            <i className="ni ni-single-02" />
            <span className="nav-link-inner--text">Login</span>
          </NavLink> */}
          <NavLink
            className="nav-link-icon mt-2"
            // to="/login"
            tag={Link}
            aria-expanded={false}
            aria-haspopup={true}
            data-toggle="dropdown"
            id="navbar-primary_dropdown_1"
          >
            <span style={spanStyle} className="nav-link-inner--text">
              Profile
            </span>
          </NavLink>
          <DropdownMenu aria-labelledby="navbar-primary_dropdown_1" right>
            <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
              Edit Profile -coming soon-
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to="/logout">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    } else {
      loginlogout = (
        <NavLink
          className="nav-link-icon"
          to="/admin/user-profile"
          to="/login"
          tag={Link}
        >
          <Button color="primary" type="button">
            Login
          </Button>
        </NavLink>
      );
    }

    let company;
    if (ls.get('token') && ls.get('token') !== undefined) {
      company = (
        <NavLink className="nav-link-icon mt-2" to="/company" tag={Link}>
          <span style={spanStyle} className="nav-link-inner--text">
            Company
          </span>
        </NavLink>
      );
    } else {
      company = (
        <NavLink className="nav-link-icon mt-2" to="/login" tag={Link}>
          <span style={spanStyle} className="nav-link-inner--text">
            Login to see Company
          </span>
        </NavLink>
      );
    }

    let signup;
    if (ls.get('token') && ls.get('token') !== undefined) {
      signup = <span></span>;
    } else {
      signup = (
        <NavLink className="nav-link-icon" to="/register" tag={Link}>
          <Button color="info" type="button">
            Register
          </Button>
        </NavLink>
      );
    }

    return (
      <Navbar
        style={navbarStyle}
        className="navbar-horizontal navbar-dark bg-white"
        expand="md"
      >
        <Container>
          <NavbarBrand tag={Link} to="/dashboard" style={spanStyle}>
            CrownHire
          </NavbarBrand>

          <button
            aria-controls="navbar-primary"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-primary"
            data-toggle="collapse"
            id="navbar-primary"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-primary">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      // src={require('assets/img/brand/blue.png')}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-primary"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-primary"
                    data-toggle="collapse"
                    id="navbar-primary"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-lg-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon mt-2" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span style={spanStyle} className="nav-link-inner--text">
                    Dashboard
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>{company}</NavItem>
              <NavItem>{loginlogout}</NavItem>
              {signup}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    );
  }
}
const navbarStyle = {
  padding: '0px 20px'
};
const spanStyle = {
  fontSize: '16px',
  color: '#424242'
};

export default Header;
