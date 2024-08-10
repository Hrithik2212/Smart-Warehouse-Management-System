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
                            <h6 className=''>{truck.truck_number}</h6>
                            <h6 className=''>{truck?.supervisor ? (truck.supervisor):('--')}</h6>
                            <h6 className=''>{truck?.email ? (truck.email):('--')}</h6>
                            <h6 className=''>{truck?.number ? (truck.number):('--')}</h6>
                            <h6 className=''>{new Date(truck.arrival).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</h6>
                            <h6 className=''>{truck.state}</h6>
                        </div>
            </div>
    </ExpandRow>
    
  )
}

export default Expand