import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import Header from "./Header.js"
import "./Home.css"

export default function Home() {
    return <Container fluid className="home-root-section">
        <Header />
        <Row className="home-row-section">
            <Container className="home-text-section">
                <Row>
                    Ecocops-The Home of Eco Warriors<br />
                </Row>
                <Row>
                    {/* Small text describing eco club */}
                </Row>
            </Container>
        </Row>
    </Container>
}
