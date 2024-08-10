import React from 'react'

const ProductState = ({selectedOption,setSelectedOption}) => {
    const handleOptionChange = (event) => {
        console.log(event.target.value, selectedOption);
        if (event.target.value === selectedOption) {
          setSelectedOption('');
        } else {
          setSelectedOption(event.target.value);
        }
      };
  return (

    <div style={{"fontSize":"var(--text-font-size)"}}  className='flex gap-2 max-md:flex-col h-fit justify-end w-[90%]'>
      <div className="flex justify-center items-center gap-1 ">
        <input
          type="radio"
          id="option1"
          name="radioGroup"
          className=' border-black border-b-2 border-2 border-solid'
          value="Pending"
          checked={selectedOption === 'Pending'}
          onChange={handleOptionChange}
        />
        <label htmlFor="option1" className="custom-radio"></label>
        <span>Good</span>
      </div>
      <div className="flex justify-center items-center gap-1">
        <input
          type="radio"
          id="option2"
          name="radioGroup"
          value="Processing"
          checked={selectedOption === 'Processing'}
          onChange={handleOptionChange}
        />
        <label htmlFor="option2" className="custom-radio"></label>
        <span>Damaged</span>
      </div>
      <div className="flex justify-center items-center gap-1">
        <input
          type="radio"
          id="option3"
          name="radioGroup"
          value="Completed"
          checked={selectedOption === 'Completed'}
          onChange={handleOptionChange}
        />
        <label htmlFor="option3" className="custom-radio"></label>
        <span>Missing</span>
      </div>
    </div>
 


  )
}

export default ProductState