import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BookmarkPostCard, Loader, Sidebar } from '../components';
import { AuthContext } from '../context/AppContext';

const Dashboard = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get('https://nabed-blog-website.herokuapp.com/auth/bookmark', {
                headers: { token: loggedInUser.token },
            })
            .then(({ data }) => {
                setBookmarks(data);
                setLoading(false);
            });

        axios
            .post(
                'https://nabed-blog-website.herokuapp.com/post/user',
                {},
                { headers: { token: loggedInUser.token } }
            )
            .then(({ data }) => {
                setPosts(data);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section>
            <Container>
                <Row>
                    <Col lg={2}>
                        <Sidebar />
                    </Col>
                    <Col lg={10}>
                        {loading ? (
                            <Loader visible={loading} />
                        ) : (
                            <>
                                <h2 className="text-info pt-4">My Recent Post</h2>
                                <hr className="bg-info" />
                                <Row>
                                    {posts.slice(0, 3).map((post) => (
                                        <BookmarkPostCard post={post} key={post._id} />
                                    ))}
                                </Row>

                                <h2 className="text-info pt-4">My Bookmarks</h2>
                                <hr className="bg-info" />
                                <Row>
                                    {bookmarks.map((post) => (
                                        <BookmarkPostCard post={post} key={post._id} />
                                    ))}
                                </Row>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Dashboard;
