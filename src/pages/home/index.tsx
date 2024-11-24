
import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'



import { Pagination } from '@/shared/ui/pagination/Pagination'
import { useGlobalPagination } from '@/shared/ui/pagination/useGlobalPagination';





const data = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })); // Example data


export const Home = () => {


const PageSize:number = 10;


const {handlePageChange,currentData,totalPages ,currentPage}= useGlobalPagination({data,    pageSize: PageSize,
})


{currentData.map((item)=>(
  <div>{item.name}</div>
))}


  return (
    <div>
  
      <Pagination className="relative top-10 -right-10 flex" currentPage={currentPage} onChange={handlePageChange} pageSize={0} totalCount={totalPages *PageSize} />
 
    </div>
  )
}

Home.getLayout = getLayoutWithSidebar
export default Home
