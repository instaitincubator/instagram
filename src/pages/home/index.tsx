
import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar'



import { Pagination } from '@/shared/ui/pagination/Pagination'
import { useGlobalPagination } from '@/shared/ui/pagination/useGlobalPagination';

const range = (start: number, end: number) => {
  const length = end - start + 1
  //skzbic minchev verch  i guimarin ara plus 1 vor arag gna et -i mer length - a data-i

  return Array.from({ length }, (_, idx) => idx + start)
}





const data = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })); 
console.log(data,'sas');


  
export const Home = () => {



const PageSize:number = 10;


const {handlePageChange,currentData,totalPages ,currentPage}= useGlobalPagination({data,    pageSize: PageSize,})





{currentData.map((item)=>(
  <div>{item.name}</div>
))}




// className,
// currentPage,
// onChange,
// pageSize,
// siblings,
// totalCount,


  return (
    <div>
  
  

      <Pagination className="relative top-10 -right-10 flex" currentPage={currentPage} onChange={handlePageChange} pageSize={0} totalCount={totalPages *PageSize} />
{/* {data2.data1. tota} */}
    </div>
  )
}

Home.getLayout = getLayoutWithSidebar
export default Home
