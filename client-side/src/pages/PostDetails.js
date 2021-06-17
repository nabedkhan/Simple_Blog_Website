import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Comment, Loader, UserInfoCard } from '../components';
import { AuthContext } from '../context/AppContext';

const PostDetails = ({ match }) => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');

    // auth context
    const { loggedInUser } = useContext(AuthContext);

    const loadData = async () => {
        try {
            const { data } = await axios.get(
                `https://nabed-blog-website.herokuapp.com/post/${match.params.id}`
            );
            setPost(data);
            setLoading(false);
        } catch (err) {
            toast.error(err.response.data && err.response.data.error);
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // handle post Comment
    const handleComment = async () => {
        try {
            await axios.post(
                `https://nabed-blog-website.herokuapp.com/post/${match.params.id}`,
                { comment },
                { headers: { token: loggedInUser.token } }
            );
            toast.success('comment created successfully');
            loadData();
            setComment('');
        } catch (error) {
            toast.error(error.response.data && error.response.data.error);
        }
    };

    return (
        <Container>
            <Row>
                <Col lg={8} className="offset-lg-2 my-3">
                    {loading ? (
                        <Loader visible={loading} />
                    ) : (
                        <>
                            <img
                                src={`https://nabed-blog-website.herokuapp.com/${post.thumbnail}`}
                                className="img-fluid"
                                alt=""
                            />
                            <h1 className="text-info py-5" style={{ fontWeight: '600' }}>
                                {post.title}
                            </h1>
                            <div
                                className="text-dark"
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: post.description }}
                            />

                            <UserInfoCard post={post} />

                            <hr className="bg-dark mt-5" />
                            <h4 className="text-dark">
                                {post.comment.length} response to &quot;{post.title}&quot;
                            </h4>
                            {post.comment.map((com) => (
                                <Comment comment={com} key={com._id} />
                            ))}

                            {loggedInUser && loggedInUser.email ? (
                                <div className="mt-5">
                                    <h5 className="text-dark mb-2">Leave a Reply</h5>
                                    <textarea
                                        className="form-control border"
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-info mt-2"
                                        onClick={handleComment}
                                    >
                                        Comment
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login">Sign in with your account</Link>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PostDetails;
