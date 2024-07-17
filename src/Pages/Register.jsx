import React, { useState } from 'react';
import arrow from '../../public/vectors/next.png'; // Adjust the path as necessary
import { useDispatch } from 'react-redux';
import authService from '../Services/authService'
function Register() {
  const [next, setNext] = useState(false);
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async() => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    const res = await authService.register(data);
    if(res){
      console.log('Registration success',res);
      setVisible(true);
      setMsg('Registration Success Now Login!');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
    else{
        setVisible(true);
        setMsg('Registration Failed');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    setFormData({username: '', fullName: '', email: '', password: '', avatar: null, coverImage: null,});
};

  return (
    <>
    {!visible&&<div className="w-fit h-fit p-4 mt-10 lg:py-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md rounded-xl flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl md:text-5xl font-medium">Register</h1>
      {!next && (
        <>
          <input
            onChange={handleChange}
            name="username"
            className="w-72 h-10 lg:w-80 mt-4 px-2 rounded-xl"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={handleChange}
            name="fullName"
            className="w-72 h-10 lg:w-80 mt-4 px-2 rounded-xl"
            type="text"
            placeholder="Full Name"
          />
          <input
            onChange={handleChange}
            name="email"
            className="w-72 h-10 lg:w-80 mt-4 px-2 rounded-xl"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={handleChange}
            name="password"
            className="w-72 h-10 lg:w-80 mt-4 px-2 rounded-xl"
            type="password"
            placeholder="Password"
          />
        </>
      )}
      {next && (
        <>
          <div className="w-72 lg:w-80 h-10 mt-4 lg:mt-8 px-2 rounded-xl flex justify-between">
            <label className="w-1/2 h-10 px-2 rounded-xl text-white font-thin lg:text-xl text-lg">
              Upload Avatar
            </label>
            <input
              onChange={handleChange}
              name="avatar"
              className="w-1/2 h-10 px-2 rounded-xl text-white"
              type="file"
            />
          </div>
          <div className="w-72 lg:w-80 h-10 mt-4 px-2 rounded-xl flex justify-between">
            <label className="w-1/2 h-10 px-2 rounded-xl text-white font-thin lg:text-xl text-lg">
              Upload Cover Image
            </label>
            <input
              onChange={handleChange}
              name="coverImage"
              className="w-1/2 h-10 px-2 rounded-xl text-white"
              type="file"
            />
          </div>
        </>
      )}
      {!next && (
        <button
          onClick={() => setNext((prev) => !prev)}
          className="w-72 lg:w-80 h-10 mt-8 px-2 rounded-xl bg-blue-500 text-white text-xl font-medium"
        >
          <div className="w-full justify-center items-center flex gap-3">
            Next
            <img src={arrow} className="w-7 h-7" alt="Next" />
          </div>
        </button>
      )}
      {next && (
        <button
          onClick={handleRegister}
          className="w-72 lg:w-80 h-10 mt-8 px-2 rounded-xl bg-blue-500 text-white text-xl font-medium"
        >
          Register
        </button>
      )}
    </div>}
    {visible&&<div className='w-fit h-fit p-4 text-white bg-black/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text white rounded-lg backdrop-blur-sm'>
       {msg}
    </div>}
    </>

  );
}

export default Register;
