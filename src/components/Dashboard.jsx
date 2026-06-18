import React from "react";
import {usePosts } from '../context/postContext';
import { OrbitProgress } from "react-loading-indicators";
import Card from "./card";
import Pagination from "./pagination";
const Dashboard = () => {
    const{items, currentPage, startupLoading, error } = usePosts ();
    if(startupLoading) {
        return (
            <div className="loading-container">
                <h1> Loading... </h1>
                <OrbitProgress variant="split-disc" dense color="#000100" size="small" text="" textColor="" /> 
                <p> wait for 5 second..</p>
            </div>
        );
    }
    if(error) 
        return(
            <div> Error loading posts: {error} </div>
    );
    const startIndex = (currentPage - 1) * 6;
    const currentPosts = items.slice(startIndex, startIndex + 6);
    return (
        <div className="app-conatiner">
            <h1> Post Dashboard </h1>
            <div className="card-grid">
                {currentPosts.map(post => (
                    <Card key={post.id} post ={post} />
                ))}
            </div>
            <Pagination/>
        </div>
    );
};
export default Dashboard;