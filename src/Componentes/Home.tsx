import React from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { checkHasToken } from '../utils';
import "./Home.css";


function Home(){
  
    if(!checkHasToken()){
    return null;
    }
    
    const token = localStorage.getItem('token');

    const onLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }


    return(
        <>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand  href="#">Canotaje</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="menuButtons" href="/inicio"> Inicio </Nav.Link>
              <Nav.Link className="menuButtons" href="/Eventos"> Eventos </Nav.Link>
              <Nav.Link className="menuButtons" href="/lugares"> Lugares </Nav.Link>              
            </Nav>                      
            <NavDropdown title="🚹" id="basic-nav-dropdown">
              <NavDropdown.Item href="/perfil" className="menuButtons">
                Perfil
              </NavDropdown.Item>
              {(Boolean(token) && <NavDropdown.Item className="menuButtons" onClick={onLogout}> Logout </NavDropdown.Item>)}
            </NavDropdown>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    )
};
export default Home;