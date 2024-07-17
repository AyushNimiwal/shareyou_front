import React, {useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import authService from '../Services/authService';
import close from '../../public/vectors/close.png';

function Profile() {
    const {user}=useSelector(state=>state.auth);
    const [history, setHistory] = useState([]);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [fullName, setFullName] = useState(user.fullName);
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name==='username'){
            setUsername(value);
        }
        if(name==='email'){
            setEmail(value);
        }
        if(name==='fullName'){
            setFullName(value);
        }
        if(name==='avatar'){
            setAvatar(value);
        }
        if(name==='coverImage'){
            setCoverImage(value);
        }
    }

    useEffect(() => {
        const fetchHistory = async() => {
            const res = await authService.getHistory();
            console.log(res);
            setHistory(res.data); 
        }
        fetchHistory();
    },[])

    const handleUpdate = async() => {
        if((username!==user.username)||(email!==user.email)||(fullName!==user.fullName)){
            const data = {
                username,
                email,
                fullName
            }
            const res = await authService.updateAccount(data);
        }
        if(avatar){const res1 = await authService.updateAvatar({avatar});}
        if(coverImage){const res2 = await authService.updateCover({coverImage});}
        setIsEdit(false);
    }

    const changePassword = async() => {
        if(oldPassword===''||newPassword===''){return alert('Please fill all the fields')};
        const data = {
            oldPassword,
            newPassword
        }
        const res = await authService.changePassword(data);
        setOldPassword('');
        setNewPassword('');
        setIsChangePassword(false);
    }

  return (
    <div className='w-screen h-fit min-h-screen bg-black/90 md:pt-20 lg:pt-0 text-white/70 flex flex-col md:flex-row items-center justify-evenly relative'>
        <div className='w-full text-lg md:text-2xl md:border border-white/20 md:w-2/5 h-fit bg-black/20 flex flex-col items-start p-5 rounded-xl'>
            <img src={user?.avatar} className='mt-14 md:mt-0 w-24 h-24 md:w-44 md:h-44 rounded-full' />
            <div className='w-full flex items-center'>
                <h1 className='w-1/2 text-start'>Username</h1>
                <h1 className='w-1/2 text-start'>{user?.username}</h1>
            </div>
            <div className='w-full flex items-start'>
                <h1 className='w-1/2 text-start'>Email</h1>
                <h1 className='w-1/2 text-start'>{user?.email}</h1>
            </div>
            <div className='w-full flex items-start'>
                <h1 className='w-1/2 text-start'>FullName</h1>
                <h1 className='w-1/2 text-start'>{user?.fullName}</h1>
            </div>
            <div className='w-full flex items-center gap-4 py-3'>
                <button onClick={()=>(setIsEdit(true))} className='w-1/2 h-12 border lg:text-2xl md:text-md text-sm border-white/20 hover:bg-black/10 transition-all hover:ring-gray-600 hover:ring-2 text-white rounded-xl'>Edit Profile</button>
                <button onClick={()=>(setIsChangePassword(true))} className='w-1/2 h-12 border lg:text-2xl md:text-md text-sm border-white/20 hover:bg-black/10 transition-all hover:ring-gray-600 hover:ring-2 text-white rounded-xl'>Change Password</button>
            </div>

        </div>
        <div className='w-full md:border border-white/20 md:w-2/5 h-4/5  bg-black/20 flex flex-col items-start p-5 rounded-xl'>
            <h1 className='w-full text-start text-lg md:text-2xl'>My History</h1>
            <div className='w-full h-4/5 flex flex-col items-start gap-4 overflow-y-scroll'>
                {history&&history.map((item,index)=>
                    <div key={index} className='w-full h-44 md:h-48 text-white bg-black/30 rounded-xl flex items-center justify-between gap-2 p-4'>
                        <div className='w-1/2 h-full flex items-center gap-4'>
                            <img src={item?.thumbnail} className='w-full h-full rounded-xl object-cover' />
                        </div>
                        <div className='w-1/2 h-full flex flex-col gap-1 md:gap-3 items-start'>
                            <h1 className='text-md md:text-2xl'>{item?.title}</h1>
                            <div className='w-full flex flex-col md:flex-row items-start md:items-center md:gap-4'>
                                <img src={item?.owner?.avatar} className='w-8 h-8 md:w-12 md:h-12 rounded-full' />
                                <h1 className='text-sm md:text-xl'>{item?.owner?.username}</h1>
                            </div>
                            <h1 className='text-sm md:text-xl'>{item?.views} Views</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
        {isEdit&&<div className='w-full h-fit min-h-screen backdrop-blur-md absolute top-10 md:top-0 left-0 z-0'>
        <div className='w-full md:w-3/4 h-fit md:h-4/5 border border-white/30 bg-black/30 backdrop-blur-md rounded-xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='w-full h-1/6 flex items-center justify-between p-5'>
                <h1 className='text-xl md:text-2xl'>Edit Profile</h1>
                <img src={close} onClick={()=>(setIsEdit(false))} className='w-8 h-8 md:w-10 md:h-10 p-2 rounded-xl hover:bg-white/20'/>
            </div>
            <div className='w-full h-5/6 flex flex-col items-start p-2 md:p-5 gap-4'>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-xl md:block hidden'>Username</h1>
                    <input type='text' name='username' placeholder='Username' onChange={handleChange} value={username} className='w-full md:w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-xl md:block hidden'>Email</h1>
                    <input type='email' name='email' placeholder='Email' onChange={handleChange} value={email} className='w-full md:w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-xl md:block hidden'>FullName</h1>
                    <input type='text' name='fullName' placeholder='Full Name' onChange={handleChange} value={fullName} className='w-full md:w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-sm md:text-xl'>Avatar</h1>
                    <input type='file' name='avatar' onChange={handleChange} value={avatar} className='w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-sm md:text-xl'>CoverImage</h1>
                    <input type='file' name='coverImage' onChange={handleChange} value={coverImage} className='w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center justify-center gap-4'>
                <button onClick={handleUpdate} className='w-full md:w-1/2 h-12 border text-xl md:text-2xl border-white/20 hover:bg-black/10 transition-all hover:ring-gray-600 hover:ring-2 text-white rounded-xl'>Update Profile</button>
                </div>
            </div>
        </div>
        </div>}
        {isChangePassword&&<div className='w-full h-screen backdrop-blur-md absolute top-0 left-0 z-0 flex items-center justify-center'>
            <div className='w-1/3 p-5 bg-black/30 border border-white/20 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center gap-4'>
                <div className='w-full h-1/6 flex items-center justify-between p-5'>
                    <h1 className='text-2xl'>Change Password</h1>
                    <img src={close} onClick={()=>(setIsChangePassword(false))} className='w-10 h-10 p-2 rounded-xl hover:bg-white/20'/>
                </div>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-xl'>Old Password</h1>
                    <input type='password' value={oldPassword} onChange={(e)=>(setOldPassword(e.target.value))} className='w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center gap-4'>
                    <h1 className='w-1/3 text-xl'>New Password</h1>
                    <input type='password' value={newPassword} onChange={(e)=>(setNewPassword(e.target.value))} className='w-2/3 h-10 border bg-transparent text-white focus:ring focus:ring-blue-600 outline-none border-white/20 rounded-xl p-2' />
                </div>
                <div className='w-full flex items-center justify-center gap-4'>
                    <button onClick={changePassword} className='w-1/2 h-12 border text-2xl border-white/20 hover:bg-black/10 transition-all hover:ring-gray-600 hover:ring-2 text-white rounded-xl'>Change Password</button>
                </div>
            </div>
        </div> }     
    </div>
  )
}

export default Profile