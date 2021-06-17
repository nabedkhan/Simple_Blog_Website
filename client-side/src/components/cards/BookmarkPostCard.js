import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookmarkPostCard = ({ post }) => {
    const description = post.description.replace(/<[^>]+>/g, '');

    return (
        <Col lg={3}>
            <Card className="bg-info text-white mb-4">
                <Card.Img
                    variant="top"
                    style={{ height: 150, objectFit: 'cover' }}
                    src={`https://nabed-blog-website.herokuapp.com/${post.thumbnail}`}
                />
                <Card.Body>
                    <Card.Title>
                        <Link to={`/post/${post._id}`} className="text-white text-decoration-none">
                            <h5>{`${post.title.substring(0, 35)}..`}</h5>
                        </Link>
                    </Card.Title>
                    <Card.Text>{`${description.substring(0, 50)}....`}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
};
export default BookmarkPostCard;
