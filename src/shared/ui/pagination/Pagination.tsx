/* eslint-disable @typescript-eslint/no-unused-vars */
import KeyboardArrowRight from '/public/chevronRightIcon.svg';
import KeyboardArrowLeft from '/public/chevronLeftIcon.svg';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { usePagination } from './usePagination';

type PaginationProps<T> = {
    className?: string;
    data: T[];
    pageSize: number;
    siblings?: number;
    onDataChange?: (currentData: T[]) => void;
};

export function Pagination<T>({
    className = '',
    data,
    pageSize,
    siblings = 1,
    onDataChange,
}: PaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / pageSize);

    const [visibleData, setVisibleData] = useState<T[]>([]);

    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        console.log(firstPageIndex);

        const lastPageIndex = firstPageIndex + pageSize;
        console.log(lastPageIndex);

        const slicedData = data.slice(firstPageIndex, lastPageIndex);

        if (onDataChange) {
            onDataChange(slicedData);
        }

        setVisibleData(slicedData);
        return slicedData;
    }, [currentPage, pageSize, data]);

    const { paginationRange } = usePagination({
        data,
        pageSize,
        siblings,
        currentPage,
    });


    if (!paginationRange || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const onPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const DOTS = '...';

    return (
        <ul className={clsx('flex list-none', className)}>
            <li
                className={clsx(
                    'relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] rounded-full',
                    currentPage === 1
                        ? 'pointer-events-none cursor-default text-gray-400'
                        : 'hover:cursor-pointer',
                )}
                onClick={onPrevious}
            >
                <KeyboardArrowLeft />
            </li>

            {paginationRange.map((page, index) => {
                if (page === DOTS) {
                    return (
                        <li
                            key={`dots-${index}`}
                            className="relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] rounded-full hover:cursor-default"
                        >
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={`page-${page}`}
                        className={clsx(
                            'relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] rounded-full',
                            page === currentPage
                                ? 'bg-gray-100 text-[#020617]'
                                : 'hover:cursor-pointer hover:bg-gray-200',
                        )}
                        onClick={() => setCurrentPage(Number(page))}
                    >
                        {page}
                    </li>
                );
            })}

            <li
                className={clsx(
                    'relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] rounded-full',
                    currentPage === totalPages
                        ? 'pointer-events-none cursor-default text-gray-400'
                        : 'hover:cursor-pointer',
                )}
                onClick={onNext}
            >
                <KeyboardArrowRight />
            </li>
        </ul>
    );
}
