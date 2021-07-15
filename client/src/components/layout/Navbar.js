import React from 'react'
import { Navbar, Container, Nav, NavDropdown, } from 'react-bootstrap';

const NavbarItem = () => {
  return (
    <Navbar className="color-nav" variant="light">
    <Container>
    <Navbar.Brand className="text-size" href="#home">To Do List</Navbar.Brand>
    <Nav className="justify-content-end">
      <Nav.Link className="text-size" href="index.html">Sign Up</Nav.Link>
      <Nav.Link className="text-size margin" href="index.html">Login</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  )
}


export default NavbarItem
