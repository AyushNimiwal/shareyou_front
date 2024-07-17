import React, {useEffect, useState} from 'react'
import logo from '../../public/vectors/logo.png'
import sea from '../../public/vectors/search.png'
import { useSelector, useDispatch } from 'react-redux'
import authService from '../Services/authService'
import { logoutSuccess } from '../redux/reducers/authReducer'
import {useNavigate} from 'react-router-dom'
import dots from '../../public/vectors/dots.png'



function Navbar() {
  const { user } = useSelector(state => state.auth)
  const [visible, setVisible] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate=useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      if(width<=750){
        setMobile(true)
      }else{
        setMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [window.innerWidth,width])

  const handleLogout = async() => {
    await authService.logout();
    dispatch(logoutSuccess());
    navigate('/');
    console.log('logout');
  }

  
  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearch = (e) => {
    if(e.key=='Enter'&& search!==''){
      console.log('search');
      navigate(`/search/${search}`);
    }
  }

  const handleChannel = async() => {
    const res=await authService.createChannel();
    console.log(res);
    setVisible(false);
    navigate(`/channel/${res.data}`);
  }

  return (
    <>
      {!mobile?<div className='w-full h-16 z-10 fixed top-0 left-0 flex justify-between items-center bg-black/60'>
        <img onClick={()=>(navigate('/'))} src={logo} className=' w-30 h-10 mx-3 cursor-pointer' />
        <div className='w-2/4 h-14 flex gap-2 text-white items-center'>
        <input type='text' onKeyDown={handleSearch} onChange={handleChange} placeholder='Search' name='search' className='w-full h-full rounded-xl bg-transparent px-4 py-2  border outline-none text-xl ring-white/30 border-white/30 focus:ring-2 focus:ring-blue-600'/>
        <img onClick={handleSearch} src={sea} className='w-10 h-10 cursor-pointer hover:scale-105 transition-all' />
        </div>
        <div className='w-1/4 h-full flex justify-end gap-5 items-center'>
        <img onClick={()=>(navigate(`profile/${user._id}`))} src={user.avatar} className='w-12 h-12 rounded-full cursor-pointer hover:scale-105 transition-all' />
        <img onClick={()=>setVisible((prev)=>!prev)} src={dots} className='w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-all' />
        </div>
      </div>:
        <div className='w-full h-16 absolute z-10 top-0 left-0 flex items-center px-2 gap-2 justify-end bg-black/60'>
          <input type='text' placeholder='Search' name='search' className='w-3/4 h-12 rounded-xl bg-black/30 border px-4 py-2 outline-none border-white/30 text-white text-xl focus:ring-2 ring-blue-600'/>
          <img onClick={handleSearch} src={sea} className='w-10 h-10' />
          <img onClick={()=>(navigate(`profile/${user._id}`))} src={user.avatar} className='w-10 h-10 rounded-full' />
        </div>
      }
      <div className={`w-full md:w-1/5 h-fit bg-black/50 rounded-xl absolute z-10 top-16 right-5 origin-right ${visible?'visible':'hidden'} transition-transform`}>
        <div className='w-full h-12 flex justify-center items-center'>
          <button onClick={()=>(setVisible(false),navigate('/subscriptions'))} className='w-full h-12 text-2xl hover:bg-black/20 rounded-xl text-white'>Subscriptions</button>
        </div>
        <div className='w-full h-12 flex justify-center items-center'>
          <button onClick={handleChannel} className='w-full h-12 text-2xl hover:bg-black/20 rounded-xl text-white'>Channel</button>
        </div>
        <div className='w-full h-12 flex justify-center items-center'>
          <button onClick={handleLogout} className='w-full h-12 text-2xl hover:bg-black/20 rounded-xl text-white'>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar