import React, { useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import TableOutLet from '../../../../components/table/TableOutLet'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import useFetch from '../../../../hooks/useFetch'
import RadioButtonGroup from '../../../../components/checkBox/CheckBox'
const Trucks = () => {

  const {data,loading,error}=useFetch("/data.json")
  const [filteredData,setFilteredData]=useState([])
  const [user,setUser]=useState(null)
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
            setFilteredData(data?.data.filter((item) => item.state === selectedOption));
          } else {
            setFilteredData(data?.data);
          }
    },[selectedOption,data])

  useEffect(()=>{
      setUser(data?.info)
  },[data])
  return (
    <div className='w-full max-md:mt-10'>
        <RadioButtonGroup selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
    
        <TableOutLet>
                
                <div className='w-full border-collapse text-center '>
                <TableHead>
                            <h2 className='w-full'>Dock</h2>
                            <h2 className='w-full max-lg:hidden'>Truck Number</h2>
                            <h2 className="w-full">Supervisor</h2>
                            <h2 className='w-full'>Arrival Time</h2>
                            
                </TableHead>
                        {filteredData?.map((truck,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(truck.id)}>
                                  <Card   index={index}>
                                          <h6 className='w-full'>{truck?.dock ? (truck.dock):"--"}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{truck.truck_number}</h6>
                                          <h6 className='text-center  w-full '>{truck?.supervisor ? (truck.supervisor):("--")}</h6>
                                          <h6 className=' w-full text-center '>{new Date(truck.arrival).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</h6>
                                         
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

export default Trucks