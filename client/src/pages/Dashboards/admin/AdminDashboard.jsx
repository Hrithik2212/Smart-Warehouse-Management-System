import React from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import SlideBar from '../../../components/sideBar/SideBar'
import { useParams } from 'react-router-dom';
import { SlPeople } from "react-icons/sl";
import EmployeeForm from '../../../components/forms/EmployeeForm';
import Trucks from './trucks/Trucks'
import Employee from './Employee/Employee';
import { IoIosPersonAdd } from "react-icons/io";
import Progress from '../../../components/progress/Progress';
import { BsGraphUpArrow } from "react-icons/bs";
import Analytics from '@/pages/Analytics/Analytics';

const AdminDashboard = () =>  {


  const {page}=useParams()
  const activePage = page || '';

  
    const sideBarData={
        "head":"Admin",
      "children":[
        {
            "title":"Trucks",
            "label":<CiDeliveryTruck size={30}/>,
            "path":""
        },

        {
          "title":"Add Employee",
          "label":<IoIosPersonAdd size={25}/>,
          "path":"addemployee"
        },
        {
          "title":"Employees",
          "label":<SlPeople size={25}/>,
          "path":"employees"
        },
        {
          "title":"Analytics",
          "label":<BsGraphUpArrow size={25}/>,
          "path":"analytics"
        },

        
      ],
    }


  return (
    <div className=' flex  h-fit' style={{"fontSize":"var(--text-font-size)"}} >
      <SlideBar sideBarData={sideBarData}  activePage={activePage}/>
      <section className='w-full  flex md:justify-between max-md:flex-col'>
         
        
          <div className='w-full h-fit max-md:order-2'>
                
                {activePage==='' && (<Trucks />)}
                {activePage==='addemployee' && (<EmployeeForm/>)}
                {activePage==='employees' && (<Employee/>)}
                {activePage==='analytics' && (<Analytics/>)}
                
          
           
          </div>

          <div className='max-md:order-1'>
              <Progress/>
            </div>
            
                        
            
            
        </section>
        
    </div>
  )
}

export default AdminDashboard