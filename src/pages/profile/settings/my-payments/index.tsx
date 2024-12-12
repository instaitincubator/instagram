import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { MyPaymentsTable } from '@/pages/profile/settings/my-payments/myPaymentsTable'
import { useGetPaymentsQuery } from '@/services/payments/PaymentsApi'
import { useTableConfig } from '@/shared/hooks/useTableConfig'

const MyPayments = () => {
  const { data: payments } = useGetPaymentsQuery()
  const { columns, formatPrice, setSort, sort } = useTableConfig()

  return (
    <div className="flex flex-col gap-8">
      <MyPaymentsTable
        columns={columns}
        formatPrice={formatPrice}
        payments={payments}
        setSort={setSort}
        sort={sort}
      />
      <div>{/*<Pagination currentPage={10} pageSize={10} totalCount={20} />*/}</div>
    </div>
  )
}

MyPayments.getLayout = getSettingsLayout
export default MyPayments
