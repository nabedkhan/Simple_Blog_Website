import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const UserInfoCard = ({ post }) => (
    <Card body className="bg-transparent mt-5">
        <Row>
            <Col lg={1}>
                <img
                    src={`https://nabed-blog-website.herokuapp.com/${post.author.image}`}
                    alt=""
                    className="img-fluid"
                    style={{ objectFit: 'cover', height: '100' }}
                />
            </Col>
            <Col lg={11}>
                <h5 className="text-info text-capitalize">{post.author && post.author.username}</h5>
                <p className="text-dark" style={{ fontSize: 15 }}>
                    {post.author.bio}
                </p>
            </Col>
        </Row>
    </Card>
);

export default UserInfoCard;
