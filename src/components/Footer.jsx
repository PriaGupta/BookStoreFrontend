import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 mb-4">
          <h6 className="text-lg text-slate-600 font-semibold">About</h6>
          <p className="text-justify mt-2 text-white">Books are man's best friends. Books are portable and so they are easy to carry around.
             And so books can be read at any time night or day, while travelling on a bus or train or flight, 
            and at meal time too. Books are published in many languages and in varied genres.
            (Implies a source of creativity and ideas, much like an inkwell is essential for writing.) </p>
                  </div>
  
        <div className="w-1/2 md:w-1/4 mb-4 px-8">
          <h6 className="text-lg text-slate-600 font-semibold">Quick Links</h6>
          <ul className="mt-2 space-y-2">
            <li><a href="http://scanfcode.com/about/" className="text-white hover:text-white">About Us</a></li>
            <li><a href="http://scanfcode.com/contact/" className="text-white hover:text-white">Contact Us</a></li>
            {/* <li><a href="http://scanfcode.com/contribute-at-scanfcode/" className="text-white hover:text-white">Contribute</a></li> */}
            <li><a href="http://scanfcode.com/privacy-policy/" className="text-white hover:text-white">Privacy Policy</a></li>
            <li><a href="http://scanfcode.com/sitemap/" className="text-white hover:text-white">Sitemap</a></li>
          </ul>
        </div>
      </div>
      <hr className="my-4 border-gray-600"/>
    </div>
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap ">
        <div className="w-full md:w-2/3 text-white ">
          <p className="text-sm">&copy; 2024 All Rights Reserved</p>
        </div>
        
      </div>
    </div>
  </footer>
  )
}

export default Footer
