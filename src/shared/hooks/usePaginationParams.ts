import { useEffect, useState } from 'react'

import { defaultPaginationParams } from '@/shared/hooks/CONSTS'
import { useRouter } from 'next/router'

export const usePaginationParams = () => {
  const router = useRouter()

  const [paginationParams, setPaginationParams] = useState(defaultPaginationParams)

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      pageNumber: router.query.pageNumber ? Number(router.query.pageNumber) : 1,
      pageSize: router.query.pageSize ? Number(router.query.pageSize) : 10,
      search: router.query.searchTerm ? (router.query.searchTerm as string) : '',
    })
  }, [router])

  const sortHandler = (e: { direction: 'asc' | 'desc'; key: string }) => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sortBy: e.key,
        sortDirection: e.direction,
      },
    })
  }

  return {
    paginationParams,
    setPaginationParams,
    sortHandler,
  }
}
