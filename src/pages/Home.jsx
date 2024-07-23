import React from 'react'
import Banner from '../components/Banner'
import RecentlyAdded from '../components/RecentlyAdded'

const Home = () => {

  console.log(process.env.REACT_APP_BASE_URL,'backend_url');


  return (
    <div className='bg-zinc-800 text-white px-10 py-8'>
      <Banner/>
      <RecentlyAdded/>
    </div>
  )
}

export default Home
