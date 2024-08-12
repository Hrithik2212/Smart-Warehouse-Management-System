import React, {  useState } from 'react'
import './index.css'
import { CiDeliveryTruck } from "react-icons/ci";
import SlideBar from '../../../components/sideBar/SideBar'
import { VscHistory } from "react-icons/vsc";
import Progress from '../../../components/progress/Progress';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Trucks from './trucks/Trucks';
import History from './history/History';
import { SlPeople } from "react-icons/sl";


const CrewDashboard = () =>  {


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
      "head":"Staff",
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
            
                        
            
            <div className='max-md:order-1'>
              <Progress/>
            </div>
        </section>
        
    </div>
  )
}

export default CrewDashboard