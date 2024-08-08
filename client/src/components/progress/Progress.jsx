import React from 'react'

const Progress = () => {
  return (
    <aside style={{"fontSize":"var(--text-font-size)"}} className='md:h-[45vh]  md:top-10 md:max-h-[400px] flex flex-col justify-between bg-[var(--secondary-color)] md:mx-2  md:sticky md:max-w-[250px] slidebar-shadow md:py-10 px-5 py-10 max-md:max-w-[90%] max-md:mx-auto rounded-lg bottom-0 z-10  max-md:w-full'>
        <h2 style={{"fontSize":"var(--secondary-font-size)"}} className='mx-auto mb-2'>Progress</h2>
        <section className='min-w-[200px] mb-5'>
            <h2 style={{"fontSize":"var(--primary-font-size)"}} className='slidebar-shadow w-fit p-5 rounded-full text-[var(--positive-text-color)] mx-auto'>4<span style={{"fontSize":"var(--secondary-font-size)"}} className='text-[var(--text-primary-color)]'>/10</span></h2>
        </section>
        <section>
              <ul className='list-none list-inside space-y-2 '>
                  <li className='font-medium'>
                      Total: <span>10</span>
                  </li>
                  <li className='font-medium'>
                      Completed: <span className='text-[var(--positive-text-color)]'>4</span>
                  </li>
                  <li className='font-medium'>
                      Un/Loading: <span className=''>2</span>
                  </li>
                  <li className='font-medium'>
                      Pending Arrival: <span className='text-[var(--warning-text-color)]'>4</span>
                  </li>
              </ul>
        </section>
    </aside>
  )
}

export default Progress