/*eslint-disable*/
import React from 'react';

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      // <footer className="footer">
      // <Row className="align-items-center justify-content-xl-between">
      //   <Col xl="6">
      //     <div className="copyright text-center text-xl-left text-muted">
      //       © 2019{' '}
      //       <a
      //         className="font-weight-bold ml-1"
      //         // href="https://www.creative-tim.com?ref=adr-admin-footer"
      //         rel="noopener noreferrer"
      //         target="_blank"
      //       >
      //         CROWNHIRE
      //       </a>
      //     </div>
      //   </Col>

      //   <Col xl="6">
      //     <Nav className="nav-footer justify-content-center justify-content-xl-end">
      //       <NavItem>
      //         <NavLink
      //           // href="https://www.creative-tim.com?ref=adr-admin-footer"
      //           rel="noopener noreferrer"
      //           target="_blank"
      //         >
      //           CROWNHIRE
      //         </NavLink>
      //       </NavItem>

      //       <NavItem>
      //         <NavLink rel="noopener noreferrer" target="_blank">
      //           About Us
      //         </NavLink>
      //       </NavItem>

      //       <NavItem>
      //         <NavLink rel="noopener noreferrer" target="_blank">
      //           Blog
      //         </NavLink>
      //       </NavItem>

      //       <NavItem>
      //         <NavLink rel="noopener noreferrer" target="_blank">
      //           MIT License
      //         </NavLink>
      //       </NavItem>
      //     </Nav>
      //   </Col>
      // </Row>
      // </footer>
      <footer
        style={{
          flexShrink: 'none',

          height: '200px',
          position: 'relative',
          clear: 'both'
        }}
        class="py-4 bg-dark text-white-50"
      >
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-center text-muted">
              © 2019{' '}
              <a
                className="font-weight-bold ml-1"
                // href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                CROWNHIRE
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-center">
              <NavItem>
                <NavLink
                  // href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  CROWNHIRE
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink rel="noopener noreferrer" target="_blank">
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink rel="noopener noreferrer" target="_blank">
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink rel="noopener noreferrer" target="_blank">
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
