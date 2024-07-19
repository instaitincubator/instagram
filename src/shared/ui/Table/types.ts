import { ComponentProps } from 'react'

export type Column = {
  key: string
  sortable?: boolean
  title: string
}
export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type HeadProps = {
  columns: Column[]
  onSort?: (sort: Sort) => void
  sort?: Sort
}

export type HeadCellProps = {
  sortable?: boolean
} & ComponentProps<'th'>

export type TableCellProps = ComponentProps<'td'>
export type TableBodyProps = ComponentProps<'tbody'>
export type TableHeadProps = ComponentProps<'thead'>
export type TableRowProps = ComponentProps<'tr'>
