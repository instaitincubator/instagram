export type PaginationParams = {
  currentPage: number | string
  onPageChange: (page: number | string) => void
  pageSize: number
  siblingCount: number
  totalCount: number
}
