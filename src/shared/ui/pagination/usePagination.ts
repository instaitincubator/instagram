import { useMemo } from 'react'



const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

type Props = {
  currentPage: number
  pageSize: number
  siblings?: number
  totalCount: number
}

type PaginationRange = number[]
const DOTS = '...'

export const usePagination = ({
  currentPage,
  pageSize = 12,
  siblings = 1,

  totalCount,
}: Props) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers = siblings + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

  
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings
      //leftItemCount -5 hata
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
   
    }


    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings

      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

  }, [siblings, pageSize, totalCount, currentPage]) as PaginationRange

  return paginationRange
}
