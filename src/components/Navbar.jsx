import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
    const role= useSelector((state)=>state.auth.role);

    const links=[
        {
            title:"Home",
            link:"/"
        },
        {
            title:"All Books",
            link:"/allbooks"
        },
        // {
        //     title:"Cart",
        //     link:"/cart"
        // },
      //   {
      //       title:"Profile",
      //       link:"/profile"
      //   },
      //   {
      //     title:"Admin Profile",
      //     link:"/profile"
      // }
    ];
  
    if (isLoggedIn) {
      links.push({ title: 'Cart', link: '/cart' });
    }
    
    const profileLink = role === 'admin'
    ? { title: 'Admin Profile', link: '/profile' }
    : { title: 'Profile', link: '/profile' };

  if (isLoggedIn === true) {
    links.push(profileLink);
  }
    

    // if(isLoggedIn === false)
    // {
    //   links.splice(2,2);
    // }

    // if(isLoggedIn == true && role === 'user'){
    //   links.splice(4,1);
    // }

    // if(isLoggedIn == true && role === 'admin'){
    //   links.splice(3,1);
    // }
    const [RespNav,setRespNav]=useState("hidden");

    const handleToggleNav = () => {
      setRespNav(RespNav === 'hidden' ? 'block' : 'hidden');
    };
  
    const handleLinkClick = () => {
      setRespNav('hidden');
    };

  return (
    <>
    <nav className='z-50 relative flex bg-zinc-900 text-white px-8 py-4 items-center justify-between'>
      <div className='flex items-center'>
        <img className="h-10 me-3 " src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png'/>
      
      <h1 className='text-2xl font-semibold'>Inkwell Inspirations</h1>
      </div>
      <div className='nav-links block md:flex items-center gap-4'>
        <div className='hidden md:flex gap-4'>
     {      
      links.map((items,i)=>(
        
        <div className='flex items-center' key={i}>
        {
          items.title === "Profile" || items.title === "Admin Profile" ? (
            <Link to={items.link}
        className='  font-semibold p-1 border border-blue-500 rounded text-white hover:bg-white hover:text-black transition-all duration-300'
        key={i}
        >
            {items.title}
            </Link>
          ) :(
            <Link to={items.link}
        className='hover:text-blue-500 transition-all duration-300'
       
        >
            {items.title}
            </Link>
          )
        } 
        </div>
        
    ))}
        </div>
        {
          !isLoggedIn  && (
        <>
        <div className="hidden md:flex gap-4">
            <Link to="/signin" className="px-2 py-1 border border-blue-500 text-white rounded hover:bg-white hover:text-black transition-all duration-300">SignIn</Link>
            <Link to="/signup" className="px-2 py-1 bg-blue-500 rounded hover:bg-blue-400 hover:text-black transition-all duration-300">SignUp</Link>
        </div>
        </>)
        }
        <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={handleToggleNav}>
        <FaGripLines />
        </button>
      </div>
    </nav>
    <div className={` ${RespNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
    {  links.map((items,i)=>(
        <Link to={items.link}
        className='text-white text-3xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300'
        key={i} onClick={handleLinkClick}
        >
            {items.title}{" "}
            </Link>
    ))}
    
    {
      !isLoggedIn && (
        <>
         <Link to="/signin" className=' px-8 mb-5 text-2xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-black transition-all duration-300' 
            onClick={handleLinkClick}>
              SignIn</Link>
            <Link to="/signup" className=' px-8 mb-5 text-2xl font-semibold py-2 bg-blue-500 rounded  hover:text-black hover:bg-white transition-all duration-300' 
             onClick={handleLinkClick} >
              SignUp</Link>
        </>
      ) 
    }
           
                 </div>
    
    </>

  )
}

export default Navbar
