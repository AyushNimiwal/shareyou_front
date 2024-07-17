import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../Services/authService';
import subscriptionService from '../Services/subscriptionService';
import VideoCard from '../components/VideoCard.jsx';
import videoService from '../Services/videoService.js';
import VideoPlay from './VideoPlay.jsx';
import { useSelector } from 'react-redux';

function Channel() {
  const {id,videoId} = useParams();
  const {user}=useSelector(state=>state.auth);
  const [channel, setChannel] = React.useState({});
  const [isChannelSubscribed, setIsChannelSubscribed] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getChannel = async () => {
      const res=await authService.getChannel(id);
      console.log(res);
      setChannel(res);
    }
    const getVideos = async () => {
      const res=await videoService.getVideosByOwner(id);
      console.log(res);
      setVideos(res);
    }
    const isSubscribed = async () => {
      const res = await subscriptionService.isChannelSubscribed(id);
      setIsChannelSubscribed(res);
    }
    getChannel();
    getVideos();
    isSubscribed();
  },[id]);

  const toggleSubscription = async () => {
    const res=await subscriptionService.toggleSubscription(id);
    window.location.reload();
  }
  return (
    <div className='w-screen relative h-fit min-h-screen bg-black/90'>
      <div className='w-full h-56'>
        <img src={channel?.coverImage} className='w-full h-full object-cover'/>
      </div>
      <div className='w-full h-28 flex items-center justify-between px-5'>
        <div className='w-full h-28 flex items-center justify-start px-5'>
          <div className='w-1/4 h-full flex items-center gap-5'>
            <img src={channel?.avatar} className='w-20 h-20 rounded-full' />
            <div className='w-2/4 h-full flex flex-col justify-center text-white items-start'>
              <h1 className='text-2xl'>{channel?.username}</h1>
              <h2 className='text-xl text-gray-300'>{channel?.subscriberCount} Subscribers</h2>
            </div>
          </div>
          {
            isChannelSubscribed?
            <button onClick={toggleSubscription} className='w-fit h-10 px-3 py-1 text-lg md:text-2xl rounded-xl hover:scale-110 ring-2 text-white/80 border-white/30 transition-all bg-white/5 hover:ring-2 hover:ring-red-400 hover:text-red-400'>Unsubscribe</button>:
            <button onClick={toggleSubscription} className='w-fit h-10 px-3 py-1 text-lg md:text-2xl bg-red-400 text-white rounded-xl hover:scale-110 transition-all'>Subscribe</button>
          }
        </div>
        {id===user._id&&<button onClick={()=>(navigate(`/channel/${id}/dashboard`,{replace:true}))} className='w-1/4 h-10 px-3 py-1 text-lg md:text-2xl border border-white/30 text-white rounded-xl hover:scale-110 transition-all'>Manage Channel</button>}
      </div>
      <div className='w-full h-full flex flex-col items-start justify-start px-4 mt-4 gap-1'>
        <h1 className='text-2xl text-white'>Videos</h1>
        <div className='w-full h-fit min-h-60 bg-white/5 rounded-xl mb-4 flex flex-wrap gap-4 p-4'>
          {
            videos.map((video) => {
              return <VideoCard video={video} key={video._id} where='channel' />
            })
          }
        </div>
      </div>
      {videoId&&<VideoPlay/>}
    </div>
  )
}

export default Channel