import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast';
const backend_url = 'https://bookstorebackend-j4km.onrender.com'
const BookCard = ({data,favourite}) => {
  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemovefavourite= async()=>{
    const response = await axios.put(
      `${backend_url}/api/remove-bookfrom-favourite`,
      {},
      {headers}
    );
    toast(response.data.message);
  }
  return (
    
    <div className="bg-zinc-900 rounded p-4 flex flex-col">
      <Link to={`/viewbookdetails/${data._id}`}>
      <div className=''>
            <div className="bg-zinc-800 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className='h-[40vh] md:[35vh]' />
        </div>
      {/* <h2 className="mt-4 text-xl text-white font-semibold ">{data.title} </h2> */}
      <h2 className="mt-4 text-xl text-white font-semibold">
        {data.title.length > 25 ? `${data.title.slice(0, 20)}...` : data.title}
      </h2>
       <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
       <p className='mt-2 text-zinc-200 font-semibold text-xl'>₹ {data.price}</p>
       
      </div>
      </Link>
      { favourite && (
      <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-red-500 mt-4'
       onClick={handleRemovefavourite}>
        Remove from Favourite
       </button>
      )}
       </div>
    
  )
}

export default BookCard
