import React, { useState, useEffect } from 'react'
import del from '../../public/vectors/delete.png'
import edit from '../../public/vectors/edit.png'
import close from '../../public/vectors/close.png'
import { useSelector } from 'react-redux'
import channelService from '../Services/channelService'
import videoService from '../Services/videoService'

function DashBoard() {
    const {user}=useSelector(state=>state.auth);
    const [channelStats, setChannelStats] = useState({});
    const [channelVideos, setChannelVideos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [formData, setFormData] = useState({
        id:"",
        title:"",
        description:"",
        thumbnail:null,
        video:null
    });

    const handleDelete=async(videoId)=>{
        const res=await videoService.deleteVideo(videoId);
        if(res)window.location.reload();
    }

    const updateVideo=async()=>{
        const res=await videoService.updateVideo(formData,formData.id);
        console.log(res);
        setFormData({
            id:"",
            title:"",
            description:"",
            thumbnail:null
        })
        setIsEdit(false);
    }

    const handleChange=(e)=>{
        const { name, value, files } = e.target;
        if (files) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleAddVideo = async() => {
        await videoService.publishVideo(formData);
        setFormData({
            title:"",
            description:"",
            thumbnail:null,
            video:null
        })
        setIsAdd(false);
    }

    useEffect(()=>{
        const fetchChannelStats = async () => {
            const res=await channelService.getChannelStats();
            setChannelStats(res.data);
            const res1=await channelService.getChannelVideos();
            setChannelVideos(res1.data);
            console.log(res1.data);
        }
        fetchChannelStats();
    },[])
  return (
    <div className='w-screen h-screen bg-black/90 pt-24 relative'>
        <h1 className='text-white sm:text-lg md:text-2xl lg:text-5xl text-center'>DashBoard</h1>
        <div className='w-full h-full flex justify-between p-4'>
            <div className='w-1/3 h-full flex mt-5 items-start justify-start'>
                <div className='w-11/12 h-full flex flex-col rounded-xl'>
                    <div className='w-full ml-4 h-56 bg-white/5 border border-white/15 rounded-xl p-4'>
                        <h1 className='text-white text-xl text-center mb-3'>Channel Details</h1>
                        <div className='w-full h-1/2 flex gap-4 items-center justify-start'>
                        <img src={user.avatar} className='w-20 h-20 rounded-full' />
                        <div className='w-1/2 h-full flex flex-col justify-center text-white items-start'>
                            <h1 className='text-2xl'>{user.username}</h1>
                            <h2 className='text-xl text-gray-300'>{channelStats?.subscribers} Subscribers</h2>
                            <h2 className='text-xl text-gray-300'>{channelStats?.views} Views</h2>
                        </div>
                        </div>
                    </div>
                    <div className='w-full ml-4 h-52 bg-white/5 border border-white/15 rounded-xl p-4 mt-4'>
                        <h1 className='text-white text-xl text-center mb-3'>Owner Details</h1>
                        <div className='w-full h-1/2 flex gap-4 items-center justify-start'>
                        <div className='w-full h-full flex flex-col justify-center text-white items-start'>
                            <h1 className='text-xl'>Username: {user.username}</h1>
                            <h2 className='text-xl'>fullName: {user.fullName}</h2>
                            <h2 className='text-xl'>Email: {user.email}</h2>
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className=' w-2/3 flex flex-col items-end justify-start px-4 mt-4 gap-6'>
                <button onClick={()=>(setIsAdd(true))} className='w-1/4 h-10 px-3 py-1 text-lg md:text-2xl text-white ring-2 ring-gray-400/30 rounded-xl hover:ring-blue-500 hover:scale-110 transition-all'>Add Video</button>
                <div className='w-full h-96 overflow-scroll flex flex-col gap-4 bg-white/5 border border-white/15 rounded-xl mb-4 p-4'>
                    {
                        channelVideos.map(video=>(
                            <div className='w-full h-80 flex gap-2'>
                                <div className='w-11/12 h-80 bg-black/20 border border-white/15 rounded-xl p-4'>
                                    <h1 className='text-white text-xl mb-3 rounded-xl bg-black/30 border border-white/15 py-2 px-2'>{video.title}</h1>
                                    <div className='w-full h-3/4 flex gap-4 items-center justify-start'>
                                        <img src={video.thumbnail} className='w-1/2 h-full rounded object-cover shadow-md shadow-white/30'/>
                                        <div className='w-1/2 h-full flex flex-col justify-start px-2 py-1 rounded-xl bg-black/30 text-white items-start'>
                                            <h1 className='text-xl text-gray-300'>{video.description}</h1>
                                            <h2 className='text-xl text-gray-300'>{video.views} Views</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-1/12 h-20  rounded-xl flex flex-col gap-2'>
                                    <div className='w-fit h-fit rounded-xl cursor-pointer hover:scale-90 transition-all p-2 bg-black/10 border border-white/15'>
                                        <img onClick={()=>(
                                            setIsEdit(true),
                                            setFormData({
                                                id:video._id,
                                                title:video.title,
                                                description:video.description,
                                            })
                                        )} src={edit} className='w-6 h-6' />
                                    </div>
                                    <div className='w-fit h-fit rounded-xl cursor-pointer hover:scale-90 transition-all  p-2 bg-black/10 border border-white/15'>
                                        <img src={del} onClick={()=>(handleDelete(video._id))} className='w-6 h-6' />
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

        {isEdit&&<div className='w-screen h-screen bg-black/30 backdrop-blur-xl flex items-center justify-center absolute top-0 left-0'>
            <div className='w-1/2 h-1/2 bg-white/5 rounded-xl p-4 flex flex-col gap-5'>
                <div className='w-full h-fit flex justify-end px-3 rounded-t-xl py-1'>
                    <h1 className='text-white w-full text-center text-2xl mt-2'>Update Video</h1>
                    <img src={close}
                    onClick={()=>(setIsEdit(false),
                        setFormData({
                            title:"",
                            description:"",
                            thumbnail:null
                        })
                    )}
                     className='w-10 h-10 p-2 rounded-xl hover:bg-white/20 transition-all cursor-pointer'/>
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video Title</h1>
                    <input type='text' name='title' value={formData.title} onChange={handleChange} placeholder='Title' className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video Description</h1>
                    <input type='text' name='description' value={formData.description} onChange={handleChange} placeholder='Description' className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video Thumbnail</h1>
                    <input type='file' name='thumbnail' onChange={handleChange} className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex items-center justify-center'>
                    <button onClick={updateVideo} className='w-1/4 h-10 px-3 py-1 text-lg md:text-2xl text-white ring-2 ring-gray-400/30 rounded-xl hover:ring-blue-500 hover:scale-110 transition-all'>Update Video</button>
                </div>

            </div>
        </div>}

        {isAdd&&<div className='w-screen h-screen bg-black/30 backdrop-blur-xl flex items-center justify-center absolute top-0 left-0'>
            <div className='w-1/2 h-fit bg-white/5 rounded-xl p-4 flex flex-col gap-5'>
                <div className='w-full h-fit flex justify-end px-3 rounded-t-xl py-1'>
                    <h1 className='text-white w-full text-center text-2xl mt-2'>Add Video</h1>
                    <img src={close}
                    onClick={()=>(setIsAdd(false),
                        setFormData({
                            title:"",
                            description:"",
                            thumbnail:null,
                            videoFile:null
                        })
                    )}
                     className='w-10 h-10 p-2 rounded-xl hover:bg-white/20 transition-all cursor-pointer'/>
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video Title</h1>
                    <input type='text' name='title' onChange={handleChange} placeholder='Title' className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video Description</h1>
                    <input type='text' name='description' onChange={handleChange} placeholder='Description' className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video Thumbnail</h1>
                    <input type='file' name='thumbnail' onChange={handleChange} className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex gap-4 items-center justify-between'>
                    <h1 className='text-white text-xl'>Video File</h1>
                    <input type='file' name='video' onChange={handleChange} className='w-3/4 h-10 px-2 py-1 rounded-xl bg-black/30 text-white outline-none ring-2 ring-gray-400/15 focus:ring-blue-600' />
                </div>
                <div className='w-full h-fit flex items-center justify-center'>
                    <button onClick={handleAddVideo} className='w-1/4 h-10 px-3 py-1 text-lg md:text-2xl text-white ring-2 ring-gray-400/30 rounded-xl hover:ring-blue-500 hover:scale-110 transition-all'>Add Video</button>
                </div>
            </div>
        </div>}
    </div>
  )
}

export default DashBoard