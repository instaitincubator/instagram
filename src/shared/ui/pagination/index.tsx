import { useMemo } from 'react';

// Utility function to create a range of numbers
const createRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

// Constants
const DOTS = '...';

type UsePaginationProps = {
  currentPage: number; // The current active page
  pageSize: number;    // Number of items per page
  siblings?: number;   // Number of sibling pages to display
  totalCount: number;  
};

type PaginationRange = (number | string)[]; 

export const usePagination = ({
  currentPage,
  pageSize = 12,
  siblings = 1,
  totalCount,
}: UsePaginationProps): PaginationRange => {
  const paginationRange = useMemo(() => {
    // Calculate the total number of pages
    const totalPageCount = Math.ceil(totalCount / pageSize);


    const totalPageNumbers = siblings * 2 + 5;

    // Case 1: No dots, show all pages
    if (totalPageNumbers >= totalPageCount) {
      return createRange(1, totalPageCount);
    }

  
    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount);


    const hasLeftDots = leftSiblingIndex > 2;
    const hasRightDots = rightSiblingIndex < totalPageCount - 2;

   
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    
    if (!hasLeftDots && hasRightDots) {
      const visiblePages = createRange(1, siblings * 2 + 3);
      return [...visiblePages, DOTS, lastPageIndex];
    }


    if (hasLeftDots && !hasRightDots) {
      const visiblePages = createRange(totalPageCount - siblings * 2 - 2, totalPageCount);
      return [firstPageIndex, DOTS, ...visiblePages];
    }

  
    if (hasLeftDots && hasRightDots) {
      const middlePages = createRange(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middlePages, DOTS, lastPageIndex];
    }

    return []; 
  }, [currentPage, pageSize, siblings, totalCount]);

  return paginationRange;
};
