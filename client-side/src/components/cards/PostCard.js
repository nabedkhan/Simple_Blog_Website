import React, { useContext } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AppContext';

const PostCard = ({ post, handleBookmark }) => {
    // Auth Context
    const { loggedInUser } = useContext(AuthContext);
    const visible = loggedInUser && loggedInUser.bookmark.find((item) => item === post._id);
    const description = post.description.replace(/<[^>]+>/g, '');

    return (
        <Col lg={4}>
            <Card className="bg-info text-white mb-4">
                <Card.Img
                    variant="top"
                    style={{ height: 300, objectFit: 'cover' }}
                    src={`https://nabed-blog-website.herokuapp.com/${post.thumbnail}`}
                />
                <Card.Body>
                    <Card.Title className="d-flex align-items-center justify-content-between">
                        <Link to={`/post/${post._id}`} className="text-white text-decoration-none">
                            <h4>{post.title}</h4>
                        </Link>
                        {visible ? (
                            <button
                                type="button"
                                className="btn p-0 ms-2"
                                hidden={!loggedInUser}
                                onClick={() => handleBookmark(post._id)}
                            >
                                <i className="fas fa-bookmark p-2" style={{ fontSize: 20 }} />
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn p-0 ms-2"
                                hidden={!loggedInUser}
                                onClick={() => handleBookmark(post._id)}
                            >
                                <i className="far fa-bookmark p-2" style={{ fontSize: 20 }} />
                            </button>
                        )}
                    </Card.Title>
                    <Card.Text>{`${description.substring(0, 80)}....`}</Card.Text>
                    <div className="d-flex justify-content-between mt-3">
                        <p style={{ fontSize: 15, fontWeight: 300 }}>
                            Author: {post.author.username}
                        </p>
                        <p style={{ fontSize: 15, fontWeight: 300 }}>
                            Date: {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};
export default PostCard;
