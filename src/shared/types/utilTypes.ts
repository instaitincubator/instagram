export type PaginationParams = {
  currentPage: number | string
  onPageChange: (page: number | string) => void
  onPageSizeChange: (value: any) => void
  pageSize: number
  siblingCount: number
  totalCount: number | undefined
}
