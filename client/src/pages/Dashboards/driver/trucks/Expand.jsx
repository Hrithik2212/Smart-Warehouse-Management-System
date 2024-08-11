import React, { useState } from 'react'
import ExpandRow from '../../../../components/table/ExpandRow'
import DropDown from '../../../../components/dropDown/DropDown'
import { Link } from 'react-router-dom'
const Expand = ({truck}) => {
  const [request,setRequest]=useState(false)
  const [choice,setChoice]=useState("Dropdown")
  const data=["Damage","Assign"]
  return (
    <ExpandRow>
            <div className='flex justify-between  md:justify-center items-center mx-auto gap-5 md:gap-20 w-[90%] md:w-[60%]  '>
                        
                            <div className='w-full  whitespace-nowrap'>
                                <h2 >Truck Number</h2>
                                <h2 >Driver</h2>
                                <h2>Supervisor</h2>
                                <h2>Email</h2>
                                <h2>Contact</h2>
                                <h2>Arrival Time</h2>
                                <h2>Priority</h2>
                                <h2>State</h2>
                            </div>
                            <div className='w-full whitespace-nowrap max-md:text-right'>
                                <h6 className=''>{truck.truck_number}</h6>
                                <h6>{truck.driver}</h6>
                                <h6 className=''>{truck?.manager ? (truck.manager):('--')}</h6>
                                <h6 className=''>{truck?.email ? (truck.email):('--')}</h6>
                                <h6 className=''>{truck?.number ? (truck.number):('--')}</h6>
                                <h6 className=''>{truck?.arrival ? (new Date(truck.arrival).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                                <h6 className=''>{truck.priority_level}</h6>
                                <h6 className=''>{truck.state}</h6>
                            </div>
                      
                        
            </div>
            <div className='flex md:flex-col gap-3 justify-end z-0 relative'>
                      <Link to={`?info=true`} className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)] max-md:mx-auto py-3 px-6 text-center rounded-md'>Invoice</Link>
            </div>
    </ExpandRow>
    
  )
}

export default Expand