import React, { useContext, useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import TableOutLet from '../../../../components/table/TableOutLet'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import useFetch from '../../../../hooks/useFetch'
import RadioButtonGroup from '../../../../components/checkBox/CheckBox'
import AuthContext from '@/context/AuthContext'
const Trucks = () => {
  const {authToken}=useContext(AuthContext)
  const {data,loading,error}=useFetch("getalltruck/",authToken.access_token)
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
            setFilteredData(data?.filter((item) => item.state === selectedOption));
          } else {
            setFilteredData(data);
          }
    },[selectedOption,data])


  return (
    <div className='w-full max-md:mt-10'>
        <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
    
        <TableOutLet>
                
                <div className='w-full border-collapse text-center '>
                <TableHead>
                            <h2 className='w-full'>Dock</h2>
                            <h2 className='w-full max-lg:hidden'>Truck Number</h2>
                            <h2 className="max-lg:hidden w-full">Supervisor</h2>
                            <h2 className='w-full'>Arrival Time</h2>
                            
                            <h2 className='w-full'>Priority</h2>
                </TableHead>
                        {filteredData?.map((truck,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(truck.truck_number)}>
                                  <Card   index={index}>
                                          <h6 className='w-full'>{truck?.dock_assigned ? (truck.dock_assigned):"--"}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{truck?.truck_number}</h6>
                                          <h6 className='max-lg:hidden text-center  w-full'>{truck?.supervisor ? (truck.supervisor.name):("--")}</h6>
                                          <h6 className=' w-full text-center '>{truck?.arrival_time ? (new Date(truck?.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                                          <h6 className=' w-full'>{truck?.truck_priority}</h6>
                                  </Card>
                              </div>
                                {showDetails === truck.truck_number && (
                                        <Expand truck={truck}/>
                                        
                                )}
                            </div>
                        ))}
                    </div>
        </TableOutLet>
      </div>

  )
}

export default Trucks