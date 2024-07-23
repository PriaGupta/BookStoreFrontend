import React, { useState,useEffect } from 'react'
import axios from 'axios';
import BookCard from './BookCard';
import Loader from './Loader';

const backend_url = 'https://bookstorebackend-j4km.onrender.com/'

const RecentlyAdded = () => {
    const [Data,setData]=useState();
    useEffect(()=>{
    const fetch= async ()=>{
      const response= await axios.get(
        `${backend_url}/api/getrecentsbooks`
      );
     setData(response.data.data);
    };
    fetch();
},[]);
  return (
    <div className='mt-8 px-4'>
     <h2 className='text-3xl text-yellow-100'>Recently Added Books</h2> 
     { !Data && (
        <div className='flex items-center justify-center my-8'>
            <Loader/>
        </div>
     )}
     <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

export default RecentlyAdded
