import React, { useState,useEffect } from 'react'
import axios from 'axios';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const AllBooks = () => {
  const [Data,setData]=useState();
  useEffect(()=>{
  const fetch= async ()=>{
    const response= await axios.get(
      `${process.env.backend_url}/api/getallbooks`
    );
  
   setData(response.data.data);
  };
  fetch();
},[]);
  return (
    <div className='bg-zinc-800 h-auto px-12 py-8'>
    <h2 className='text-3xl text-yellow-100'>All Books</h2> 
    { !Data && (
      <div className='w-full h-screen flex items-center justify-center'>
      <Loader/>
    </div>
    )}
    <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
    { Data && 
      Data.map((items,i)=>(
       <div key={i}>
           <BookCard data={items}/>
       </div>
      )) }
    </div>
   </div>
  )
}

export default AllBooks
