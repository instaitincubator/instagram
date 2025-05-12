import { useState } from 'react'

import { Sort } from '@/shared/ui/Table/types'

export const useTableConfig = () => {
  const [sort, setSort] = useState<Sort>({ direction: 'asc', key: 'cardsCount' })
  const columns = [
    {
      key: 'Date of Payment',
      sortable: true,
      title: 'Date of Payment',
    },
    {
      key: 'End date of subscription',
      sortable: true,
      title: 'End date of subscription',
    },
    {
      key: 'Price',
      sortable: true,
      title: 'Price',
    },
    {
      key: 'Subscription Type',
      sortable: true,
      title: 'Subscription Type',
    },
    {
      key: 'Payment Type',
      sortable: false,
      title: 'Payment Type',
    },
  ]

  const formatPrice = (price: number) => {
    switch (price) {
      case 10000:
        return '$100'
      case 5000:
        return '$50'
      case 1000:
        return '$10'
      default:
        return `$${(price / 100).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        })}`
    }
  }

  return { columns, formatPrice, setSort, sort }
}
