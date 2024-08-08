import React, { useState } from 'react'
import './index.css'
import { MdArrowDropDown } from "react-icons/md";
const Card = ({ children }) => {
    
  return (

                <div className='flex flex-col cursor-pointer' >
                        <div  className='flex flex-col'>   
                            <div  className='flex   justify-between items-center px-5 bg-[var(--inverted-color)] w-full h-[50px] border-b border-[1px]'>
                                {children}
                            </div>
                        </div>
                </div>
     

  )
}

export default Card