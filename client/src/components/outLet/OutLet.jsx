import React from 'react'
import { Outlet,Navigate } from "react-router-dom";

const NavBar=()=>{
    return(
      <nav>
        navbar
      </nav>
    )
}

const LayOut = () => {


  return (
    <div>
        <NavBar/>
         
            <div>
                    <Outlet /> 
            </div>

    </div>
  )
}

const LoginRequiredLayout = ()=>{
  const {user}=true
  if(!user && false){
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