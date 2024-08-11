import React, { useEffect, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import TableOutLet from '../../../../components/table/TableOutLet'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import useFetch from '../../../../hooks/useFetch'
import RadioButtonGroup from '../../../../components/checkBox/CheckBox'

const Employee = () => {

  const {data,loading,error}=useFetch("/employee.json")
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
      setUser(data?.info)
  },[data])
  return (
    <div className='w-full max-md:mt-10'>
    
        <TableOutLet>
                
                <div className='w-full border-collapse text-center '>
                <TableHead>
                            <h2 className='w-full'>Name</h2>
                            <h2 className='w-full max-lg:hidden'>Email</h2>
                            <h2 className="w-full">Role</h2>
                            <h2 className='w-full'>Gender</h2>
                            
                </TableHead>
                        {data?.map((employee,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(index)}>
                                  <Card   index={index}>
                                          <h6 className='w-full'>{employee?.Name}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{employee.Email}</h6>
                                          <h6 className=' text-center  w-full'>{employee?.EmploymentType}</h6>
                                          <h6 className=' w-full text-center '>{employee?.Gender}</h6>
                                         
                                  </Card>
                              </div>
                                {showDetails === index && (
                                        <Expand employee={employee}/>
                                        
                                )}
                            </div>
                        ))}
                    </div>
        </TableOutLet>
      </div>

  )
}

export default Employee