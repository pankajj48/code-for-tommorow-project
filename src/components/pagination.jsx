import React from "react";
import { usePosts } from "../context/postContext";

const Pagination = () => {
    const{items, currentPage, setCurrentpage} = usePosts();
    const totalPages = Math.ceil(items.length /6);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentpage (currentPage + 1);
    };

    const handlePrev = () => {
        if(currentPage > 1) setCurrentpage(currentPage -1);
    };

    const getPageNumbers = () => {
        let pages =[];
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, currentPage + 1);
        for (let i = start; i <= end; i++){
            pages.push(i);
        }
        return pages;
    };

    if(totalPages === 0) return null;
    return (
        <div className="Pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Previous
            </button>

            {getPageNumbers().map(num => (
                <button
                key={num}
                className={currentPage === num ? 'active' : ''}
                onClick={() => setCurrentpage(num)}>
                    {num}
                </button>
            ))}

            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;