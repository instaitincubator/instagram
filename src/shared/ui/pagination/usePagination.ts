import { PaginationParams } from '@/shared/types/utilTypes'

const pagesRange = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

export const DOTS = '...'

export const usePagination = (props: Omit<PaginationParams, 'onPageChange'>) => {
  const { currentPage = 1, pageSize = 10, siblingCount = 2, totalCount = 100 } = props

  const totalPageCount = Math.ceil(totalCount / pageSize)
  const totalPageNumbers = siblingCount + 5

  if (totalPageNumbers >= totalPageCount) {
    return pagesRange(1, totalPageCount)
  }

  const leftSiblingIndex = Math.max(+currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(+currentPage + siblingCount, totalPageCount)

  const shouldShowLeftDots = leftSiblingIndex > 2
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

  const firstPageIndex = 1
  const lastPageIndex = totalPageCount

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = pagesRange(1, leftItemCount)

    return [...leftRange, DOTS, lastPageIndex]
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = pagesRange(totalPageCount - rightItemCount + 1, totalPageCount)

    return [firstPageIndex, DOTS, ...rightRange]
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = pagesRange(leftSiblingIndex, rightSiblingIndex)

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }
}
