import React, {  useState } from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import SlideBar from '../../../components/sideBar/SideBar'
import { VscHistory } from "react-icons/vsc";
import Progress from '../../../components/progress/Progress';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { SlPeople } from "react-icons/sl";
import EmployeeForm from '@/components/forms/EmployeeForm';


const CrewDashboard = () =>  {
  const {data,loading,error}=useFetch("/")

  const {page}=useParams()
  const activePage = page || '';

  const [showDetails,setShowDetails]=useState(0)

    const changeDetails = (index)=>{
        if(showDetails===index){
            setShowDetails(null);
        }
        else{
            setShowDetails(index);
        }
    }

  

  
  
  
    const sideBarData={
        "head":"Admin",
      "children":[
        {
          "title":"Add Employee",
          "label":<SlPeople size={25}/>,
          "path":""
        },
        
      ],
    }


  return (
    <div className=' flex  h-fit' style={{"fontSize":"var(--text-font-size)"}} >
      <SlideBar sideBarData={sideBarData}  activePage={activePage}/>
      <section className='w-full  flex md:justify-between max-md:flex-col'>
         
        
          <div className='w-full h-fit '>
                <EmployeeForm/>
          
           
          </div>
            
                        
            
            
        </section>
        
    </div>
  )
}

export default CrewDashboard