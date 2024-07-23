import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
const UpdateBook = () => {
    const {id} = useParams();
    const navigate= useNavigate();
    const [Data,setData]= useState({
        url:"",
        title:"",
        author:"",
        price:"",
        description:"",
        language:"",
    });
    const headers={
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };
      const handleChange=(e)=>{
        const {name,value} =e.target;
        setData({...Data,[name]:value});
      };
      const handleSubmit = async()=>{
        try{
            if(
                Data.url === "" || Data.title === "" ||
                Data.author === "" || Data.price === "" ||
                Data.description === "" || Data.language === ""
              ){
                toast("All fields are required");
              }
              else{
                const response = await axios.put(
                    `${process.env.backend_url}/api/updatebook`,Data,
                    {headers}
                );
                setData({
                     url:"",
                     title:"",
                     author:"",
                     price:"",
                     description:"",
                     language:"",
                });
                toast(response.data.message);
                // navigate("/allbooks");
                navigate(`/viewbookdetails/${id}`)
              }
        }
        catch(err){
            console.log(err);
        }
      };
      useEffect(()=>{
        const fetch= async()=>{
        const response = await axios.get(
          `${process.env.backend_url}/api/getbookbyid/${id}`,{headers}
        ); 
        setData(response.data.data);
      };
      fetch();
      },[]);
  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
       Update Book
    </h1>
    <div className='p-4 bg-zinc-700 rounded '>
       <div>
           <label className='text-zinc-400'>Image</label>
          <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='url of image' name="url" value={Data.url} onChange={handleChange} required />
        </div>   
        <div className='mt-4'>
           <label className='text-zinc-400'>Title of Book</label>
          <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='title of book' name="title" value={Data.title} onChange={handleChange} required />
        </div>
        <div className='mt-4 '>
           <label className='text-zinc-400'>Author</label>
          <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='author of book' name="author" value={Data.author} onChange={handleChange} required />
        </div>
        <div className='mt-4 flex gap-4'>
           <div className='w-3/6'>
           <label className='text-zinc-400'>Language</label>
           <input type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='Language' name="language" value={Data.language} onChange={handleChange} required />
        </div>
        <div className='w-3/6'>
           <label className='text-zinc-400'>Price</label>
           <input type='number' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
          placeholder='price of book' name="price" value={Data.price} onChange={handleChange} required />
        </div>
        </div>
        <div className='mt-4 '>
           <label className='text-zinc-400'>Description</label>
          <textarea type='text' className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            rows="5" placeholder='description of book'
            name="description" value={Data.description} onChange={handleChange} required />
        </div>
   
    <button className='mt-4 px-3 bg-zinc-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
      onClick={handleSubmit}>
     Update Book
    </button>
   </div>
   </div>
  )
}

export default UpdateBook
