import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const getVideos = async()=>{
    const res= await fetch(`${API_URL}/videos/latestvideo`,
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
}

const getVideoById = async(id)=>{
    const res= await fetch(`${API_URL}/videos/${id}`,
    {
        method:'GET',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
};

const publishVideo = async(data)=>{
    const res = await axios.post(`${API_URL}/videos/publish`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
};

const updateViews = async(id)=>{
    const res= await fetch(`${API_URL}/videos/views/${id}`,
    {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
};

const updateVideo = async(video,id)=>{
    const res= await axios.patch(`${API_URL}/videos/${id}`,video,
    {
        headers:{
            'Content-Type':'multipart/form-data',
        },
        withCredentials:true,
    });
    return res.data;
};

const deleteVideo = async(id)=>{
    const res= await axios.delete(`${API_URL}/videos/${id}`,{
        headers:{
            'Content-Type':'application/json',
        },
        withCredentials:true,
    });
    if(res.status===200){
        return true;
    }else{
        return false;
    }
};

const togglPublish = async(id)=>{
    const res= await fetch(`${API_URL}/videos/togglepublish/${id}`,
    {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
};

const getSearchVideos = async(search)=>{
    const res= await fetch(`${API_URL}/videos/allvideos`,
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
        body:JSON.stringify({queryText:search}),
    });
    const result= await res.json();
    return result.data;
};

const getVideosByOwner = async(userId)=>{
    const res= await fetch(`${API_URL}/videos/getVideosByOwner/${userId}`,
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        credentials:'include',
    });
    const result= await res.json();
    return result.data;
};

export default {getVideosByOwner,getVideos,getVideoById,publishVideo,updateViews,updateVideo,deleteVideo,togglPublish,getSearchVideos};
