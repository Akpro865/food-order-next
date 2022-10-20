import styles from './navbar.module.css'
import { FiPhoneCall } from 'react-icons/fi'
import { BsCartDash } from 'react-icons/bs'
import { BsToggleOn } from 'react-icons/bs'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

function Navbar({switchTheme}) {
  const cartCount = useSelector(state => state.cart)
  return (
   <nav className={`bg-app-color ${styles.header} flex w-full`}>
   	<div className={`flex ${styles.left} p-2 justify-center items-center`}>
   	  <div className=''>
       <FiPhoneCall className='font-bold text-white text-3xl'/>
      </div>
      <div className='flex flex-col text-white ml-3'>
        <span className='font-semibold text-xl'>order now</span>
        <span>044-4050-4050</span>
      </div>
   	</div>
   	<div className='grow p-2 hidden sm:flex text-white font-semibold justify-evenly items-center'>
      <ul className='flex '>
        <Link href='/'>
          <li className='mr-5 cursor-pointer'>Home</li>
        </Link>
        <Link href='/order/pro'>
          <li className='mr-5 cursor-pointer'>Orders</li>
        </Link>
        <li>Menu</li>
      </ul>
      <img src='/delivery.png' className='h-14 invisible md:visible w-14'/>
       <ul className='flex'>
        <li className='mr-5'>Events</li>
        <li className='mr-5'>Blog</li>
        <Link href='/contact'>
          <li className='cursor-pointer'>Contact</li>
        </Link>
      </ul>
   	</div>
   	<div className={`${styles.cart} p-2 flex justify-evenly items-center`}>
     <Link  href='/cart'>
      <div className='relative cursor-pointer'>
        <BsCartDash className='text-2xl text-white'/>
        <span className='bg-blue-200 w-4 h-4 text-blue-800 flex justify-center items-center rounded-full -top-1 -right-2 absolute text-xs p-2'>{cartCount.quantity}</span>
      </div>      
     </Link>
     <button className='bg-slate-800 flex items-center outline-none cursor-pointer rounded-full py-1 px-2 sm:px-3 text-white' onClick={switchTheme}>
      <BsToggleOn className='text-xl'/>
      </button>
   	</div>
   </nav>
  )
}

export default Navbar