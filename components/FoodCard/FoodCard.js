import Link from 'next/link'

function FoodCard({item}) {
  return (
  	<Link href={`/item/${item._id}`}>
  	<div className='shadow bg-background-color-light w-64 mx-2 rounded-xl my-6 overflow-hidden cursor-pointer hover:shadow-md transition  hover:-translate-y-1 delay-150'>
  	 <img src={item.img} className='object-cover h-48 w-full bg-orange-300'/>
  	 <div className='p-3'>
  	 	 <h4 className='flex justify-center text-xl text-gray-600 font-bold'>$ {item.prices[0]}</h4>
	  	 <div className='flex justify-between'>
	  	  <h3 className='font-semibold'>{item.title}</h3>
	  	  <div>
	  	   <span className='bg-green-500 p-0 text-sm py-0.5 px-1 text-white rounded'>4.6</span>
	  	  </div>	  	  
	  	 </div>
	  	 <p className='text-gray-400 py-1'>{item.desc}</p>		 
		 <h5 className='py-1'>chennai, Dharmapuri</h5>
		 <hr className='mt-2'/>
	 </div>
		 <div className='py-1 text-sm flex justify-center'>
		  3335 orders placed recently!
		 </div>	  	 
    </div>
    </Link>
  )
}

export default FoodCard