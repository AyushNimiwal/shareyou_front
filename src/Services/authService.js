import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const register = async(data)=>{
    const res = await axios.post(`${API_URL}/users/register`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
    // try {
    //     const data = new FormData();
    //     for (const key in formData) {
    //         data.append(key, formData[key]);
    //     }

    //     const res = await fetch('http://localhost:8000/api/v1/users/register', {
    //         method: 'POST',
    //         body: data,  // Do not stringify FormData
    //     });

    //     if (!res.ok) {
    //         const errorData = await res.json();
    //         console.error('Registration failed', errorData);
    //         throw new Error('Registration failed');
    //     }

    //     const result = await res.json();
    //     console.log('Registration success', result);
    //     // Handle successful registration (e.g., redirect, show success message)
    // } catch (error) {
    //     console.error('Registration error', error.message);
    // }

}

const login = async(formData)=>{
        const res= await axios.post(`${API_URL}/users/login`,formData,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        return res.data.data;

    // try {
    //     const res = await fetch(`${API_URL}/users/login`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(formData)
    //     });
  
    //     if (!res.ok) {
    //       const errorData = await res.json();
    //       console.log('Login failed', errorData);
    //       return;
    //     }
  
    //     const data = await res.json();
    //     return data;
    //     // Handle successful login (e.g., save token, redirect)
    //   } catch (error) {
    //     console.log('Login error', error);
    //   }
}

const logout = async()=>{
    const res= await fetch(`${API_URL}/users/logout`,{
        method:'POST',
        credentials:'include'
    });
}

const refreshToken = async()=>{
    const res= await fetch(`${API_URL}/users/refresh-token`,{
        method:'POST',
        credentials:'include'
    });
    const data= await res.json();
    return data;
}

const changePassword = async(data)=>{
    const res= await fetch(`${API_URL}/users/change-password`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(data)
    });
    const result= await res.json();
    return result;
}

const getCurrentUser = async()=>{
    const res= await fetch(`${API_URL}/users/current-user`,{
        method:'GET',
        credentials:'include'
    });
    const data= await res.json();
    return data;
}

const getChannel = async(id)=>{
    const res= await fetch(`${API_URL}/users/c/${id}`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    });
    const data= await res.json();
    return data.data[0];
}

const getHistory = async()=>{
    const res= await fetch(`${API_URL}/users/history`,{
        method:'GET',
        credentials:'include'
    });
    const data= await res.json();
    return data;
}

const updateAccount = async(data)=>{
    const res= await fetch(`${API_URL}/users/update-account`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(data)
    });
    const result= await res.json();
    return result;
}

const updateAvatar = async(data)=>{
    const res= await fetch(`${API_URL}/users/update-avatar`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(data)
    });
    const result= await res.json();
    return result;
}

const updateCover = async(data)=>{
    const res= await fetch(`${API_URL}/users/update-cover-image`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(data)
    });
    const result= await res.json();
    return result;
}

const updateHistory = async(id)=>{
    const res= await fetch(`${API_URL}/users/updatehistory`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({videoId:id})
    });
    const result= await res.json();
    return result;
}

const createChannel = async()=>{
    const res= await fetch(`${API_URL}/users/createchannel`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    });
    const result= await res.json();
    return result;
}

export default {register,login,logout,refreshToken,changePassword,getCurrentUser,getChannel,getHistory,updateAccount,updateAvatar,updateCover,updateHistory,createChannel};