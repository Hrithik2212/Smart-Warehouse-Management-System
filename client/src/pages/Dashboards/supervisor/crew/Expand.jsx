import React from 'react'
import DropDown from '../../../../components/table/DropDown'
const Expand = ({truck}) => {
  return (
    <DropDown>
            <div style={{"fontSize":"var(--text-font-size)"}}  className='w-full  '>
                    
                      <table className='w-full border-collapse text-center align-middle'>
                          <thead className='w-full '>
                                <tr>
                                  <th >Name</th>
                                  <th>Role</th>
                                  <th >Contact</th>
                                </tr>
                          </thead>
                          <tbody>
                            {truck?.Crew_data.map((item,key)=>(
                              <tr className='w-full whitespace-nowrap ' key={key}>
                                  <td>{item.name}</td>
                                  <td className=''>{item?.email ? (item.email):('--')}</td>
                                  <td className=''>{item?.number ? (item.number):('--')}</td>
                              </tr>
                            ))}
                            </tbody>
                      </table>
                                                            
                      
                        
            </div>
            <div className='flex flex-col justify-end z-0 relative'>
                        <button className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)] max-md:mx-auto py-3 px-6 rounded-md'>Request</button>
            </div>
    </DropDown>
    
  )
}

export default Expand