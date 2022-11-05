import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Admin() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();

        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch {
            setError("Failed to Log In");
        }

        setLoading(false);
    }

    return (
        <>
        <Card className="d-flex justify-text-center mx-auto mt-4" style={{maxWidth: "400px"}}>
            <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group>

                    <Button className="w-100 mt-4" disabled={loading} type="submit">Login</Button>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}
