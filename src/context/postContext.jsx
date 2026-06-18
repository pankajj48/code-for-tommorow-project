import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
const postContext =createContext();

export const usePosts = () => useContext(postContext);

export const PostProvider = ({children})=> {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentpage] = useState(1);
    const [startupLoading, setStartupLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {

        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            const postsWithMeta = data.map(post => {
                const publishedDate = new Date(2026, 5, ((post.id - 1) % 28) + 1).toLocaleDateString();

                return {
                    ...post,
                    image: `https://picsum.photos/seed/${post.id}/600/400`,
                    publishedDate,
                };
            });

            setItems(postsWithMeta);
        })
        .catch(err => setError(err.message));

        const timer = setTimeout(() => {
            setStartupLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const removePost = (id) => {

        setItems (prevItems => {
        const newItems = prevItems.filter(post => post.id !== id);

        const totalPages = Math.ceil(newItems.length / 6  );
    
        if( currentPage > totalPages && totalPages > 0 ) {
            setCurrentPage(totalPages);
        }
        return newItems;
        });
    };
    return(
        <postContext.Provider
        value={{
            items,
            currentPage,
            setCurrentpage,
            startupLoading,
            error,
            removePost
        }}
        >
            {children}
        </postContext.Provider>
    );
    };
