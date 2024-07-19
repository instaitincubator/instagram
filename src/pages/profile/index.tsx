import { useState } from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/LayoutWithSidebar/LayoutWithSidebar'
import { Table } from '@/shared/ui/Table/TableRoot'
import { Column, Sort } from '@/shared/ui/Table/types'

const Profile = () => {
  const [sort, setSort] = useState<Sort>({ direction: 'asc', key: 'cardsCount' })
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
          <Table.TableRow>
            <Table.TableCell>дата</Table.TableCell>
            <Table.TableCell>конец даты</Table.TableCell>
            <Table.TableCell>цена</Table.TableCell>
            <Table.TableCell>чот там</Table.TableCell>
            <Table.TableCell>тип оплаты</Table.TableCell>
          </Table.TableRow>
        </Table.TableBody>
      </Table.TableRoot>
    </div>
  )
}

Profile.getLayout = getLayoutWithSidebar
export default Profile
