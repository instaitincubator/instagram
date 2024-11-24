import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  pageSize: number;
}

export function useGlobalPagination<T>({ data, pageSize }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, pageSize]);


  const handlePageChange = (page: number) => {
    if (page < 1) {
      setCurrentPage(1); 
    } else if (page > totalPages) {
      setCurrentPage(totalPages); 
    } else {
      setCurrentPage(page); 
    }
  };

  return {
    currentPage,
    totalPages,
    currentData,
    handlePageChange,
  };
}
