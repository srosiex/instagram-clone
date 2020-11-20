import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ userName, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post-header">
            <Avatar className="post-avatar" alt={userName} src="/static/images/avatar1.jpg" />
            <h3>{userName}</h3>
            </div>

            <img className="post-image" src={imageUrl} />
       
            <h4 className="post-text"><strong>{userName}:</strong> {caption}</h4>
        </div>
    )
}

export default Post
