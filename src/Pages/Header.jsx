import React,{useEffect, useState} from 'react'
import logo from '../../public/vectors/logo.png'
import Login from './Login.jsx'
import {useSelector,useDispatch} from 'react-redux'
import {logoutSuccess} from '../redux/reducers/authReducer.js'

function Header({toggle,setToggle}) {
  const [visible, setVisible] = useState(false)
  const {user,isAuthenticated}=useSelector(state=>state.auth)
  const disptach = useDispatch()
  const logout=()=>{
    disptach(logoutSuccess())
    window.location.reload()
  }
  return (
    <>
    <div className='w-full h-20 px-2 sm:h-24 bg-black/50 backdrop-blur-md flex justify-between items-center sm:px-4 absolute'>
        <img src={logo} className=' w-36 h-10 sm:w-48 sm:h-12'/>
        {!isAuthenticated?<button onClick={()=>(setVisible(prev=>!prev),setToggle(true))} className='text-white hover:underline origin-center transition-all hover:scale-105 px-2 py-1 text-xl sm:text-2xl border-white/30 rounded-xl'>Login</button>
        :<button onClick={logout} className='text-white hover:underline origin-center transition-all hover:scale-105 px-2 py-1 text-xl sm:text-2xl border-white/30 rounded-xl'>Logout</button>}

    </div>
    {toggle&&visible&&<div className='w-screen h-screen'><Login/></div>}
    </>
  )
}

export default Header