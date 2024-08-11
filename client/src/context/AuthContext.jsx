import {createContext,useState,useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdAddTask } from "react-icons/md";
const NavBar=()=>{
    return(
      <nav className='w-full h-full text-[var(--text-primary-color)] py-5 px-10 flex justify-between nav-shadow mb-5'>
        
          <section style={{"fontSize":"var(--secondary-font-size)"}} className='font-[var(--secondary-font-weight)] flex gap-3'>
              <MdAddTask size={30} className='text-[var(--inverted-text-color)]'/>
              <h1 className=''>Smart Warehouse</h1>
          </section>
          <section className='relative'>
              <span className='bg-[var(--warning-text-color)] rounded-full w-[20px] h-[20px] text-[15px] text-white  flex items-center justify-center bottom-4 left-4 absolute'>1</span>
              <IoMdNotificationsOutline size={30}/>
          </section>
        
      </nav>
    )
}

const API_BASE_URL = "http://127.0.0.1:8000"
const AuthContext = createContext()

export default AuthContext

export const AuthProvider = () =>{
    let  navigate= useNavigate();
    let [authToken,setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user,setUser]= useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    const [loading, setLoading] = useState(true);
    

    
    


    const loginUser = async (e) =>{
        e.preventDefault()
        try{
            let response = await fetch(`${API_BASE_URL}/token/`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username:e.target.email.value,
                    password:e.target.password.value
                })
               
            })
            let data = await response.json()
            if(response.status === 200){
                
                setAuthToken(data)
                localStorage.setItem('authTokens', JSON.stringify(data))
                setUser(jwtDecode(data.access_token))
                console.log(user)
                const  role  = user.role;

                switch (role) {
                    case 'manager':
                        navigate('/manager');
                        break;
                    case 'supervisor':
                        navigate('/supervisor');
                        break;
                    case 'staff':
                        navigate('/manager');
                        break;
                    case 'driver':
                        navigate('/driver');
                        break;
                    default:
                        navigate('/login'); 
                }
                
            }
            else{
                alert('credentials are wrong!')
            }
            
        }catch(err){
            console.log(err)
        }
    }
    const logoutUser = ()=>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate("auth/login")
    }
    const registerUser = async (e) =>{
        e.preventDefault();
        try{
            let  res=await fetch (`${API_BASE_URL}/register/`, {
              method:'POST',
              headers:{'Content-type':'Application/json'},
              body: JSON.stringify({
                email:e.target.email.value,
                password:e.target.password.value,
              })
            })
           let data = await res.json()
           if(res.status===201){
                setAuthToken(data)
                localStorage.setItem('authTokens', JSON.stringify(data))
                setUser(jwtDecode(data.access))
                
                

           }else{
            alert("Somthing went to worng....")
           }

        }
        catch(err){
            console.log(err)
        }

    }
    let contextData={
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        authToken:authToken,
        registerUser:registerUser
    }
    console.log(user)
    return(
        <AuthContext.Provider value={contextData}>
            <div>
                <NavBar/>
                <div>
                    <Outlet/>
                </div>
            </div>
        </AuthContext.Provider>
    )
}