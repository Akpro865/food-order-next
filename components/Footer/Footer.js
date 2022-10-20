import { BsTwitter } from 'react-icons/bs'
import { RiWhatsappFill } from 'react-icons/ri'
import { AiFillYoutube } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import Link from 'next/link'

function Footer() {
	const date = new Date()
  return (
   <footer className='bg-green-100'>
   	<div className='flex flex-col p-3'>
   	 <div className='flex flex-col sm:flex-row justify-center items-center'>
   	  <h5 className='mr-5 text-gray-700 sm:text-xl'>Follow us on</h5>
   	  <div className='flex text-2xl'>
         <Link href='https://twitter.com/Akpro768'>
   	     <span className='bg-sky-200 p-2 m-1 cursor-pointer rounded-full text-sky-600 hover:-translate-y-1 transition'><BsTwitter /></span>
         </Link>
         <Link href='https://web.whatsapp.com/'>
   	     <span className='bg-green-300 p-2 m-1 cursor-pointer rounded-full text-green-600 hover:-translate-y-1 transition'><RiWhatsappFill /></span>
         </Link>
         <Link href='https://www.youtube.com/'>
   	     <span className='bg-red-200 p-2 m-1 cursor-pointer rounded-full text-red-600 hover:-translate-y-1 transition'><AiFillYoutube/></span>
         </Link>
         <Link href='https://www.facebook.com/'>
   	     <span className='bg-blue-200 p-2 m-1 cursor-pointer rounded-full text-blue-600 hover:-translate-y-1 transition'><BsFacebook /></span>
         </Link>
         <Link href='Instagramhttps://www.instagram.com'>
   	     <span className='bg-pink-200 p-2 m-1 cursor-pointer rounded-full text-pink-700 hover:-translate-y-1 transition'><AiFillInstagram /></span>   	      	      	    	   
         </Link>
   	  </div>
   	 </div>
   	  <div className='flex flex-col sm:flex-row justify-center sm:justify-evenly p-2 items-center'>
         
   	   <div className='flex flex-col text-gray-800'>
   	    <h3 className='font-bold'>Brand</h3>
   	    <span>About us</span>
   	    <span>Career</span>
   	    <span>Products</span>
   	    <span>Others</span>
   	   </div>
   	   <div className='flex flex-col py-4 text-gray-800'>
   	    <h3 className='font-bold text-gray-700'>More</h3>
   	    <span>FAQ</span>
   	    <span>Payment</span>
   	    <span>Delivery</span>
   	    <span>Contact</span>
   	   </div>
   	   <div className='rounded'>
   	     <input className='p-2 outline-none rounded-l' placeholder='Email'/>
   	     <button className='bg-black p-2 text-white font-bold rounded-r'>Login</button>
   	   </div>
   	  </div>
   	  <p className='flex justify-center p-2 text-sm text-gray-400'>@copyrighted{date.getFullYear()}</p>
   	</div>
   </footer>
  )
}

export default Footer