import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader, Sidebar } from '../components';
import { AuthContext } from '../context/AppContext';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        axios
            .post(
                'https://nabed-blog-website.herokuapp.com/post/user',
                {},
                { headers: { token: loggedInUser.token } }
            )
            .then(({ data }) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => toast.error(err.response?.data.error));
    }, [loggedInUser.token]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            try {
                const { data } = await axios.delete(
                    `https://nabed-blog-website.herokuapp.com/post/${id}`,
                    {
                        headers: { token: loggedInUser.token },
                    }
                );
                console.log(data);
            } catch (error) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg={2}>
                        <Sidebar />
                    </Col>
                    <Col lg={10}>
                        <h1 className="text-info pt-4">My Posts</h1>
                        <hr className="bg-info" />

                        {loading ? (
                            <Loader visible={loading} />
                        ) : (
                            <Table bordered hover variant="dark">
                                <thead className="text-center">
                                    <tr>
                                        <th>Title</th>
                                        <th>Creation Date</th>
                                        <th>Post Details</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post._id} className="text-center">
                                            <td>{post.title}</td>
                                            <td>{new Date(post.createdAt).toDateString()}</td>
                                            <td>
                                                <Link to={`/post/${post._id}`}>View Post</Link>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(post._id)}
                                                    className="btn"
                                                >
                                                    <i className="fas fa-trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default MyPosts;
