import React from 'react'
import './index.css'
import { CiDeliveryTruck } from "react-icons/ci";
import SlideBar from '../../../components/sideBar/SideBar'
import { VscHistory } from "react-icons/vsc";
import {  useParams } from 'react-router-dom';
import Trucks from './trucks/Trucks';
import History from './history/History';



const DriverDashboard = () => {




  const {page}=useParams()
  const activePage = page || '';


  const sideBarData={
    "head":"Driver",
    "children":[
      {
        "title":"Trucks",
        "label":<CiDeliveryTruck size={30}/>,
        "path":""
      },
      {
        "title":"History",
        "label":<VscHistory size={25}/>,
        "path":"history"
      },
      
    ],
  }

  return (
    <div className=' flex  h-fit' style={{"fontSize":"var(--text-font-size)"}} >
      <SlideBar sideBarData={sideBarData}  activePage={activePage}/>
      <section className='w-full  flex md:justify-between max-md:flex-col'>
         
        
          <div className='w-full h-fit max-md:order-2'>
            {activePage==='' && (<Trucks />)}
            {activePage==='history' && (<History />)}
          </div>
            
                        
            
        </section>
        
    </div>
  )
}

export default DriverDashboard