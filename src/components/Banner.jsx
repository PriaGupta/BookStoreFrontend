import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center'>
    <div className='w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
    <h3 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>
    Books: The Treasure Chest of Knowledge
    </h3>
    <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left'>
    Come to a book as you would come to an unexplored land. Come without a map. Explore it,
     and draw your own map.
    </p>
    <div className='mt-8'>
        <Link to="/allbooks" className='text-yellow-100 text-2xl lg:text-2xl font-semibold border border-yellow-100 
        px-10 py-2 hover:bg-zinc-500 rounded-full'>
            Discover Books
        </Link>
    </div>
    </div> 
    <div className='w-full md:w-1/2 h-full lg:h-full flex items-center justify-center'>
    <img src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmUybHJ6NXNpcGgzN3U1cWI1dnk4bWIwOHNscWRmY2R4Z2F4aHQ1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxYeLtSKwjXs8zU4/giphy.webp' alt="banner" />
    </div> 
    </div>
  )
}

export default Banner
