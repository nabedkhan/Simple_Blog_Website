import React, { useContext } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AppContext';

const Sidebar = () => {
    const { setLoggedInUser } = useContext(AuthContext);
    // logout handler
    const handleLogout = () => {
        setLoggedInUser(null);
        localStorage.removeItem('user');
    };

    return (
        <Card body className="h-100">
            <ListGroup>
                <ListGroup.Item>
                    <Link to="/dashboard" className="text-white text-decoration-none">
                        Dashboard
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/create" className="text-white text-decoration-none">
                        Create Post
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/posts" className="text-white text-decoration-none">
                        My Posts
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to="/profile" className="text-white text-decoration-none">
                        Profile
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                    <button type="button" className=" btn p-0" onClick={handleLogout}>
                        Logout
                    </button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};
export default Sidebar;
