import React, { useContext } from 'react'
import { Outlet,Navigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdAddTask } from "react-icons/md";
import './index.css'
import AuthContext, { AuthProvider } from '@/context/AuthContext';

const NavBar=()=>{
    return(
      <nav className='w-full h-full text-[var(--text-primary-color)] py-5 px-10 flex justify-between nav-shadow mb-5'>
        
          <section style={{"fontSize":"var(--secondary-font-size)"}} className='font-[var(--secondary-font-weight)] flex gap-3'>
              <MdAddTask size={30} className='text-[var(--inverted-text-color)]'/>
              <h1 className=''>Smart Warehouse</h1>
          </section>
          <section className='relative'>
              <span className='bg-[var(--warning-text-color)] rounded-full w-[20px] h-[20px] text-[15px] text-white  flex items-center justify-center bottom-4 left-4 absolute'>1</span>
              <IoMdNotificationsOutline size={30}/>
          </section>
        
      </nav>
    )
}


const LayOut = () => {


  return (
    <AuthProvider>
      <div>
          <NavBar/>
          <div>
              <Outlet/>
          </div>
      </div>
    </AuthProvider>
  )
}

const LoginRequiredLayout = ()=>{
  const {user,logoutUser}=true
  if(!user){
    return <Navigate to="/login"/>
  }
  return (
   
      <div>
          <NavBar/>
          <div>
              <Outlet/>
          </div>
      </div>
    
  )
}

export {LoginRequiredLayout,LayOut}