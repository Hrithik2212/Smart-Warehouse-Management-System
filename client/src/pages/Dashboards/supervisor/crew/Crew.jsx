import React, { useContext, useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import TableOutLet from '../../../../components/table/TableOutLet'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import useFetch from '../../../../hooks/useFetch'
import RadioButtonGroup from '../../../../components/checkBox/CheckBox'
import AuthContext from '@/context/AuthContext'

const Crew = () => {

    const {authToken}=useContext(AuthContext)
    const {data,loading,error}=useFetch("getassignedtrucks",authToken.access_token)
    console.log(data)
    const [filteredData,setFilteredData]=useState([])

    const [showDetails,setShowDetails]=useState(0)
    const [selectedOption, setSelectedOption] = useState('');
  
    const changeDetails = (index)=>{
          if(showDetails===index){
              setShowDetails(null);
          }
          else{
              setShowDetails(index);
          }
      }
      useEffect(()=>{
          if (selectedOption) {
              setFilteredData(data?.filter((item) => item?.truck?.state === selectedOption));
            } else {
              setFilteredData(data);
            }
      },[selectedOption,data])
  
 
    return (
      <div className='w-full'>

      
          <TableOutLet>
                  
                  <div className='w-full border-collapse text-center '>
                  <TableHead>
                              <h2 className='w-full'>Dock</h2>
                              <h2 className='w-full'>Truck Number</h2>
                              <h2 className=" w-full ">Crew Size</h2>
                              <h2 className='w-full  max-lg:hidden'>Arrival Time</h2>
                              <h2 className='w-full max-lg:hidden'>Priority</h2>
                  </TableHead>
                      {(!data || data.length === 0) && (<div className='p-5'>No Crew Assigned</div>)}
                          {filteredData?.map((truck,index)=>(
                              <div key={index} className=''>
                                <div onClick={()=>changeDetails(truck.id)}>
                                    <Card index={index}>
                                            <h6 className='w-full '>{truck?.docks_id ? (truck.docks_id):"--"}</h6>
                                            <h6 className='flex text-center   w-full justify-center items-center' >{truck.truck.truck_number}</h6>
                                            <h6 className=' text-center  w-full '>{truck?.employees ? (truck.employees?.length):('--')}</h6>
                                            <h6 className=' w-full text-center max-lg:hidden'>{truck?.truck?.arrival_time ? (new Date(truck.truck.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                                            <h6 className=' w-full max-lg:hidden'>{truck.truck.truck_priority}</h6>
                                    </Card>
                              </div>
                                  
                                  {showDetails === truck.id && (
                                          <Expand truck={truck}/>
                                          
                                  )}
                              </div>
                          ))}
                      </div>
          </TableOutLet>
        </div>
  
    )
  }

export default Crew