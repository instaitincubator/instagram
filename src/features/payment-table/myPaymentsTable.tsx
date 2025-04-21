import React from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
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
  const { t } = useTranslation()

  return (
    <div className="overflow-x-auto">
      <div className="hidden md:block">
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

      <div className="flex flex-col md:hidden w-full pr-[15px] m-auto">
        {payments?.map((payment, index) => (
          <div
            className="p-4 border rounded border-dark-300 last:border-b-0 bg-dark-500 mt-[6px] w-full"
            key={index}
          >
            <div className="flex justify-between mt-3">
              {t.myPayment.dateOfPayment}
              <span>{new Date(payment.dateOfPayment).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between mt-3">
              {t.myPayment.endDateOfSubscription}
              <span>{new Date(payment.endDateOfSubscription).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex justify-between mt-3">
              {t.myPayment.price}
              <span>{formatPrice(payment.price)}</span>
            </div>
            <div className="flex justify-between mt-3">
              {t.myPayment.subscriptionType}
              <span>{payment.subscriptionType}</span>
            </div>
            <div className="flex justify-between mt-3">
              {t.myPayment.paymentType}
              <span>{payment.paymentType}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
