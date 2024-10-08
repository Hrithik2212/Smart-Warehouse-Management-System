import React, { useContext } from 'react'
import ExpandRow from '../../../../components/table/ExpandRow'
import AuthContext from '../../../../context/AuthContext'
import BASE_URL from '../../../../utils/baseApi'
const Expand = ({truck}) => {
  const {authToken}=useContext(AuthContext)
  const handleSubmit = async () => {    

      try {
        const response = await fetch(BASE_URL+`employees/assign_crew/${truck.dock.docks_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json' 
            }
        });
        

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        alert("Crew will be assigned")

    } catch (err) {
        alert("Something went to wrong..")
        console.log(err)
    } 

  };
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
            <div className='flex flex-col justify-end z-0 relative'>
                        <button onClick={handleSubmit} className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)] max-md:mx-auto py-3 px-6 rounded-md'>Raise Request</button>
            </div>
    </ExpandRow>
    
  )
}

export default Expand