import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { MyPaymentsTable } from '@/features/payment-table/myPaymentsTable'
import { useGetPaymentsQuery } from '@/services/payments/PaymentsApi'
import { usePaymentPaginationConfig } from '@/shared/hooks/usePaymentPaginationConfig'
import { useTableConfig } from '@/shared/hooks/useTableConfig'
import Pagination from '@/shared/ui/pagination/Pagination'

const MyPayments = () => {
  const { data: payments } = useGetPaymentsQuery()
  const { columns, formatPrice, setSort, sort } = useTableConfig()

  const { currentPage, currentPayments, pageSize, setCurrentPage, setPageSize, totalCount } =
    usePaymentPaginationConfig({
      payments,
    })

  return (
    <div className="flex flex-col gap-8">
      <MyPaymentsTable
        columns={columns}
        currentPage={currentPage}
        formatPrice={formatPrice}
        pageSize={pageSize}
        payments={currentPayments}
        setSort={setSort}
        sort={sort}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={value => setPageSize(value)}
        pageSize={pageSize}
        siblingCount={1}
        totalCount={totalCount}
      />
    </div>
  )
}

MyPayments.getLayout = getSettingsLayout
export default MyPayments
