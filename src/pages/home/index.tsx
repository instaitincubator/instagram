import React, { useState } from 'react';

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar';
import Pagination from '@/shared/ui/pagination/Pagination';

export const Home = () => {
    const [currentPage, setCurrentPage] = useState<number | string>(1);
    const totalCount = 100; // общее количество всех элементов
    const pageSize = 10; // количество элементов на странице

    const handlePageChange = (page: number | string) => {
        setCurrentPage(page);
    };

    return (
        <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            siblingCount={1}
            totalCount={totalCount}
        />
    );
};

Home.getLayout = getLayoutWithSidebar;
export default Home;
