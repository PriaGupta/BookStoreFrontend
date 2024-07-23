import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import {Outlet} from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import MobileNav from '../components/Profile/MobileNav';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [Profile,setProfile]= useState();
  const dispatch = useDispatch();
  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get(
        `${process.env.backend_url}/api/getuserinformation`,{headers}
      );
      setProfile(response.data);
      dispatch(authActions.changeRole(response.data.role));
    };
    fetch();
  },[dispatch])
  return (
    <div className='bg-zinc-800 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white'>
      {
        !Profile && (
          <div className='w-full h-[100%] flex items-center justify-center'>
            <Loader/>
          </div>
        )}
        {
          Profile && (
            <>
            <div className='w-full md:w-1/4 h-auto lg:h-screen'>
                <Sidebar data={Profile}/>
                <MobileNav/>
            </div>
            <div className='w-full md:w-5/6'>
                <Outlet/>
             </div>
            </>
          )
        }
    </div>
  )
}

export default Profile
