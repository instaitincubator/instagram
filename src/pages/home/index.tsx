
import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { Table } from '@/shared/ui/Table/TableRoot'
import { Column, Sort } from '@/shared/ui/Table/types'
import data from './data/mockData.json' // Import the mock data
import React, { useMemo, useState } from 'react'
import { Pagination } from '@/shared/ui/pagination'
import s from './myPayment.module.css'





const PageSize = 10;

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / PageSize)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize

    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    //cikla 1.ete ka tex galu tox mi mi agam arag ga  ,2.ete ete tex chka galu toxa ereva uxaki  totalPages-y
    if (page < 1) {
      setCurrentPage(1) // Set to the first page
    } else if (page > totalPages) {
      setCurrentPage(totalPages) // Set to the last page
    } else {
      setCurrentPage(page)
    }
  }



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
          {currentTableData.map((item, index) => (
            <Table.TableRow>

              <Table.TableCell>{item.DateOfPayment}</Table.TableCell>
              <Table.TableCell>{item.EndDateSubscription}</Table.TableCell>
              <Table.TableCell>{item.Price} </Table.TableCell>

              <Table.TableCell>{item.SubscriptionType}</Table.TableCell>
              <Table.TableCell>{item.PaymentType}</Table.TableCell>
            </Table.TableRow>

          ))}

        </Table.TableBody>
      </Table.TableRoot>

      <Pagination  className={s.paginationBar} currentPage={currentPage} onChange={handlePageChange} pageSize={0} totalCount={totalPages}/>
    </div>
  )
}

Home.getLayout = getLayoutWithSidebar
export default Home
