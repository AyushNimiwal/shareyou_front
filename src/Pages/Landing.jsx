import React,{useState} from 'react'
import v1 from '../../public/videos/v1.mp4'
import v2 from '../../public/videos/v2.mp4'
import v3 from '../../public/videos/v3.mp4'
import v4 from '../../public/videos/v4.mp4'
import v5 from '../../public/videos/v5.mp4' 
import arrow from '../../public/vectors/blacknext.png' 
import Register from './Register'


function Landing({toggle,setToggle}) {
  const [visible, setVisible] = useState(false)
  return (
    <>
    <div className='w-screen h-screen relative'>
        <div className='w-screen h-screen bg-black/60  absolute px-3 z-10'>
            <h1 className='text-6xl text-white font-bold absolute top-1/2 transform -translate-y-1/2 sm:-translate-x-1/2 sm:left-1/2 sm:text-5xl sm:text-center md:text-6xl lg:text-7xl'>Make Videos <br></br>& Share<br></br><p className='font-thin text-xl md:text-2xl'>Create and share your videos</p></h1>
            <button onClick={()=>(setVisible(true),setToggle(false))} className='group bg-black/30 text-white border border-white/30 backdrop-blur-md px-4 py-2 rounded-lg absolute top-3/4 sm:top-2/3 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:text-2xl hover:text-black hover:bg-white transition-all'>
              <div className='flex items-center gap-3 '> 
                Get Started 
                <img className='hidden w-8 h-8 group-hover:block transition-all' src={arrow}/>
              </div> 
            </button>
        </div>
        {!toggle&&visible&&<div className='w-screen h-screen absolute z-10'><Register/></div>}
        <video src={v1} className='sm:hidden w-screen h-screen object-cover absolute' autoPlay loop muted />
        <video src={v2} className='sm:visible w-screen h-screen object-cover' autoPlay loop muted />
        <video src={v4} className='md:visible  w-2/5 h-1/2 md:h-3/4 object-cover absolute top-1/4 left-2/4 -translate-x-1/2 -translate-y-1/2' autoPlay loop muted />
        <video src={v3} className='md:visible  w-2/5 h-2/4 md:h-2/3 object-cover absolute top-2/3 left-3/4 -translate-x-1/2 -translate-y-1/2' autoPlay loop muted />
        <video src={v5} className='md:visible  w-2/4 h-1/2 md:h-2/4 object-cover absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2' autoPlay loop muted />
    </div>
    </>
  )
}

export default Landing