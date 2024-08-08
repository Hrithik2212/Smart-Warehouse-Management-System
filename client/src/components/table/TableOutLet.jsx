import React from 'react'

const TableOutLet = ({children}) => {
  return (
    
    
        <div className='max-md:order-2 h-[800px] w-full '>
                  <div className="flex flex-wrap justify-center gap-4 p-4 ">
                      <div className="bg-[var(--secondary-color)] flex justify-center max-md:mb-[5rem]  shadow-md rounded-lg  w-full border border-gray-200"> 
                              {children}
                      </div>
                  </div> 
          </div> 
                            
   
    
  )
}

export default TableOutLet