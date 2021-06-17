import React from 'react';

const Comment = ({ comment }) => (
    <div className="mt-3">
        <div className="d-flex">
            <img
                src={`https://nabed-blog-website.herokuapp.com/${comment.user.image}`}
                width="50"
                className="img-fluid me-2"
                alt=""
            />
            <div className="d-inline">
                <h6 className="text-info fw-bold">{comment.user.username.toUpperCase()}</h6>
                <p className="text-dark">{comment.comment}</p>
            </div>
        </div>
        <hr className="bg-dark" />
    </div>
);

export default Comment;
