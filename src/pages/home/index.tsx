import React from 'react'

import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'
import { Pagination } from '@/shared/ui/pagination/Pagination'

export const Home = () => {
  return (
    <div>
      <Pagination currentPage={1} pageSize={10} siblings={1} totalCount={150} />
    </div>
  )
}

Home.getLayout = getLayoutWithSidebar
export default Home
