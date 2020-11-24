import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase'

function Post({ userName, caption, imageUrl, postId }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }
    })

    const postComment = (e) => {
        e.preventDefault();
    }

    return (
        <div className="post">
            <div className="post-header">
            <Avatar className="post-avatar" alt={userName} src="/static/images/avatar1.jpg" />
            <h3>{userName}</h3>
            </div>

            <img className="post-image" src={imageUrl} />
       
            <h4 className="post-text"><strong>{userName}:</strong> {caption}</h4>

            <form className="post-comment-box">
                <input className="post-input"
                        type="text"
                        placeholder="Add comment.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onClick={postComment}
                        />
                        
                        <button 
                        className="post-button"
                        disabled={!comment}
                        type="submit"
                        onChange={(e) => setComment(e.target.value)}
                        >
                            Post
                        </button>
            </form>
        
        </div>
    )
}

export default Post
