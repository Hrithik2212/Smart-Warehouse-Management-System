import React from 'react'
import './index.css'
const SideBar = ({children}) => {

  return (
    <aside className='h-[85vh] top-10 bg-[var(--secondary-color)] mx-2 w-[30%] sticky max-w-[250px] slidebar-shadow py-20 px-5 rounded-lg'>
        <div className='w-full p-2 flex flex-col gap-5 items-center justify-center'>
            <section>
                <span title={children?.user?.role} className=' w-[80px] h-[80px]  rounded-[100%] text-[3rem] text-[var(--inverted-text-color)]  bg-[var(--inverted-secondary-text-color)]  flex items-center justify-center cursor-pointer'><p >{children?.user?.role[0].toUpperCase()}</p></span>
            </section>
            <section>
                <h2 style={{"fontSize":"var(--secondary-font-size)"}}  className='break-words w-[100%] font-[var(--primary-font-weight)] text-center leading-6'>{children?.user?.name}</h2>
            </section>
        </div>
    </aside>
  )
}

export default SideBar