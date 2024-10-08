import React from 'react'
import TableOutLet from '../../../../components/table/TableOutLet'
import TruckTable from './TruckTable'
import { useSearchParams } from 'react-router-dom';
import InfoTable from './infoTable/InfoTable';
const Trucks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const info = searchParams.get('info');


  
    

  
  return (
    <div className='w-full max-md:mt-5'>
        
    
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