import { getLayoutWithSidebar } from '@/app/layouts/layoutWithSidebar/LayoutWithSidebar';
import { Pagination } from '@/shared/ui/pagination/Pagination';
// import React from 'react';
import React, { useState } from 'react';

// const data = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   name: `Item 2222${i + 1}`,
// }));




const data =Array.from({length:100} ,(_,i)=>({
  
  id:i+2,
  name:`itemT  ${i +1}`

}))


export const Home = () => {
  const pageSize = 10;

  const [visibleData, setVisibleData] = useState(data.slice(0,pageSize))



  return (  
    
      <div>
        {visibleData.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}

          
      
  

<Pagination
        className="relative top-10 -right-10 flex"
        data={data}
        pageSize={pageSize}
        onDataChange={(currentData) => setVisibleData(currentData)}

      />

    </div>
  );
};

Home.getLayout = getLayoutWithSidebar;
export default Home;
