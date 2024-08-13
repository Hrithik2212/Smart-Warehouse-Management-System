import React, { useContext, useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import useFetch from '../../../../hooks/useFetch'
import RadioButtonGroup from '../../../../components/checkBox/CheckBox'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import AuthContext from '@/context/AuthContext'

const TruckTable = () => {
    const {authToken}=useContext(AuthContext)
    const {data,loading,error}=useFetch("getassignedtrucks",authToken.access_token)
    console.log(data)
    const [filteredData,setFilteredData]=useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [showDetails,setShowDetails]=useState(0)

    useEffect(()=>{
        if (selectedOption) {
            setFilteredData(data?.filter((item) => item?.truck?.state === selectedOption));
          } else {
            setFilteredData(data);
          }
    },[selectedOption,data])

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
                <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                <TableHead>
                            <h2 className='w-full'>Dock</h2>
                            <h2 className='w-full max-lg:hidden'>Truck Number</h2>
                            <h2 className="max-lg:hidden w-full">Manager</h2>
                            <h2 className='w-full'>Arrival Time</h2>
                            
                            <h2 className='w-full'>Priority</h2>
                </TableHead>
                      {(!data || data.length === 0) && (<div className='p-5'>No Trucks Assigned</div>)}
                        {filteredData?.map((truck,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(truck.id)}>
                                  <Card   index={index}>
                                          <h6 className='w-full '>{truck?.docks_id ? (truck.docks_id):"--"}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{truck.truck.truck_number}</h6>
                                          <h6 className='max-lg:hidden text-center  w-full'>{
                                              (truck.employees && truck.employees.length>0)  ? (truck.employees
                                              .filter(
                                                  (item)=> item.employment_type==="manager")[0]?.name
                                                ):("--")}</h6>
                                          <h6 className=' w-full text-center '>{truck?.truck?.arrival_time ? (new Date(truck.truck.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                                          <h6 className=' w-full'>{truck.truck.truck_priority}</h6>
                                  </Card>
                              </div>
                                {showDetails === truck.id && (
                                  
                                        <Expand truck={truck}/>
                                        
                                )}
                            </div>
                        ))}
    </div>
  )
}

export default TruckTable