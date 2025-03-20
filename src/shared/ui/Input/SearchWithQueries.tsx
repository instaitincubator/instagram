import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from '@/shared/ui/Input/Input'
import { useRouter } from 'next/router'

const SearchWithQueries = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(
    router.query.searchTerm ? router.query.searchTerm : ''
  )

  const changeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    if (searchInput) {
      const handler = setTimeout(() => {
        void router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            searchTerm: searchInput,
          },
        })
      }, 500)

      return () => clearTimeout(handler)
    } else {
      const oldQueries = { ...router.query }

      delete oldQueries.searchTerm
      const handler = setTimeout(() => {
        void router.push({
          pathname: router.pathname,
          query: {
            ...oldQueries,
          },
        })
      }, 500)

      return () => clearTimeout(handler)
    }
  }, [searchInput])

  return (
    <Input
      fullWidth
      onChange={changeSearchString}
      placeholder={placeholder}
      type="search"
      value={searchInput}
    />
  )
}

export default SearchWithQueries
