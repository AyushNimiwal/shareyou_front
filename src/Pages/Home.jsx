import React, { useState,useEffect } from 'react'
import videoService from '../Services/videoService';
import VideoCard from '../components/VideoCard';
import { useParams } from 'react-router-dom';
import VideoPlay from './VideoPlay';

function Home() {
  const {videoId}= useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await videoService.getVideos();
      setData(videos);
    }
    fetchVideos();
  }, []);

  return (
    <div className='relative z-0 w-screen h-fit min-h-screen py-3 bg-gradient-to-tr pt-16 sm:pt-24  from-black/70 to-70% to-black/90'>
      <div className='w-screen flex flex-wrap h-fit px-3 gap-4 md:justify-start justify-center'>
        {data.map((video) => (
          <VideoCard  key={video._id} video={video} where="home"/>
        ))}
      </div>
      {videoId&&<VideoPlay/>}
    </div>
  )
}

export default Home