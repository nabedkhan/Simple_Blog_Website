import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Loader, PostCard } from '../components';
import { AuthContext } from '../context/AppContext';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Auth Context
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get('https://nabed-blog-website.herokuapp.com/post')
            .then(({ data }) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => toast.error(err.message));
    }, []);

    const handleBookmark = async (postId) => {
        try {
            const { data } = await axios.put(
                'https://nabed-blog-website.herokuapp.com/auth/bookmark',
                { postId },
                { headers: { token: loggedInUser.token } }
            );
            setLoggedInUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            toast.error(error.response && error.response.data.error);
        }
    };

    return (
        <main className="h-100 mt-4">
            <Container>
                <Row>
                    <Loader visible={loading} />
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} handleBookmark={handleBookmark} />
                    ))}
                </Row>
            </Container>
        </main>
    );
};

export default Home;
