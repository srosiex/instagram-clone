import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ userName, caption, imageUrl }) {
    return (
        <div className="post">
            <div className="post-header">
            <Avatar className="post-avatar" alt="srosiex" src="/static/images/avatar1.jpg" />
            <h3>{userName}</h3>
            </div>

            <img className="post-image" src="https://m.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/16/Pictures/_1571873a-58de-11e8-b431-73159b4b09e2.jpg"/>
       
            <h4 className="post-text"><strong>srosiex:</strong> Cute puppy</h4>
        </div>
    )
}

export default Post
