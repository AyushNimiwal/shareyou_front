import React from 'react'
import { useNavigate } from 'react-router-dom'
import videoService from '../Services/videoService';
import authService from '../Services/authService';

function VideoCard({video,where}) {
  const navigate =useNavigate();
  const handlePlay = () => {
    const updateViews = async()=>{
      const res=await videoService.updateViews(video._id);
      const res1=await authService.updateHistory(video._id);
    }
    updateViews();
    if(where==='home') navigate(`/home/play/${video._id}`);
    else if(where==='channel') navigate(`/channel/${video.owner._id}/play/${video._id}`,{replace:true});
  }
  return (
    <div onClick={handlePlay} className='w-[18rem] group hover:scale-105 transition-all duration-500 cursor-pointer sm:w-80 lg:w-[22rem] xl:w-[28rem] h-60 md:h-64 xl:h-80 bg-white/10 text-white rounded-lg relative'>
        <video className='w-full h-3/4 object-cover rounded-t-lg absolute top-0 group-hover:opacity-100 opacity-0 transition-all duration-700' src={video.videoFile} autoPlay muted loop></video>
        <img className='w-full h-3/4 object-cover rounded-t-lg absolute top-0 group-hover:opacity-0 opacity-100 transition-all duration-700' src={video.thumbnail} alt='thumbnail'/>
        <div className='w-full h-1/4 flex flex-col px-2  absolute bottom-0'>
            <p className='w-full h-2/5 overflow-hiddentext-lg font-normal'>{video.title}</p>
            <div className='w-full h-1/2 flex items-center justify-between gap-2 '>
                {where!=='channel'&&<div className='w-fit h-full flex items-center gap-1'>
                    <img className='w-8 h-8 rounded-full' src={video.owner.avatar} alt='profile'/>
                    <p className='text-lg font-thin'>{video.owner.username}</p>
                </div>}
                <p className='text-lg font-thin'>{video.views} views</p>
            </div>
        </div>
    </div>
  )
}

export default VideoCard