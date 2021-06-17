import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AppContext';

const Register = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // app context
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

    useEffect(() => {
        if (loggedInUser && loggedInUser.email) {
            history.push('/');
        }
    }, [history, loggedInUser]);

    // send request in server
    const fetchData = async () => {
        try {
            const { data } = await axios.post(
                'https://nabed-blog-website.herokuapp.com/auth/register',
                {
                    username,
                    email,
                    password,
                }
            );
            setLoggedInUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (err) {
            const errorMessage = err.response && err.response.data.error;
            toast.error(errorMessage);
        }
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password doesn't match");
        } else {
            fetchData();
        }
    };

    return (
        <Container className="h-100">
            <Row className="d-flex h-100 align-items-center">
                <Col lg={6}>
                    <h2 className="text-info">Register with Email</h2>
                    <hr className="mb-5 bg-info" />
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            className="mb-3 py-2 border"
                            type="text"
                            placeholder="Enter Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Control
                            className="mb-3 py-2 border"
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mb-3 py-2 border"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Control
                            className="mb-3 py-2 border"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button variant="info" type="submit" className="w-100 py-2">
                            Submit
                        </Button>
                    </Form>
                    <p className="mt-3">
                        <Link className="text-dark" to="/login">
                            Already have an account? Login
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
