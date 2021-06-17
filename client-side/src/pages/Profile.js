import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AppContext';

const Profile = () => {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    const [bio, setBio] = useState(loggedInUser.bio);
    const [image, setImage] = useState('');
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('thumbnail', image);
        formData.append('bio', bio);

        try {
            const { data } = await axios.put(
                `https://nabed-blog-website.herokuapp.com/auth/`,
                formData,
                {
                    headers: { token: loggedInUser.token },
                }
            );
            setLoggedInUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            setSuccess('User Updated Successfully');

            setBio('');
            setImage('');
        } catch (error) {
            toast.error(error.response?.data.error);
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg={2}>
                        <Sidebar />
                    </Col>
                    <Col>
                        <h1 className="text-info pt-4">Profile</h1>
                        <hr className="bg-info" />
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                className="border mb-3"
                                defaultValue={loggedInUser.email}
                                disabled
                            />

                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Write about yourself..."
                                className="border mb-3"
                                onChange={(e) => setBio(e.target.value)}
                                value={bio}
                                required
                            />

                            <Form.File
                                className="mb-3"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />

                            <Button variant="primary" type="submit" className="mt-3">
                                Update Profile
                            </Button>

                            {success && (
                                <Alert variant="success" className="mt-3">
                                    {success}
                                </Alert>
                            )}
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Profile;
