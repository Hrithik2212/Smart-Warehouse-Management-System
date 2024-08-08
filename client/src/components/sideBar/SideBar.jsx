import React, { useEffect, useState } from 'react'
import './index.css'
import { Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
const SideBar = ({sideBarData,activePage}) => {
  
  const [user,setUser]=useState(null)
  const {data,loading,error}=useFetch("/supervisor.json")


  useEffect(()=>{
    setUser(data?.info)
  },[data])

  

  return (
    <aside className='md:h-[70vh] z-10  max-h-[800px] md:top-10 bg-[var(--secondary-color)] md:mx-2 md:w-[30%] md:sticky md:max-w-[250px] slidebar-shadow md:py-20 md:px-5 rounded-t-lg md:rounded-lg max-md:bottom-0 max-md:fixed  max-md:w-full'>
        <section className='max-md:hidden w-full p-2 flex flex-col gap-5 items-center justify-center'>
            <div>
                <span title={user?.role} className=' w-[80px] h-[80px]  rounded-[100%] text-[3rem] text-[var(--inverted-text-color)]  bg-[var(--inverted-secondary-text-color)]  flex items-center justify-center cursor-pointer'><p >{user?.role[0]?.toUpperCase()}</p></span>
            </div>
            <div>
                <h2 style={{"fontSize":"var(--secondary-font-size)"}}  className='break-words w-[100%] font-[var(--primary-font-weight)] text-center leading-6'>{user?.name}</h2>
            </div>
        </section>
        <section className='md:mt-5 max-md:flex justify-between'>
          {sideBarData?.children.map((item,key)=>(
            <Link to={item?.path} className={`px-4 py-2 md:min-h-full rounded-lg w-full max-md:justify-center flex max-md:flex-wrap items-center md:gap-2 hover:bg-[var(--active-btn-color)]  md:mb-5 ${ item?.path===activePage ? ('bg-[var(--active-btn-color)] text-[var(--inverted-text-color)]'):("bg-transperent")}`}  key={key}>
                <span className='max-md:mx-4 text-center'>{item?.label}</span>
                <h6 style={{"fontSize":"var(--text-font-size)"}} className=''>{item?.title}</h6>
            </Link>
          ))}

        </section>
    </aside>
  )
}

export default SideBar