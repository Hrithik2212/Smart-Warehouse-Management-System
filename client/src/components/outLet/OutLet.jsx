import React, { useEffect, useRef, useState } from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdAddTask } from "react-icons/md";
import './index.css'

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='w-full h-full text-[var(--text-primary-color)] py-5 px-10 flex justify-between nav-shadow mb-5'>
      <section style={{ fontSize: 'var(--secondary-font-size)' }} className='font-[var(--secondary-font-weight)] flex gap-3'>
        <MdAddTask size={30} className='text-[var(--inverted-text-color)]' />
        <h1 className=''>Smart Warehouse</h1>
      </section>
      <section className='relative' ref={dropdownRef}>
        <span className='bg-[var(--warning-text-color)] rounded-full w-[20px] h-[20px] text-[15px] text-white flex items-center justify-center bottom-4 left-4 absolute'>1</span>
        <IoMdNotificationsOutline size={30} onClick={toggleDropdown} />

        {isDropdownOpen && (
          <div className='absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50'>
            <ul className='p-2'>
              <li className='p-2 border-b border-gray-200'>Notification 1</li>
              <li className='p-2 border-b border-gray-200'>Notification 2</li>
              <li className='p-2'>Notification 3</li>
            </ul>
          </div>
        )}
      </section>
    </nav>
  );
};


const LayOut = () => {


  return (
    <div>
      <NavBar />

      <div>
        <Outlet />
      </div>

    </div>
  )
}

const LoginRequiredLayout = () => {
  const { user } = true
  if (!user && false) {
    return <Navigate to="/login" />
  }
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>


    </div>
  )
}

export { LoginRequiredLayout, LayOut }