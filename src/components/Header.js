import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import "./Home.css"

export default function Header() {
    return <>
        <Navbar collapseOnSelect expand="lg" >
            <Container fluid>
                <Navbar.Brand href="/">
                    <span className="heading-text">Ecocops</span>
                </Navbar.Brand>
                <Nav className="d-flex justify-content-end">
                    <Nav.Link herf="#placeholder"><span className="heading-text page-links">Past Events</span></Nav.Link>
                    <Nav.Link herf="#placeholder"><span className="heading-text page-links">Upcoming Events</span></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>
}
