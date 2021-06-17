import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ visible = false }) => visible && <Spinner animation="border" />;

export default Loader;
