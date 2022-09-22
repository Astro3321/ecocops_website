import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function Header() {
    return <>
        <Navbar>
            <Container fluid>
                <Navbar.Brand href="/">
                    <span className="heading-text">Ecocops-The Home of Eco Warriors</span>
                </Navbar.Brand>
                <Nav className="d-flex justify-content-end">
                    <Nav.Link herf="#placeholder">Past Events</Nav.Link>
                    <Nav.Link herf="#placeholder">Upcoming Events</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>
}
