import React,{useState,useEffect} from 'react'
import home from '../../public/vectors/home.png'
import subscriptions from '../../public/vectors/subscribe.png'
import channel from '../../public/vectors/channel.png'
import settings from '../../public/vectors/settings.png'
import { useNavigate } from 'react-router-dom'
function ToolBar() {
    const [mobile, setMobile] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
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
  return (
    <>
    {mobile&&<div className='w-full h-24 fixed bottom-0 flex justify-center items-center'>
        <div className='w-fit px-3 py-2 h-16 bg-black/30 backdrop-blur-sm rounded-xl flex justify-between items-center gap-2'>
            <div className='w-full h-full flex justify-between items-center gap-2'>
            <div onClick={()=>(navigate('/'))} className='text-white text-2xl px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer hover:scale-95 transition-transform'><img src={home} className='w-8 h-8' /></div>
            <div onClick={()=>(navigate('/subscriptions'))} className='text-white text-2xl px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer hover:scale-95 transition-transform'><img src={subscriptions} className='w-8 h-8' /></div>
            <div onClick={()=>(navigate(`/channel/`))} className='text-white text-2xl px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg cursor-pointer hover:scale-95 transition-transform'><img src={channel} className='w-8 h-8' /></div>
            </div>
        </div>
    </div>}
    </>
  )
}

export default ToolBar