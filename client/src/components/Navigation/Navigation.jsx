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
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/admin'>
              Customer Data
            </Nav.Link>
            <NavDropdown title='Product Keys' id='navbarScrollingDropdown'>
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
                <Nav.Link as={Link} to='/admin/keys2021'>
                  PP 2021
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='Unique Codes' id='navbarScrollingDropdown'>
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
              <NavDropdown.Item to='/uniquecode2021'>PP 2021</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title='Upload Product Keys'
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload-product-key-2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item to='/'>PP 2016</NavDropdown.Item>
              <NavDropdown.Item to='/'>PP 2021</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title='Upload Unique Codes'
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item>
                <Nav.Link as={Link} to='/admin/upload-unique-code-2016'>
                  PP 2016
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item to='#action4'>PP 2016</NavDropdown.Item>
              <NavDropdown.Item to='#action4'>PP 2021</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
