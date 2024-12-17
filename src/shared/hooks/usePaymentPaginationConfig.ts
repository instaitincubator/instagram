import { useEffect, useState } from 'react'

import { Payments } from '@/shared/types/ApiTypes/SubscriptionApiTypes'

interface PaymentConfig {
  payments?: Payments[]
}
export const usePaymentPaginationConfig = ({ payments }: PaymentConfig) => {
  const [currentPage, setCurrentPage] = useState<number | string>(1)
  const [pageSize, setPageSize] = useState<number | string>(5)

  const numericCurrentPage = typeof currentPage === 'number' ? currentPage : Number(currentPage)
  const indexOfLastPayment = numericCurrentPage * Number(pageSize)
  const indexOfFirstPayment = indexOfLastPayment - Number(pageSize)

  const currentPayments = payments?.slice(indexOfFirstPayment, indexOfLastPayment)
  const totalCount = payments?.length

  useEffect(() => {
    setCurrentPage(1)
  }, [pageSize])

  return { currentPage, currentPayments, pageSize, setCurrentPage, setPageSize, totalCount }
}
