import KeyboardArrowRight from '/public/chevronRightIcon.svg';
import KeyboardArrowLeft from '/public/chevronLeftIcon.svg';

import { usePagination } from './usePagination';
import clsx from 'clsx';

type PaginationConditionals =
  | { onChange: (itemPerPage: number) => void }
  | { onChange?: never };

type Props = {
  className: string;
  currentPage: number;
  onChange: (page: number) => void;
  pageSize: number;
  siblings?: number;
  totalCount: number;
} & PaginationConditionals;

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
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => onChange(currentPage + 1);
  const onPrevious = () => onChange(currentPage - 1);

  const DOTS = '...';
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={clsx('flex list-none', className)}>
      <li
        className={clsx(
          'relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] leading-[1.43] text-center tracking-[0.01071em] rounded-full',
          currentPage === 1 ? 'pointer-events-none cursor-default' : 'hover:cursor-pointer'
        )}
        onClick={onPrevious}
      >
        <KeyboardArrowLeft />
      </li>

      {paginationRange.map((pageNumber: number) => {
        if (pageNumber.toString() === DOTS) {
          return (
            <li
              key={pageNumber}
              className="relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] leading-[1.43] text-center tracking-[0.01071em] rounded-full hover:cursor-default"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={clsx(
              'relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] leading-[1.43] text-center tracking-[0.01071em] rounded-full',
              pageNumber === currentPage
                ? ' text-[#020617]  bg-gray-100'
                : 'hover:cursor-pointer'
            )}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={clsx(
          'relative flex justify-center items-center min-w-[32px] h-[32px] mx-[4px] px-3 text-[13px] leading-[1.43] text-center tracking-[0.01071em] rounded-full',
          currentPage === lastPage
            ? 'pointer-events-none cursor-default'
            : 'hover:cursor-pointer'
        )}
        onClick={onNext}
      >
        <KeyboardArrowRight />
      </li>
    </ul>
  );
};
