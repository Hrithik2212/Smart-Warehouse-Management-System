import React, { useEffect, useState } from 'react'
import TableOutLet from '../../../../components/table/TableOutLet'
import TruckTable from './TruckTable'
import { useSearchParams } from 'react-router-dom';
import InfoTable from './infoTable/InfoTable';
const Trucks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const info = searchParams.get('info');

  
  

 
  const [shoeMore,setShowMore]=useState(false)

  
    

  
  return (
    <div className='w-full max-md:mt-10'>
        
    
        <TableOutLet>
                {info==="true" ?(
                  <InfoTable />
                ):(
                  <TruckTable />
                  )}
        </TableOutLet>
      </div>

  )
}

export default Trucks