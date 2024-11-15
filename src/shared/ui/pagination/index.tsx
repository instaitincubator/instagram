import KeyboardArrowRight from '/public/chevronRightIcon.svg';
import KeyboardArrowLeft from '/public/chevronLeftIcon.svg';


import clsx from 'clsx'
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
    <ul className={clsx(s.paginationContainer, { [className]: className })}>
      <li
        className={clsx(s.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
       <KeyboardArrowLeft/>

      </li>
        
      {paginationRange.map((pageNumber: number) => {
        if (pageNumber.toString() === DOTS) {
          return (
            <li className={`${s.paginationItem} ${s.dots}`} key={pageNumber}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            className={clsx(`${s.paginationItem} `, {
              selected: pageNumber === currentPage,
            })}
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}

      <li
        className={clsx(s.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
       <KeyboardArrowRight/>

      </li>
      
    </ul>
  )
}

