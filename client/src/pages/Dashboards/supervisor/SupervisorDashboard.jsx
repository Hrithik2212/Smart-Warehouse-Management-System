import React, { useState } from 'react'
import './index.css'
import SlideBar from '../../../components/sideBar/SideBar'
const SupervisorDashboard = () => {
  const [data,setData]=useState({
    "user":{
      "role":"supervisor",
      "name":"Padala T M Adi Venu Gopala Reddy"
    },
    "children":["Trucks","History"]
  })
  return (
    <div className='h-[200vh] flex'>
        <SlideBar children={data}/>
        <section>
            
        </section>
      SupervisorDashboard
    </div>
  )
}

export default SupervisorDashboard