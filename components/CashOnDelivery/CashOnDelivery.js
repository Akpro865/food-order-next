import { useState } from 'react'

function CashOnDelivery({total, createOrder}) {
	const [details, setDetails] = useState({
		customer: "",
		address: ""
	})

	const { customer, address } = details

	const handleDetail = (e) => {
		setDetails((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const placeOrder = () => {
		createOrder({customer: customer, address: address, total, method: 0})
	}
  return (
  	<div className='absolute w-full text-black z-50 h-screen bg-gray-300 flex justify-center items-center top-0 left-0'>
      <div className='bg-white p-7 sm:w-2/5 z-50 sm:h-3/5 rounded-xl flex justify-center items-cente flex-col'>
      	<h2 className='text-xl font-semibold py-3'>You need to pay $55 on delivery</h2>
      	<div className='py-3 flex items-center'>
      	  <label htmlFor='name'>Name</label>
      	  <input onChange={(e)=>handleDetail(e)} value={customer} className='w-full text-black ml-4 pl-3 border outline-none h-10 rounded' name='customer' type='text' placeholder='Enter your name' />
      	</div>
      	<div className='py-3 flex items-center'>
      	  <label htmlFor='name'>Phone</label>
      	  <input type='text' className='w-full text-black ml-4 pl-3 border outline-none h-10 rounded' placeholder='+12 82938 02937' />      	  
      	</div>
      	<div className='py-3 flex items-center'>
      	  <label htmlFor='address'>Address</label>
      	  <input onChange={handleDetail} value={address} className='w-full text-black ml-4 pl-3 border outline-none h-10 rounded' name='address' type='text' placeholder='Enter your address' />      	  
      	</div>
      	<div className='flex justify-center'>
      	  <button onClick={placeOrder} className='bg-green-500 px-3 text-white font-bold rounded my-4 py-2'>Order Now</button>
      	</div>
      </div>
    </div>
  )
}

export default CashOnDelivery