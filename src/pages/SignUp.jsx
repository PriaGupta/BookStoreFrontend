import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios';
import {toast} from 'react-hot-toast';
const SignUp = () => {

  const[values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:""
  })
  const navigate = useNavigate();
  const handlechange=(e)=>{
    const{name,value}=e.target;
    setValues({...values,[name]:value});
  }

  const handleSubmit=async()=>{
    try{
       if(values.username === "" || values.email === "" || values.password === "" || values.address === "")
       {
        toast("please enter all the fields ")
       }
       else{
        const response = await axios.post(
          `${process.env.backend_url}/api/signup`,
          values
        );
        toast(response.data.message);
        navigate("/signin");
       }
    }catch(err){
      toast(err.response.data.message)
    }
  }
  return (
   
  <div className='h-full bg-black px-12 py-8 flex items-center justify-center'>
  <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
    <h4 className='text-zinc-200 text-xl text-center'>Sign Up</h4>
    <div className='mt-4'>
      <div>
        <label className='text-zinc-200'>Username</label>
        <input 
          type="text" 
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='Enter your name' 
          name="username" 
          required
          value={values.username}
          onChange={handlechange}
        />
      </div>
      <div className='mt-4'>
        <label className='text-zinc-200'>Email</label>
        <input 
          type="email" 
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='Enter your email' 
          name="email" 
          required
          value={values.email}
          onChange={handlechange}
        />
      </div>
      <div className='mt-4'>
        <label className='text-zinc-200'>Password</label>
        <input 
          type="password" 
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='Enter your password' 
          name="password" 
          required
          value={values.password}
          onChange={handlechange}
        />
      </div>
      <div className='mt-4'>
        <label className='text-zinc-200'>Address</label>
        <input 
          type="text" 
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='Enter your correct address' 
          name="address" 
          required
          value={values.address}
          onChange={handlechange}
        />
      </div>
      <div className='flex justify-center mt-3'>
        <button 
          type="submit" 
          className='w-full max-w-[150px] bg-blue-400 hover:bg-blue-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full'
           onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
      <div className='text-center mt-1 mb-none'>
        <p className='text-white'> Or</p>
      <p className="text-sm text-white">Already have an account? <Link to="/signin" className='text-blue-500 underline'>SignIn</Link></p>
    </div>
    </div>
  </div>
</div>

  )
}

export default SignUp
