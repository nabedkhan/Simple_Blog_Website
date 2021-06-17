import React from 'react';
import { Col, Container } from 'react-bootstrap';

const Footer = () => (
    <footer className="bg-info text-white py-2">
        <Container>
            <Col>
                <p className="text-center">
                    All Rights Reserved By Nabed Khan &copy; {new Date().getFullYear()}
                </p>
            </Col>
        </Container>
    </footer>
);

export default Footer;
