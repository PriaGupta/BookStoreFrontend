import React,{useState,useEffect} from 'react';
import Loader from '../Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
   const [orderhistory,setorderhistory]= useState();
  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch= async()=>{
      const response = await axios.get(
        `${process.env.backend_url}/api/getorderhistoryofuser`,
        {headers}
      );
     
      setorderhistory(response.data.data);
    };
    fetch();
  },[])
  return (
    <>
    { !orderhistory && 
     <div className='flex items-center justify-center h-[100%]'>
      <Loader/>
     </div>
    }
    { orderhistory && orderhistory.length === 0 && (
      <div className='h-[80vh] p-4 text-zinc-100 '>
        <div className='h-[100%] flex flex-col items-center justify-center'>
          <h1 className='text-4xl font-semibold text-zinc-500 mb-8'>
            No Order History
          </h1>
          <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png " 
           alt="orderimg" className="h-[20vh] mb-8" />
        </div>
      </div>
    )}
    { 
      orderhistory && orderhistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-2xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Your Order History</h1>
          
          <div className='mt-4 bg-zinc-900 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>
          {
            orderhistory?.map((items,i)=>(
              <div key={items._id} className='bg-zinc-700 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-600 hover:cursor-pointer'>
                <div className='w-[3%]'>
                  <h1 className='text-center'>{i+1}</h1>
                </div>
                <div className='w-[22%]'>
                  <Link to={`/viewbookdetails/${items?.book?._id}`}
                   className='hover:text-blue-300'>
                    {items?.book?.title}
                   </Link>
                </div>
                <div className='w-[45%]'>
                 <h1 className=''>  {items?.book?.description.slice(0,50)}...</h1>
                </div>
                <div className='w-[9%]'>
                 <h1>{items?.book?.price}</h1> 
                </div>
                 <div className='w-[16%]'>
                  <h1 className='font-semibold text-green-500'>
                    {items.status === "Order placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ): items.status === "cancelled" ?(
                      <div className='text-red-500'>{items.status}</div>
                    ):(
                      items.status
                    )}
                  </h1>
                 </div>
                 <div className='w-none md:w-[5%] hidden md:block'>
                   <h1 className='text-sm text-zinc-400'>COD</h1>
                 </div>
              </div>
            ))
          }
          </div>
      )
    }
    </>
  )
}

export default OrderHistory
