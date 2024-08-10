import React, { useState } from 'react'

const DropDown = ({data,changeState,choice,index}) => {
    const [drop,setDrop]=useState(false)
    const handleSelect = (i)=>{
        changeState(index,i)
        setDrop(false)
    }
  return (
    <div className='text-[var(--text-primary-color)] w-fit h-fit'>

                <button onClick={()=>setDrop(!drop)} className="bg-[var(--primary-btn)] text-[var(--text-secondary-color)] max-md:mx-auto  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{choice}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
                </button>

                <div id="dropdown" className={`rounded-lg shadow w-fit ${!drop && "hidden" }`}>
                    <ul className="py-2" aria-labelledby="dropdownDefaultButton">
                        {data?.map((i,k)=>(
                            <li onClick={()=>handleSelect(i)} key={k}>
                                <h6 type='none' className="block px-4 py-2 w-full  hover:bg-[var(--active-btn-color)]">{i}</h6>
                            </li>
                        ))}
                    
            
                    </ul>
                </div>

    </div>
  )
}

export default DropDown