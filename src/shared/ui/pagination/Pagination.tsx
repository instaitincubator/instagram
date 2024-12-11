import React from 'react';

import { DOTS, usePagination } from '@/shared/ui/pagination/usePagination';

import { ChevronLeftIcon, ChevronRightIcon } from '../../../../public';

export type usePaginationProps = {
    currentPage: number | string;
    pageSize: number;
    siblingCount: number;
    totalCount: number;
};

interface PaginationProps {
    currentPage: number | string;
    onPageChange: (page: number | string) => void;
    pageSize: number;
    siblingCount: number;
    totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    onPageChange,
    pageSize,
    siblingCount,
    totalCount,
}) => {
    const paginationRange = usePagination({
        currentPage,
        pageSize,
        siblingCount,
        totalCount,
    });
    const lastPage =
        paginationRange && paginationRange.length > 0
            ? paginationRange[paginationRange.length - 1]
            : 0;

    return (
        <ul className="flex items-center gap-2 list-none">
            <li
                className={`flex justify-center items-center w-8 h-8 cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() =>
                    +currentPage > 1 && onPageChange(+currentPage - 1)
                }
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </li>

            {paginationRange?.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return (
                        <li
                            className="flex justify-center items-center w-6 h-6 text-gray-500 cursor-default"
                            key={index}
                        >
                            {DOTS}
                        </li>
                    );
                }

                return (
                    <li
                        className={`flex justify-center items-center w-6 h-6 text-sm leading-6 rounded transition-colors duration-200 
                            ${pageNumber === currentPage ? 'text-dark-900  bg-gray-100' : 'text-light-100 hover:bg-none cursor-pointer'}`}
                        key={index}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={`flex justify-center items-center w-8 h-8 cursor-pointer ${currentPage === paginationRange?.length ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() =>
                    currentPage < lastPage && onPageChange(+currentPage + 1)
                }
            >
                <ChevronRightIcon className="w-4 h-4" />
            </li>
        </ul>
    );
};

export default Pagination;
