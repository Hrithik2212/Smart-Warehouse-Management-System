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
  const {data,loading,error}=useFetch("getalldocks/",authToken.access_token)
  

    const [showDetails,setShowDetails]=useState(null)

  
    const changeDetails = (index)=>{
          if(showDetails===index){
              setShowDetails(null);
          }
          else{
              setShowDetails(index);
          }
      }

  
    return (
      <div className='w-full'>

      
          <TableOutLet>
                  
                  <div className='w-full border-collapse text-center '>
                  <TableHead>
                              <h2 className='w-full'>Dock</h2>
                              <h2 className='w-full '>Truck Number</h2>
                              <h2 className=" w-full ">Supervisor</h2>
                              <h2 className='w-full max-lg:hidden'>Arrival Time</h2>
                              <h2 className='w-full max-lg:hidden'>Priority</h2>
                  </TableHead>
                          {data?.map((truck,index)=>(
                              <div key={index} className=''>
                                <div onClick={()=>changeDetails(index)}>
                                    <Card index={index}>
                                            <h6 className='w-full'>{truck?.docks_id ? (truck.docks_id):"--"}</h6>
                                            <h6 className='flex text-center   w-full justify-center items-center' >{truck?.truck ? (truck.truck.truck_number):("--")}</h6>
                                            <h6 className='m text-center  w-full '>{
                                              truck?.employees ? (truck.employees
                                              ?.filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.name
                                                ):("--")}</h6>
                                            <h6 className=' w-full text-center max-lg:hidden'>{truck?.truck?.arrival_time ? (new Date(truck?.truck.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                                            <h6 className=' w-full max-lg:hidden'>{truck?.truck?.truck_priority}</h6>
                                    </Card>
                              </div>
                                  
                                  {showDetails === index && (
                                          truck?.employees ? (<Expand truck={truck}/>):(<h2>No Crew Assigned</h2>)
                                          
                                  )}
                              </div>
                          ))}
                      </div>
          </TableOutLet>
        </div>
  
    )
  }

export default Crew