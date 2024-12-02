import React, { useState } from 'react'

import { getSettingsLayout } from '@/app/layouts/settingsLayout/SettingsLayout'
import { useGetPaymentsQuery } from '@/services/payments/PaymentsApi'
import { Payments } from '@/shared/types/ApiTypes/SubscriptionApiTypes'
import { Table } from '@/shared/ui/Table/TableRoot'
import { Column, Sort } from '@/shared/ui/Table/types'

const MyPayments = () => {
  const [sort, setSort] = useState<Sort>({ direction: 'asc', key: 'cardsCount' })
  const { data } = useGetPaymentsQuery()
  const columns: Column[] = [
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

  return (
    <div className="w-full overflow-x-auto">
      <Table.TableRoot>
        <Table.TableHeader columns={columns} onSort={setSort} sort={sort} />
        <Table.TableBody>
          {data?.map((payment: Payments) => (
            <Table.TableRow key={payment.subscriptionId}>
              <Table.TableCell>
                {new Date(payment.dateOfPayment).toLocaleDateString('ru-RU')}
              </Table.TableCell>
              <Table.TableCell>
                {new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU')}
              </Table.TableCell>
              <Table.TableCell>{payment.price}</Table.TableCell>
              <Table.TableCell>{payment.subscriptionType}</Table.TableCell>
              <Table.TableCell>{payment.paymentType}</Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.TableRoot>
    </div>
  )
}

MyPayments.getLayout = getSettingsLayout
export default MyPayments
