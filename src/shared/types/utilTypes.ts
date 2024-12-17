export type PaginationParams = {
  currentPage: number | string
  onPageChange: (page: number | string) => void
  onPageSizeChange: (value: number | string) => void
  pageSize: number | string
  siblingCount: number
  totalCount: number | undefined
}
