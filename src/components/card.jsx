import React from "react";
import { X } from 'lucide-react';
import { usePosts } from "../context/postContext";

const Card = ({ post }) => {
    const {removePost } = usePosts();
    const previewTitle = post.title.length > 30 ? `${post.title.substring(0, 30)} ...` : post.title;
    const previewBody = post.body.length > 80 ? `${post.body.substring(0, 80)} ...` : post.body;

    return(
        <div className="card">
            <button className="delete-btn" onClick={() => removePost(post.id)} aria-label="Delete post">
                <X color="red" size={24} />
            </button>
            <h3 className="card-title">{previewTitle}</h3>
            <p className="card-body"> {previewBody} </p>
            <div className="card-media">
                <span className="card-date">{post.publishedDate}</span>
                <img src={post.image} alt={post.title} />
            </div>
        </div>
    );
};

export default Card;