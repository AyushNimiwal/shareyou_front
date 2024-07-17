import React, {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import videoService from '../Services/videoService';

function SearchedVideos() {
  const {search}=useParams();
  const [mobile,setMobile]=useState(false);
  const [videos,setVideos]=useState([]);
  useEffect(()=>{
    const getwidth=()=>{
      const width=window.innerWidth;
      if(width<=640){
        setMobile(true);
      }else{
        setMobile(false);
      }
    }
    getwidth();
    window.addEventListener('resize',getwidth);
    return ()=>{
      window.removeEventListener('resize',getwidth);
    }
  })
  useEffect(()=>{
    const getSearchVideos = async(search)=>{
      const res=await videoService.getSearchVideos(search);
      console.log(res);
      setVideos(res);
    }
    getSearchVideos(search);
  },[])
  return (
    <div className='w-screen min-h-screen h-fit bg-black/90'>
      <div className='w-screen flex h-fit md:px-3 items-center justify-center'>
        <div className='md:w-3/4 h-fit min-h-screen bg-black/40 mt-16 md:mt-24 rounded-xl flex flex-col gap-5'>
          <h1 className='text-white text-2xl font-medium mt-3 px-4'>Search Results for "{search}"</h1>
          {videos.length>0&&videos.map((video,index)=>(
            !mobile?<div key={index} className='w-full h-64  flex justify-center gap-2 px-5'>
            <div className='w-1/3 h-full bg-slate-500 rounded-xl'>
              <img src={video.thumbnail} className='w-full h-full object-cover rounded-xl'/>
            </div>
            <div className='w-2/3 h-full bg-white/10 rounded-xl flex flex-col gap-2 p-2'>
              <h1 className='text-white text-2xl font-medium'>{video.title}</h1>
              <p className='text-white text-xl font-light'>{video.description}</p>
              <p className='text-white text-xl font-light'>{video.views} Views</p>
              <div className='w-full h-fit flex gap-2 items-center'>
                <img src={video.owner.avatar} className='w-10 h-10 rounded-full object-cover'/>
                <p className='text-white text-xl font-light'>{video.owner.username}</p>
              </div>
            </div>
            </div>
            :
            <div key={index} className='w-full h-80  flex flex-col justify-center px-1'>
            <div className='w-full h-56 bg-slate-500 rounded-t-xl'>
              <img src={video.thumbnail} className='w-full h-full object-cover rounded-t-xl'/>
            </div>
            <div className='w-full h-32 bg-white/10 rounded-b-xl flex flex-col gap-2 p-2'>
              <h1 className='text-white text-2xl font-medium'>{video.title}</h1>
              <p className='text-white text-xl font-light'>{video.views} Views</p>
              <div className='w-full h-fit flex gap-2 items-center'>
                <img src={video.owner.avatar} className='w-10 h-10 rounded-full object-cover'/>
                <p className='text-white text-xl font-light'>{video.owner.username}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchedVideos