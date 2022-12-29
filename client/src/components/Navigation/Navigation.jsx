import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/admin'>
          DisplayPin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' navbarScroll>
            <Nav.Link as={Link} to='/admin'>
              Customer Data
            </Nav.Link>
            <Nav.Link as={Link} to='/products'>
              Products
            </Nav.Link>
            <NavDropdown title='PK' id='navbarScrollingDropdown'>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/product_keys/pp2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/product_keys/pp2019'>
                  PP 2019
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/product_keys/pp2021'>
                  PP 2021
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/product_keys/hb2021'>
                  HB 2021
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='UC' id='navbarScrollingDropdown'>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/unique_codes/pp2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/unique_codes/pp2019'>
                  PP 2019
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/unique_codes/pp2021'>
                  PP 2021
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/unique_codes/hb2021'>
                  HB 2021
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='Upload PK' id='navbarScrollingDropdown'>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/product_keys/pp2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/product_keys/pp2019'>
                  PP 2019
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/product_keys/pp2021'>
                  PP 2021
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/product_keys/hb2021'>
                  HB 2021
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='Upload UC' id='navbarScrollingDropdown'>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/unique_codes/pp2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/unique_codes/pp2019'>
                  PP 2019
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/unique_codes/pp2021'>
                  PP 2021
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload/unique_codes/hb2021'>
                  HB 2021
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Download Text' id='navbarScrollingDropdown'>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/template/pp2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/template/pp2019'>
                  PP 2019
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/template/pp2021'>
                  PP 2021
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/template/hb2021'>
                  HB 2021
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
