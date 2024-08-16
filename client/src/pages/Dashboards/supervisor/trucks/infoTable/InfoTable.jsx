import Card from '../../../../../components/card/Card'
import DropDown from '../../../../../components/dropDown/DropDown'
import TableHead from '../../../../../components/table/TableHead'
import React, { useContext, useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BASE_URL from '../../../../../utils/baseApi';
import AuthContext from '../../../../../context/AuthContext';

const InfoTable = () => {
  const {authToken}=useContext(AuthContext)
  const navigate=useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const dock = searchParams.get('dock');
  
    const products = [
      { "productid": "prod-d8f1k5x6w" },
      { "productid": "prod-n9w8y7p2e" },
      { "productid": "prod-t5v0z4m3r" },
      { "productid": "prod-b1n2j3v8y" },
      { "productid": "prod-x7o9e5d4b" },
      { "productid": "prod-k3p6u1q2z" }
  ];
    const [formData, setFormData] = useState([{
      productid: '',
      state: '',
    }]);
    

    const changeState = (index, val) => {
      setFormData(prevFormData => 
          prevFormData.map((item, i) =>
              i === index ? { ...item, state: val } : item
          )
      );
  };

  useEffect(() => {
    setFormData(products.map((product) => ({
        productid: product.productid,
        state: "--"
    })));
}, []);


    const handleSubmit = async () => {
      const isValid = formData.every(item => item.state !== "--");
      if (isValid) {
        try {
          const response = await fetch(BASE_URL+`assignnewtrucks/${dock}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'application/json' 
              }
          });
          

          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          alert("Submitted")
          navigate("/supervisor")

      } catch (err) {
          alert("Something went to wrong..")
          console.log(err)
      } 
      } else {
        alert("All states must be filled out");
    }
    };
    
  return (
    <div className='w-full border-collapse text-center '>
                <TableHead>
                            <Link to="/supervisor" className='w-fit cursor-pointer'><IoMdArrowRoundBack size={25}/></Link>
                            <h2 className='w-full'>Product Id</h2>
                            <h2 className='w-full'>State</h2>
                            
                </TableHead>
                <div>
                        {formData?.map((data,index)=>(
                            <div key={index} >
                              <div>
                                  <Card   index={index}>
                                          <input value={data?.productid} disabled className='w-full text-center ml-4' required/>
                                          <div className='w-full flex justify-center py-5' >
                                              <input value={data.state} className='hidden' readOnly required={true}/>
                                              <DropDown index={index} choice={data.state} changeState={changeState} data={["Good","Missing","Damage"]}/>
                                          </div>
                                   
                                  </Card>
                              </div>
                                
                            </div>
                        ))}
                        <button onClick={()=>{handleSubmit()}} className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)]  m-5 py-3 px-6 rounded-md' type='none'>Submit</button>
                </div>
    </div>
  )
}

export default InfoTable