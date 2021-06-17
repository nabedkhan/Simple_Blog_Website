import React, { useContext } from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AppContext';

const Header = () => {
    const { loggedInUser } = useContext(AuthContext);
    return (
        <Navbar bg="info" expand="lg" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand py-0">
                    <Image src="/images/secondary-logo.png" width="30" />
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="nav-link px-4">
                            Home
                        </Link>
                        {loggedInUser && (
                            <Link to="/dashboard" className="nav-link px-4">
                                Dashboard
                            </Link>
                        )}
                        {!loggedInUser && (
                            <>
                                <Link to="/register" className="nav-link  px-4">
                                    Register
                                </Link>
                                <Link to="/login" className="nav-link px-4">
                                    Login
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
