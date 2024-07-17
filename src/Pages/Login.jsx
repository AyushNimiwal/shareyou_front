import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess} from '../redux/reducers/authReducer'
import {useNavigate} from 'react-router-dom';
import authService from '../Services/authService';
function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLogin = async(e) => {
    e.preventDefault();
    const res= await authService.login(formData);
    console.log(res);
    dispatch(loginSuccess({accessToken:res.accessToken,refreshToken:res.refreshToken,user:res.user}));
    if(res){
      setVisible(true);
      setMsg('Login Success');
      setTimeout(() => {
        navigate('/');
        setVisible(false);
      }, 500);
    }
    else{
      setVisible(true);
      setMsg('Login Failed');
      setTimeout(() => {
        setVisible(false);
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
    {!visible&&<div className='w-fit h-fit p-4 mt-10 lg:py-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md rounded-xl flex flex-col justify-center items-center'>
      <h1 className='text-white text-3xl md:text-5xl mb-3 font-medium'>Login</h1>
      <form className='w-full flex flex-col justify-center items-center' onSubmit={handleLogin}>
        <input
          name="email"
          onChange={handleChange}
          className='w-72 h-10 lg:w-80 mt-4 px-2 rounded-xl'
          type='text'
          placeholder='Email'
        />
        <input
          name="password"
          onChange={handleChange}
          className='w-72 h-10 lg:w-80 mt-4 px-2 rounded-xl'
          type='password'
          placeholder='Password'
        />
        <button type="submit" className='w-72 lg:w-80 h-10 mt-8 px-2 rounded-xl bg-blue-500 text-white text-xl font-medium'>
          Login
        </button>
      </form>
    </div>}
    {visible&&<div className='w-fit h-fit p-4 text-white bg-black/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text white rounded-lg backdrop-blur-sm'>
       {msg}
    </div>}
    </>
  );
}

export default Login;
