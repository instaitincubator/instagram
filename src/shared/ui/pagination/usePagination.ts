import { useMemo } from 'react';


const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
  
const DOTS = '...';

interface UsePaginationProps<T> {
  data: T[]; 
  pageSize: number; 
  siblings?: number; 
  currentPage:number
}


type PaginationRange = (number | string)[];

export function usePagination<T>({
  data,
  pageSize = 12,
  siblings = 1,
  currentPage=1,
}: UsePaginationProps<T>) {



  const totalPages = Math.ceil(data.length / pageSize);




  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblings + 5; 

 
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;


    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + 2 * siblings);
      return [...leftRange, DOTS, lastPageIndex];
    }

 
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (2 * siblings + 2), totalPages);
      return [firstPageIndex, DOTS, ...rightRange];
    }

      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }, [currentPage, totalPages, siblings])  as PaginationRange



 
  return {            
    currentPage,
    totalPages,
    data,
    paginationRange,
  };
}
