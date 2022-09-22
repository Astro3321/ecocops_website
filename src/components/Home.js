import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Header from "./Header.js"
import "./Home.css"

export default function Home() {
    return <Container fluid className="home-root-section">
        <Row >
            <Header />
        </Row>
    </Container>
}
