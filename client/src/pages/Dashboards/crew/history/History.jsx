import React, { useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import TableOutLet from '../../../../components/table/TableOutLet'
import Card from '../../../../components/card/Card'
import Expand from './Expand'


const History = () => {
    const [data,setData]=useState(null)
    const [showDetails,setShowDetails]=useState(null)
  
    const changeDetails = (index)=>{
          if(showDetails===index){
              setShowDetails(null);
          }
          else{
              setShowDetails(index);
          }
      }
    useEffect(()=>{
        const fetchdata = async() =>{
            const response=await fetch("/data.json")
            setData(await response.json())
        }
        fetchdata()

    },[])
    return (
        <TableOutLet>
                
                <div className='w-full border-collapse text-center '>
                <TableHead>
                            <h2 className='w-full'>Dock</h2>
                            <h2 className='w-full max-lg:hidden'>Truck Number</h2>
                            <h2 className="w-full">Supervisor</h2>
                            <h2 className='w-full'>Arrival Time</h2>
                            
                </TableHead>
                        {data?.data?.map((truck,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(index)}>
                                  <Card   index={index}>
                                          <h6 className='w-full'>{truck?.dock ? (truck.dock):"--"}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{truck.truck_number}</h6>
                                          <h6 className='text-center  w-full '>{truck?.supervisor ? (truck.supervisor):("--")}</h6>
                                          <h6 className=' w-full text-center '>{new Date(truck.arrival).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</h6>
                                         
                                  </Card>
                              </div>
                                {showDetails === index && (
                                        <Expand truck={truck}/>
                                        
                                )}
                            </div>
                        ))}
                    </div>
        </TableOutLet>
    )
}

export default History