import React from 'react'

const Expand = ({children}) => {
  return (
    <div className=' w-full  text-left max-md:gap-10 flex max-md:flex-col max-md:flex-wrap  justify-between dropdown-content h-0 expand' >
    {children}        
    </div>
  )
}

export default Expand