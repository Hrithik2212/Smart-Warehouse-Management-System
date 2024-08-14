import React from 'react'
import ExpandRow from '../../../../components/table/ExpandRow'
const Expand = ({truck}) => {
  return (
    <ExpandRow>
            <div style={{"fontSize":"var(--text-font-size)"}}  className='w-full  '>
                    
                      <table className='w-full border-collapse text-center align-middle'>
                          <thead className='w-full '>
                                <tr>
                                  <th >Name</th>
                                  <th>Experience</th>
                                  <th >Contact</th>
                                </tr>
                          </thead>
                          <tbody>
                            {truck?.employees?.map((item,key)=>(
                              item.employment_type !== "manager" && (
                                  <tr className='w-full whitespace-nowrap ' key={key}>
                                    <td>{item.name} <span className='max-md:hidden'>({item.experience}(Y))</span></td>
                                    <td className=''>{item.employment_type}{<span className='max-md:hidden'>{item.heavy_machinery &&(" (Heavy Machinery)")}</span>}</td>
                                    <td className=''>{item?.mobile ? (item.mobile):('--')}</td>
                                  </tr>
                              )
                            ))}
                            <tr className='w-full whitespace-nowrap '>
                                  <td>{truck.truck.driver.name} <span className='max-md:hidden'>({truck.truck.driver.experience}(Y))</span></td>
                                  <td className=''>{truck.truck.driver.employment_type}</td>
                                  <td className=''>{truck.truck.driver ? (truck.truck.driver.mobile):('--')}</td>
                              </tr>

                            </tbody>
                      </table>
                                                            
                      
                        
            </div>
            <div className='flex flex-col justify-end z-0 relative'>
                        <button className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)] max-md:mx-auto py-3 px-6 rounded-md'>Request</button>
            </div>
    </ExpandRow>
    
  )
}

export default Expand