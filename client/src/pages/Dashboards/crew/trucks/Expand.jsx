import React from 'react'
import ExpandRow from '../../../../components/table/ExpandRow'
const Expand = ({truck}) => {
  return (
    <ExpandRow>
            <div className='flex justify-between  md:justify-center items-center mx-auto gap-5 md:gap-20 w-[90%] md:w-[60%]  '>
                        <div className='w-full  whitespace-nowrap'>
                            <h2 >Truck Number</h2>
                            <h2>Supervisor</h2>
                            <h2>Email</h2>
                            <h2>Contact</h2>
                            <h2>Arrival Time</h2>
                            <h2>State</h2>
                        </div>
                        <div className='w-full whitespace-nowrap max-md:text-right'>
                            <h6 className=''>{truck.truck.truck_number}</h6>
                            <h6 className=''>{
                                              (truck.employees && truck.employees.length>0)  ? (truck.employees
                                              .filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.name
                                                ):("--")}</h6>
                            <h6 className=''>{
                                              (truck.employees && truck.employees.length>0)  ? (truck.employees
                                              .filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.email
                                                ):("--")}</h6>
                            <h6 className=''>{
                                              (truck.employees && truck.employees.length>0)  ? (truck.employees
                                              .filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.mobile
                                                ):("--")}</h6>
                            <h6 className=''>{truck?.truck?.arrival_time ? (new Date(truck.truck.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                            <h6 className=''>{truck.truck.state}</h6>
                        </div>
            </div>
            <div className='flex flex-col justify-end z-0 relative'>
                        <button className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)] max-md:mx-auto py-3 px-6 rounded-md'>Raise Request</button>
            </div>
    </ExpandRow>
    
  )
}

export default Expand