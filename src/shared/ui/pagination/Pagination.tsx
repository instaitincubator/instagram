import React from 'react'

import { PaginationParams } from '@/shared/types/utilTypes'
import Select from '@/shared/ui/Select/Select'
import { DOTS, usePagination } from '@/shared/ui/pagination/usePagination'

import { ChevronLeftIcon, ChevronRightIcon } from '../../../../public'

const Pagination: React.FC<PaginationParams> = ({
  currentPage,
  onPageChange,
  onPageSizeChange,
  pageSize,
  siblingCount,
  totalCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    onPageSizeChange,
    pageSize,
    siblingCount,
    totalCount,
  })

  const lastPage =
    paginationRange && paginationRange.length > 0 ? paginationRange[paginationRange.length - 1] : 0

  const rangePagination = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
  ]
  const minItemsForPagination = 5

  if (!totalCount || totalCount <= 0) {
    return null
  }
  const handlePageSizeChange = (value: number | string) => {
    onPageSizeChange(value)
  }

  return (
    <div className="flex">
      <ul className="flex items-center gap-2 list-none">
        <li
          className={`flex justify-center items-center w-8 h-8 cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => +currentPage > 1 && onPageChange(+currentPage - 1)}
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
            )
          }

          return (
            <li
              className={`flex justify-center items-center w-6 h-6 text-sm leading-6 rounded transition-colors duration-200 
                            ${pageNumber === currentPage ? 'text-dark-900  bg-gray-100 w-[25px] h-[25px] text-regular-14' : 'text-light-100 hover:bg-none cursor-pointer'}`}
              key={index}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}

        <li
          className={`flex justify-center items-center w-8 h-8 cursor-pointer ${currentPage === lastPage ? 'opacity-50 pointer-events-none' : ''}}`}
          onClick={() => currentPage < lastPage && onPageChange(+currentPage + 1)}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </li>
      </ul>
      {totalCount && totalCount > minItemsForPagination && (
        <div className="flex flex-row items-center justify-center ml-2">
          <span className="mr-2">Show</span>
          <Select
            className="text-cyan-50"
            onChange={option => handlePageSizeChange(option.value)}
            options={rangePagination}
            value={{ label: pageSize, value: pageSize }}
          />
          <span className="ml-2">on page</span>
        </div>
      )}
    </div>
  )
}

export default Pagination
