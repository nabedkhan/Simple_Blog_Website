import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer, Header, PrivateRoute } from './components';
import {
    CreatePost,
    Dashboard,
    Home,
    Login,
    MyPosts,
    PostDetails,
    Profile,
    // eslint-disable-next-line prettier/prettier
    Register
} from './Routes';

const options = {
    autoClose: 2000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: false,
    pauseOnHover: false,
};

const App = () => (
    <Router>
        <Header />
        <ToastContainer {...options} />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/post/:id" component={PostDetails} />

            <PrivateRoute exact path="/dashboard" children={<Dashboard />} />
            <PrivateRoute exact path="/create" children={<CreatePost />} />
            <PrivateRoute exact path="/posts" children={<MyPosts />} />
            <PrivateRoute exact path="/profile" children={<Profile />} />
        </Switch>
        <Footer />
    </Router>
);

export default App;
