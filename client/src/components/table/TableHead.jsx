import React from 'react'

const TableHead = ({children}) => {
  return <div className='solid border-[1px] h-[60px] flex justify-between w-full items-center px-5 font-bold'>{children}</div>;
  
};

export default TableHead