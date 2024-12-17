import React from 'react'

import { Payment } from '@/shared/types/public.types'
import { Table } from '@/shared/ui/Table/TableRoot'
import { Column, Sort } from '@/shared/ui/Table/types'

interface Props {
  columns: Column[]
  currentPage: number | string
  formatPrice: (price: number) => string
  pageSize: number | string
  payments: Payment[] | undefined
  setSort: (sort: Sort) => void
  sort: Sort
}
export const MyPaymentsTable = ({ columns, formatPrice, payments, setSort, sort }: Props) => {
  return (
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
  )
}
