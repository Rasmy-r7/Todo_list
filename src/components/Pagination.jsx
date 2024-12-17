import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumber = [...Array(nPages + 1).keys()].slice(1);

    const goToPrevPage = (e) => {
        e.preventDefault();
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = (e) => {
        e.preventDefault();
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex justify-center items-center mt-4">
            <ul className="flex items-center space-x-4">
                <li>
                    <a href="#" onClick={goToPrevPage} className="text-gray-500 hover:text-black text-lg">
                        <MdNavigateBefore />
                    </a>
                </li>
                {pageNumber.map((pageNum) => (
                    <li key={pageNum}>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNum);
                            }}
                            className={`px-3 py-1 rounded-md text-sm ${
                                currentPage === pageNum
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black hover:bg-gray-300'
                            }`}
                        >
                            {pageNum}
                        </a>
                    </li>
                ))}
                <li>
                    <a
                        href="#"
                        onClick={goToNextPage}
                        className="text-gray-500 hover:text-black text-lg"
                    >
                        <MdNavigateNext />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
