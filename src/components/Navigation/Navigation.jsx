import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

function Navigation() {
  return (
  <Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">DisplayPin</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="#action1">Customer Data</Nav.Link>
        <NavDropdown title="Product Keys" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2021</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Unique Codes" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2021</NavDropdown.Item>
        </NavDropdown>
     

        <NavDropdown title="Upload Product Keys" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2021</NavDropdown.Item>
        </NavDropdown>
                           

        <NavDropdown title="Upload Unique Codes" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2016</NavDropdown.Item>
          <NavDropdown.Item href="#action4">PP 2021</NavDropdown.Item>
        </NavDropdown>
                           
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Navigation