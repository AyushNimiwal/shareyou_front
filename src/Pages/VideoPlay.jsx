import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import videoService from '../Services/videoService';
import subscriptionService from '../Services/subscriptionService';
import commentService from '../Services/commentService';
import close from '../../public/vectors/close.png'
import edit from '../../public/vectors/edit.png'
import del from '../../public/vectors/delete.png'
import { useSelector } from 'react-redux';

function VideoPlay() {
    const {videoId}= useParams();
    const id=videoId;
    const [video, setVideo] = useState({});
    const [comments, setComments] = useState(null);
    const navigate = useNavigate();
    const [uploadedTime,setUploadedTime]=useState('');
    const { user } = useSelector(state => state.auth)
    const [update,setUpdate]=useState({isupdate:false,id:''});
    const [content,setContent]=useState('');
    const [mobile, setMobile] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [toggleSubscription, setToggleSubscription] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            const video = await videoService.getVideoById(id);
            setVideo(video);
        }
        const fetchComments = async () => {
            const comments = await commentService.getComments(id);
            setComments(comments.comments);
        }
        
        fetchVideo();
        fetchComments();
    }, [id]);
    useEffect(() => {
        function timeAgo(dateString) {
            const now = new Date();
            const then = new Date(dateString);
            const seconds = Math.floor((now - then) / 1000);
            let interval = seconds / 31536000;
        
            if (interval > 1) {
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 604800;
            if (interval > 1) {
                return Math.floor(interval) + " weeks ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
        const checkSubscription = async () => {
            const res = await subscriptionService.isChannelSubscribed(video.owner._id);
            setToggleSubscription(res);
        }
        checkSubscription();
        setUploadedTime(timeAgo(video.createdAt));
    },[video]);
    const toggleSubscribe = async () => {
        const res=await subscriptionService.toggleSubscription(video.owner._id);
        setToggleSubscription((prev)=>!prev);
        console.log(res);
    }

    const handleChange = (e) => {
        setContent(e.target.value);
    }
    const handleUpdate = (content,id) => {
        setContent(content);
        setUpdate({isupdate:true,id:id});
    }
    
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
     
    const handleClose = () =>{
        if(window.location.pathname.includes('home/play')){
            navigate('/');
        }
        else if( window.location.pathname.includes('channel')){
            navigate(`/channel/${video.owner._id}`);
        }
    }

    const handleComment = async(e) => {
        if(e.key === 'Enter'){
            console.log(update.isupdate,update.id);
            const comment = content;
            if(update.isupdate){
                const res = await commentService.updateComment(comment,update.id);
                console.log(res);
                setUpdate({isupdate:false,id:''});
            }
            else{
                const res = await commentService.addComment(comment,id);
                console.log(res);
            }
            const comments = await commentService.getComments(id);
            setComments(comments.comments);
            setContent('');
        }
    }

    const handleDelete = async(commentid) => {
        const res = await commentService.deleteComment(commentid);
        const comments = await commentService.getComments(id);
        setComments(comments.comments);
    }

  return (
    <>
    {mobile?<div className='w-screen h-fit min-h-screen absolute backdrop-blur-md top-16 bg-black/60'>
        <video className='w-full h-60 mt-0' autoPlay src={video.videoFile} controls > </video>
        <div className='w-full h-fit flex flex-col items-start gap-1 px-4 text-white'>
            <p className='text-lg font-thin'>{video.title}</p>
            <p className='text-md font-thin'>{video.views} views</p>
            <p className='text-md font-thin'>{uploadedTime}</p>
        </div>
        <div className='w-full h-fit flex items-center justify-between gap-2 my-3 px-4 text-white'>
            <div onClick={navigate(`/channel/${video.owner._id}`)} className='w-full h-fit flex items-center gap-2 rounded-xl'>
            <img className='w-10 h-10 rounded-full' src={video.owner?.avatar} alt='profile'/>
            <p className='text-sm font-thin'>{video.owner?.username}</p></div>
            {!toggleSubscription?<button onClick={toggleSubscribe} className='w-fit px-5 text-md md:text-xl lg:text-2xl h-fit py-1 bg-red-400 rounded-lg text-white font-normal cursor-pointer hover:scale-105 transition-all'>Subscribe</button>
                    :<button onClick={toggleSubscribe} className=' w-fit px-5 text-md md:text-xl lg:text-2xl h-fit py-1 bg-transparent border border-white/20 rounded-lg text-white font-normal cursor-pointer hover:scale-105 transition-all'>Unsubscribe</button>}
        </div>
        <div className='w-full h-fit flex flex-col items-start my-2 px-4 text-white'>
            <p className='text-lg font-thin text-gray-200'>Description</p>
            <p className='text-md font-thin'>{video.description}</p>
        </div>
        <div className='w-full h-fit flex flex-col items-start gap-1 px-4 text-white'>
            <p className='text-lg font-thin text-gray-200'>Comments</p>
            <input onKeyDown={handleComment} onChange={handleChange} value={content} type='text' className='w-full h-12 px-4 py-2 bg-transparent border-b-2 border-b-white/40 focus:border-b-blue-500 text-white outline-none' placeholder='Add a comment'/>
            <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
                {
                    comments&&comments.map((comment)=>(
                        <div key={comment._id} className='w-full h-fit flex flex-col py-2 items-start gap-2'>
                            <div className='w-full h-fit flex items-center gap-2 rounded-xl'>
                                <img className='w-8 h-8 rounded-full' src={comment.owner?.avatar} alt='profile'/>
                                <p className='text-lg text-white/60 font-normal'>{comment.owner?.username}</p>
                                {comment.owner._id==user._id&&<img onClick={()=>handleUpdate(comment.content,comment._id)} className='w-6 h-6 rounded-full cursor-pointer' src={edit} alt='edit'/>}
                                {comment.owner._id==user._id&&<img onClick={()=>handleDelete(comment._id)} className='w-6 h-6 rounded-full cursor-pointer' src={del} alt='delete'/>}

                            </div>
                            <p className='text-lg font-thin px-2 text-white/60'>{comment.content}</p>
                        </div>
                    ))
                }
                {!comments&&<p className='w-full text-center text-lg font-thin text-white/60'>No comments yet</p>}
            </div>
        </div>
    </div>
    :
    <div className='absolute top-0 backdrop-blur-sm w-full h-screen overflow-hidden flex flex-col justify-center items-center'>
            <div className='w-3/4 h-12 flex justify-end px-3 bg-black/40 rounded-t-xl py-1'>
                <img src={close} onClick={handleClose} className='w-10 h-10 p-2 rounded-xl hover:bg-white/20'/>
            </div>
        <div className='w-3/4 h-3/4 bg-black/40 flex items-center gap-2 rounded-b-xl'>
            <div className=' w-2/3  h-full flex flex-col px-1 text-white'>
                <video className='w-full my-2 h-3/4 rounded-2xl' autoPlay src={video.videoFile} controls > </video>
                <h2 className='text-2xl font-normal mx-1'>{video.title}</h2>
                <h2 className='text-xl font-thin mx-1 text-gray-300'>{video.description}</h2>
                <div className='w-full h-full flex items-center justify-between gap-4 mx-1'>
                    <div className='w-1/2 h-fit flex items-center gap-4'>
                        <h2 className='text-xl font-thin'>{video.views} views</h2>
                        <h2 className='text-xl font-thin'>{uploadedTime}</h2>
                    </div>
                    {!toggleSubscription?<button onClick={toggleSubscribe} className='w-fit px-5 text-lg md:text-xl lg:text-2xl h-fit py-1 bg-red-400 rounded-lg text-white font-normal cursor-pointer hover:scale-105 transition-all'>Subscribe</button>
                    :<button onClick={toggleSubscribe} className=' w-fit px-5 text-lg md:text-xl lg:text-2xl h-fit py-1 bg-transparent border border-white/20 rounded-lg text-white font-normal cursor-pointer hover:scale-105 transition-all'>Unsubscribe</button>}
                </div>
            </div>
            <div className='w-1/3 h-full flex flex-col items-start px-3'>
                <div onClick={()=>(navigate(`/channel/${video.owner?._id}`))} className='w-full h-fit hover:scale-90 transition-all cursor-pointer text-white flex justify-center my-2 py-2 px-4 rounded-xl bg-white/10 items-center gap-2 '>
                    <img className='w-14 h-14 rounded-full' src={video.owner?.avatar} alt='profile'/>
                    <p className='sm:text-xl lg:text-2xl h-fit font-normal'>{video.owner?.username}</p>
                </div>
                <p className='text-xl font-normal text-gray-300'>Comments</p>
                <div className='w-full mb-2 h-full bg-white/10 rounded-xl px-2'>
                    <input type='text' onKeyDown={handleComment} onChange={handleChange} value={content} className='w-full h-12 px-4 py-2 bg-transparent border-b-2 border-b-white/40 focus:border-b-blue-500 text-white outline-none' placeholder='Add a comment'/>
                    <div className='w-full h-full flex flex-col justify-start items-start gap-2'>
                        {
                            comments&&comments.map((comment)=>(
                                <div key={comment._id} className='w-full h-fit flex flex-col py-2 items-start gap-2'>
                                    <div className='w-full h-fit flex items-center gap-2 rounded-xl'>
                                        <img className='w-8 h-8 rounded-full' src={comment.owner?.avatar} alt='profile'/>
                                        <p className='text-lg text-white/60 font-normal'>{comment.owner?.username}</p>
                                        {comment.owner._id==user._id&&<img onClick={()=>handleUpdate(comment.content,comment._id)} className='w-6 h-6 rounded-full cursor-pointer' src={edit} alt='edit'/>}
                                        {comment.owner._id==user._id&&<img onClick={()=>handleDelete(comment._id)} className='w-6 h-6 rounded-full cursor-pointer' src={del} alt='delete'/>}
                                    </div>
                                    <p className='text-lg font-thin px-2 text-white/60'>{comment.content}</p>
                                </div>
                            ))
                        }
                        {!comments&&<p className='w-full text-center text-lg font-thin text-white/60'>No comments yet</p>}
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default VideoPlay