import KeyboardArrowRight from '/public/chevronRightIcon.svg';
import KeyboardArrowLeft from '/public/chevronLeftIcon.svg';


// import s from '@/shared/ui/pagination/pagination.css'
import s from './pagination.module.css'
import { usePagination } from '@/shared/hooks/usePagination';

type PaginationConditionals =
  | {
    onChange: (itemPerPage: number) => void
  }
  | {
    onChange?: never
  }

type Props = {
  className: string

  currentPage: number
  onChange: (page: number) => void
  pageSize: number
  siblings?: number
  totalCount: number
} & PaginationConditionals

export const Pagination = ({
  className,
  currentPage,
  onChange,
  pageSize,
  siblings,
  totalCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblings,
    totalCount,
  })





  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onChange(currentPage + 1)
  }

  const onPrevious = () => {
    onChange(currentPage - 1)
  }

  const DOTS = "..."
  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={`flex items-center justify-center space-x-2 ${className}`}>
    {/* Previous Button */}
    <li
      className={`text-gray-500 cursor-pointer ${
        currentPage === 1 ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={onPrevious}
    >
      <KeyboardArrowLeft />
    </li>
  
    {/* Pagination Items */}
    {paginationRange.map((pageNumber, index) => {
      if (pageNumber.toString() === DOTS) {
        return (
          <li className="text-gray-500" key={index}>
            &#8230;
          </li>
        );
      }
  
      return (
        <li
          className={`cursor-pointer ${
            pageNumber === currentPage
              ? "text-blue-500 font-bold"
              : "text-gray-500 hover:text-gray-700"
          }`}
          key={index}
          onClick={() => onChange(pageNumber)}
        >
          {pageNumber}
        </li>
      );
    })}
  
    {/* Next Button */}
    <li
      className={`text-gray-500 cursor-pointer ${
        currentPage === lastPage ? "opacity-50 pointer-events-none" : ""
      }`}
      onClick={onNext}
    >
      <KeyboardArrowRight />
    </li>
  </ul>
  
  
  )
}

