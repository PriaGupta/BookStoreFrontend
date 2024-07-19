import React,{useState, useEffect} from 'react'
import axios from 'axios';
import BookCard from '../BookCard';
const Favourites = () => {
  const [FavouriteBook, setFavouriteBook]=useState();
  const headers={
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch= async()=>{
    const response = await axios.get(
      "http://localhost:7500/api/get-favourite-books",
      {headers}
    );
   
    setFavouriteBook(response.data.data);
  };
  fetch();
  },[FavouriteBook]);
  return (
    <>
    { FavouriteBook && FavouriteBook.length === 0 && (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full">
          No Favourite Books

        </div>
      ) }
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {
        FavouriteBook && 
        FavouriteBook.map((items,i)=>(
          <div key={i}>
            <BookCard data={items} favourite={true} />
          </div>
        )) }
    </div>
    </>
  )
}

export default Favourites
