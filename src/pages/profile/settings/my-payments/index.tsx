import React from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useTableConfig } from '@/pages/profile/settings/my-payments/useTableConfig'
import { useGetPaymentsQuery } from '@/services/payments/PaymentsApi'
import { Table } from '@/shared/ui/Table/TableRoot'

const MyPayments = () => {
  const { data: payments } = useGetPaymentsQuery()
  const { columns, formatPrice, setSort, sort } = useTableConfig()

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full overflow-x-auto">
        <Table.TableRoot>
          <Table.TableHeader columns={columns} onSort={setSort} sort={sort} />
          <Table.TableBody>
            {payments?.map((payment, index) => (
              <Table.TableRow key={index}>
                <Table.TableCell>
                  {new Date(payment.dateOfPayment).toLocaleDateString('ru-RU')}
                </Table.TableCell>
                <Table.TableCell>
                  {new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU')}
                </Table.TableCell>
                <Table.TableCell>{formatPrice(payment.price)}</Table.TableCell>
                <Table.TableCell>{payment.subscriptionType}</Table.TableCell>
                <Table.TableCell>{payment.paymentType}</Table.TableCell>
              </Table.TableRow>
            ))}
          </Table.TableBody>
        </Table.TableRoot>
      </div>
      <div>{/*<Pagination currentPage={10} pageSize={10} totalCount={20} />*/}</div>
    </div>
  )
}

MyPayments.getLayout = getSettingsLayout
export default MyPayments
