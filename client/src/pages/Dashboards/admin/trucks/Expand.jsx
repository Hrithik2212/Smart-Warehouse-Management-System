import React from 'react'
import ExpandRow from '../../../../components/table/ExpandRow'
const Expand = ({truck}) => {
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
                            <h2>Crew Size</h2>
                            <h2>Priority</h2>
                            <h2>State</h2>
                        </div>
                        <div className='w-full whitespace-nowrap max-md:text-right'>
                            <h6 className=''>{truck?.truck_number}</h6>
                            <h6>{truck.driver.name}</h6>
                            <h6 className=''>{
                                              truck?.dock?.employees.length>0 ? (truck.dock?.employees
                                              ?.filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.name
                                                ):("--")}</h6>
                            <h6 className=''>{
                                              truck?.dock?.employees.length>0 ? (truck.dock?.employees
                                              ?.filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.email
                                                ):("--")}</h6>
                            <h6 className=''>{
                                              truck?.dock?.employees.length>0 ? (truck.dock?.employees
                                              ?.filter(
                                                  (item)=> item.employment_type==="supervisor")[0]?.mobile
                                                ):("--")}</h6>
                            <h6 className=''>{truck?.arrival_time ? (new Date(truck?.arrival_time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })):("--")}</h6>
                            <h6 className=''>{truck?.dock?.employees.length>0 ? (truck.dock?.employees?.length):('--')}</h6>
                            <h6 className=''>{truck.truck_priority}</h6>
                            <h6 className=''>{truck.state}</h6>
                        </div>
            </div>

    </ExpandRow>
    
  )
}

export default Expand