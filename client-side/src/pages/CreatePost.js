import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AppContext';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const history = useHistory();
    // auth context
    const { loggedInUser } = useContext(AuthContext);

    // send request in server
    const fetchData = async (formData) => {
        try {
            const { data } = await axios.post(
                'https://nabed-blog-website.herokuapp.com/post',
                formData,
                {
                    headers: {
                        token: loggedInUser.token,
                    },
                }
            );
            if (data) {
                history.push('/posts');
            }
        } catch (err) {
            const errorMessage = err.response.data && err.response.data.error;
            toast.error(errorMessage);
        }
    };

    // handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('thumbnail', thumbnail[0]);
        formData.append('title', title);
        formData.append('description', description);

        fetchData(formData);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg={2}>
                        <Sidebar />
                    </Col>
                    <Col>
                        <h1 className="text-info  pt-4">Create a New Post</h1>
                        <hr className="bg-info" />
                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                className="mb-3 py-2 border"
                                type="text"
                                placeholder="Write Title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <ReactQuill
                                className="mb-3"
                                theme="snow"
                                defaultValue={description}
                                onChange={(text) => setDescription(text)}
                                style={{ color: '#4e5d6c' }}
                            />
                            <Form.Group className="mb-3">
                                <Form.File
                                    id="exampleFormControlFile1"
                                    label={
                                        <div className="border text-dark py-2 px-3">
                                            <i className="fas fa-upload" /> Upload thumbnail
                                        </div>
                                    }
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => setThumbnail(e.target.files)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="info" type="submit" className="py-2 mt-3">
                                Create Post
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CreatePost;
