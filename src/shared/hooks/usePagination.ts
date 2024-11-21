// hooks/usePagination.ts
import { useMemo } from 'react';

export const DOTS = '...';

type UsePaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblings?: number;
};

export const usePagination = ({
  currentPage,
  totalCount,
  pageSize,
  siblings = 1,
}: UsePaginationProps) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblings + 5;

    if (totalPageNumbers >= totalPageCount) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    const paginationRange = [];

    if (!showLeftDots && showRightDots) {
      for (let i = 1; i < 3 + 2 * siblings; i++) {
        paginationRange.push(i);
      }
      paginationRange.push(DOTS, lastPageIndex);
    } else if (showLeftDots && !showRightDots) {
      paginationRange.push(firstPageIndex, DOTS);
      for (let i = totalPageCount - (3 + 2 * siblings) + 1; i <= totalPageCount; i++) {
        paginationRange.push(i);
      }
    } else {
      paginationRange.push(firstPageIndex, DOTS);
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        paginationRange.push(i);
      }
      paginationRange.push(DOTS, lastPageIndex);
    }

    return paginationRange;
  }, [currentPage, totalCount, pageSize, siblings]);
};
