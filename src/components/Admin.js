import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'

export default function Admin() {
    return (
        <>
        <Card className="d-flex justify-text-center mx-auto mt-4" style={{maxWidth: "400px"}}>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>

                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required></Form.Control>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required></Form.Control>
                    </Form.Group>

                    <Button className="w-100 mt-4" type="submit">Login</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}
