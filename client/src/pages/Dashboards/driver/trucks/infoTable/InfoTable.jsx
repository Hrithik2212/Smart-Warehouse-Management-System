import TableHead from '@/components/table/TableHead'
import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InfoTable = () => {
  const navigate=useNavigate()
    const handleSubmit = () => {
      console.log(time)
      navigate("/driver")
    };
    const today = new Date();
    const [time, setTime] = useState(today);
    const fixedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
  return (
    <div className='w-full border-collapse text-center '>
                <TableHead>
                            <Link to="/driver" className='w-fit cursor-pointer'><IoMdArrowRoundBack size={25}/></Link>
                            <h2 className='w-full'>Invoice</h2>          
                </TableHead>
                <form>
                    <div className="relative flex gap-2 items-center justify-center">
                            <div className=" flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-5 h-10 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                </svg>
                            </div>
                            <DatePicker
                                    selected={time}
                                    onChange={(date) => setTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    dateFormat="HH:mm"
                                    showTimeSelectOnly
                                    timeIntervals={30} 
                                    timeCaption="Time"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 text-center block w-[150px]  "
                                  />
                      </div>




                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload </label>
                    <input className="block w-[200px] text-sm text-gray-900 border mx-auto border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" id="multiple_files" type="file"  />

                </form>
                <div>
                        <button onClick={()=>{handleSubmit()}} className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)]  m-5 py-3 px-6 rounded-md' type='none'>Submit</button>
                </div>
    </div>
  )
}

export default InfoTable