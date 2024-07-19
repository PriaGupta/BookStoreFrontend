import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { MdFavorite , MdDelete} from "react-icons/md";
import { FaCartPlus,FaEdit } from "react-icons/fa";
import Loader from './Loader';
import { useSelector } from 'react-redux';
import {toast} from 'react-hot-toast';
const ViewBookDetails = () => {
  const {id} = useParams();
  // console.log(id)
  const navigate= useNavigate();
  const [Data,setData]= useState();
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  const role= useSelector((state)=>state.auth.role);

  useEffect(()=>{
    const fetch= async()=>{
    const response = await axios.get(
      `http://localhost:7500/api/getbookbyid/${id}`
    );
   
    setData(response.data.data);
  };
  fetch();
  },[]);

  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite=async()=>{
    const response= await axios.put(
      "http://localhost:7500/api/add-bookto-favourite",
      {},
      {headers});
      toast(response.data.message);
  }
  const handleCart= async()=>{
    const response= await axios.put(
      "http://localhost:7500/api/addtocart",
      {},
      {headers});
      toast(response.data.message);
      navigate("/allbooks");
  }
 
  const handleDelete = async()=>{
    const response= await axios.delete(
      "http://localhost:7500/api/deletebook",
      {headers});
      toast(response.data.message);
      navigate("/allbooks");
  }

  return (
    <>
   
    
    { Data && (
        
      <div className="px-4 md:px-12 py-8 bg-zinc-800 flex flex-col md:flex-row align-center gap-8 items-start"> 
         <div className=' w-full flex justify-center my-4 md:hidden'>
        <button 
            className='bg-zinc-500 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95'
            onClick={() => window.history.back()}
        >
            Back
        </button>
    </div>
        <div className=' w-full lg:w-3/6 '>
       <div className='flex flex-col lg:flex-row justify-around bg-zinc-700 p-12 rounded'>
         <img src={Data.url} alt="imgti" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded ' /> 
       {
        isLoggedIn === true && role === "user" &&(
          <div className='flex  md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
        <button className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center' onClick={handleFavourite}><MdFavorite /></button>
        <button className=' text-white rounded lg:rounded-full text-4xl lg:text-3xl p-3  md:mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center' onClick={handleCart}><FaCartPlus /></button>
        </div>
        )
       }
       {
        isLoggedIn === true && role === "admin" &&(
          <div className='flex  md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
        <Link to={`/updateBook/${id}`} className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3  flex items-center justify-center' ><FaEdit /></Link>
        <button className='text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 md:mt-0 lg:mt-8 bg-white flex items-center justify-center'
          onClick={handleDelete}><MdDelete /></button>
        </div>
        )
       }
        </div>
        </div>
          <div className='p-4 w-full lg:w-3/6'>
           <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'>{Data.description}</p>
            <p className='flex mt-4 items-center justify-start text-2xl text-zinc-400'>
            <GrLanguage className='me-2' /> {Data.language}</p>   
            <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
              Price : ₹ {Data.price}</p>    
        </div>
      </div>
    )}
    
    {
      !Data && (
        <div className='h-screen big-zinc-900 flex items-center justify-center'>
        <Loader/>
        </div>
      )
    }
    </>
  )
}

export default ViewBookDetails
