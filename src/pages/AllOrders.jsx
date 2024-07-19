import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import { IoOpenOutline } from 'react-icons/io5';
import { FaUserLarge, FaCheck } from 'react-icons/fa6';
import SeeUserData from './SeeUserData';
import {toast} from 'react-hot-toast';
const AllOrders = () => {
    const [allorder,setallorder] = useState();
    const [options,setoptions] = useState(-1);
    const [Values,setValues]= useState({ status: "" });
    const [userDiv,setuserDiv]= useState("hidden");
    const [userDivData,setuserDivData]= useState();
    const headers={
        id:localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };
    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get(
                "http://localhost:7500/api/getallorders",
                {headers}
            );
            setallorder(response.data.data);
        };
        fetch();
    },[allorder]);

    const Change =(e)=>{
        const {value}=e.target;
        setValues({status: value});
    }
    const SubmitChanges= async(i)=>{
        const id= allorder[i]._id;
        const response = await axios.put(
            `http://localhost:7500/api/updatestatus/${id}`,
            Values,
            {headers}
        );
        toast(response.data.message);
    }

    // allorder && allorder.splice(allorder.length-1, 1);
  return (
    <>
    {
        !allorder && (
            <div className='h-[100%] flex items-center justify-center'>
               <Loader/> 
            </div>
        )}

        {
            allorder && allorder.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                  <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                    AllOrders</h1>

                 <div className='mt-4 bg-zinc-700 w-full rounded py-2 px-4 flex gap-2'>
                    <div className='w-[3%]'>
                        <h1>Sr.</h1>
                    </div>
                    <div className='w-[40%] md:w-[22%]'>
                        <h1>Books</h1>
                    </div>
                    <div className='w-0 md:w-[45%] hidden md:block'>
                      <h1>Description</h1>
                   </div>
                    <div className='w-[17%] md:w-[9%]'>
                      <h1>Price</h1>
                    </div>
                   <div className='w-[30%] md:w-[16%]'>
                    <h1>Status</h1>
                   </div>
                   <div className='w-[10%] md:w-[5%]'>
                    <h1 className="">
                        <FaUserLarge />
                     </h1>
                    </div>
                 </div>
                 {
                    allorder && allorder.map((items,i)=>(
                        <div className='bg-zinc-600 w-full rounded py-2 px-4 flex gap-2  hover:cursor-pointer'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{i+1}</h1>
                            </div>
                            <div className='w-[40%] md:w-[22%]'>
                                <Link to={`/viewbookdetails/${items.book._id}`}
                                 className="hover:text-blue-300">
                                {items.book.title}
                                </Link>
                            </div>
                            <div className=' md:w-[42%] md:block'>
                              <h1 className=''>{items.book.description.slice(0,100)}...</h1>
                            </div>
                            <div className='w-[17%] md:w-[9%]'>
                             <h1 className=''> ₹{items.book.price}</h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='font-semibold'>
                              <button className='hover:scale-105 transition-all duration-300'
                               onClick={()=> setoptions(i)} >
                                {items.status === "Order Placed" ? (
                                    <div className='text-yellow-500'>{items.status}</div>
                                ): items.status === "Cancelled" ? (
                                    <div className='text-red-500'>{items.status}</div>
                                ): (
                                    <div className='text-green-500'>{items.status}</div>
                                )}
                              </button>
                              <div className={`${options === i ? "block" :"hidden"} flex mt-4`}>
                                <select name="status" className='bg-gray-800' id="" onChange={Change} value={Values.status}>
                                    {["Order Placed","Out of Delivery", "Delivered",
                                    "Cancelled"].map((items,j)=>(
                                        <option value={items} key={j} >
                                        {items}
                                    </option>
                                    ))}
                                </select>
                                <button className="text-green-500 hover:text-pink-600 mx-2 transition-all duration-300"
                                                 onClick={() => { setoptions(-1); 
                                                  SubmitChanges(i); }}>
                                     <FaCheck />
                                </button>
                              </div>
                                </h1>
                            </div>
                            <div className="w-[10%] md:w-[5%]">
                                    <button className='text-xl hover:text-orange-500'
                                        onClick={() => {
                                            setuserDiv("fixed");
                                            setuserDivData(items.user);
                                        }}
                                        >
                                        <IoOpenOutline />
                                    </button>
                                </div>
                        </div>
                    ))}
                </div>
            )}

            {
                userDivData && (
                    < SeeUserData 
                      userDivData={userDivData}
                      userDiv={userDiv}
                      setuserDiv={setuserDiv}
                    />
                )}
    </>
  )
}

export default AllOrders
