import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export const Header = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/">Dashboard</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/posts">Posts</Nav.Link>
      <Nav.Link href="/todos">Todos</Nav.Link>
    </Nav>
  </Navbar>
);
