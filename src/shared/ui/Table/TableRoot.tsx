import { ComponentProps } from 'react'

import {
  HeadCellProps,
  HeadProps,
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TableRowProps,
} from '@/shared/ui/Table/types'

export type TableProps = ComponentProps<'table'>

export const TableRoot = (props: TableProps) => {
  const { className, ...res } = props

  return <table className="flex flex-col w-full p-4 min-w-[1250px] " {...res} />
}

export const TableBody = (props: TableBodyProps) => {
  const { className, ...res } = props

  return <tbody className="overflow-x-auto" {...res} />
}

export const TableHead = (props: TableHeadProps) => {
  const { className, ...res } = props

  return <thead className="flex w-full bg-dark-500 min-h-[48px] items-center" {...res} />
}

export const TableRow = (props: TableRowProps) => {
  const { className, ...res } = props

  return (
    <tr
      className="flex w-full items-center px-4 justify-between min-h-[48px] border border-dark-500 border-b-1 border-x-1"
      {...res}
    />
  )
}

export const TableCell = (props: TableCellProps) => {
  const { className, ...res } = props

  return <td className="flex flex-1 items-center h-full" {...res} />
}
export const HeadCell = (props: HeadCellProps) => {
  const { children, className, ...res } = props

  return (
    <th className="flex flex-1" {...res}>
      <span className="whitespace-nowrap">{children}</span>
    </th>
  )
}

const TableHeader = ({ columns, onSort, sort, ...res }: HeadProps) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  const columnsMap = (
    <TableRow>
      {columns.map(({ key, sortable, title }) => {
        return (
          <HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>
            {title}
          </HeadCell>
        )
      })}
    </TableRow>
  )

  return <TableHead {...res}>{columnsMap}</TableHead>
}

export const Table = {
  HeadCell,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
}
