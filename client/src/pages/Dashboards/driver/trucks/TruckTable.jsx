import React, { useContext, useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import useFetch from '../../../../hooks/useFetch'
import RadioButtonGroup from '../../../../components/checkBox/CheckBox'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import AuthContext from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const TruckTable = () => {
    const {authToken}=useContext(AuthContext)
    const {data,loading,error}=useFetch("gettruck/",authToken.access_token)

    console.log(data)
    const [showDetails,setShowDetails]=useState(0)





    const changeDetails = (index)=>{
        if(showDetails===index){
            setShowDetails(null);
        }
        else{
            setShowDetails(index);
        }
    }

  
  return (
    
    <div className='w-full border-collapse text-center '>
               
                <TableHead>
                            <h2 className='w-full'>Dock</h2>
                            <h2 className='w-full max-lg:hidden'>Truck Number</h2>
                            <h2 className="max-lg:hidden w-full">Supervisor</h2>
                            <h2 className='w-full'>Arrival Time</h2>
                            <h2 className='w-full'>Priority</h2>
                </TableHead>
                        {(!data || data.length === 0) && (<div className='p-5'>No Trucks Assigned</div>)}
                        {data?.map((truck,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(truck.truck_number)}>
                                  <Card   index={index}>
                                          <h6 className='w-full '>{truck?.dock ? (truck.dock.docks_id):"--"}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{truck.truck_number}</h6>
                                          <h6 className='max-lg:hidden text-center  w-full'>{
                                              truck.dock ? (truck.dock.employees
                                              .filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.name
                                                ):("--")}</h6>
                                          <h6 className=' w-full text-center '>{truck?.arrival_time ? (new Date(truck.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                                          <h6 className=' w-full'>{truck.truck_priority}</h6>
                                  </Card>
                              </div>
                                {showDetails === truck.truck_number && (
                                  
                                        <Expand truck={truck}/>
                                        
                                )}
                            </div>
                        ))}
                        <div className='flex md:flex-col gap-3 justify-center items-center p-2 z-0 relative'>
                                <Link to={`?info=true`} className='bg-[var(--primary-btn)] w-[200px] text-[var(--text-secondary-color)] max-md:mx-auto py-3 px-6 text-center rounded-md'>Available</Link>
                        </div>
    </div>
  )
}

export default TruckTable