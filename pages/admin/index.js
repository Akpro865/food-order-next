import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link'
import { url } from '../../network/network'

function Admin({items, orders}) {
	const [ItemsList, setItemsList] = useState(items)
	const [OrdersList, setOrdersList] = useState(orders)
	const status = ['preparing', 'picking up', 'delivered']
	const handleDelete = async (id) => {
		try {
			const res = await axios.delete(`/api/items/${id}`)
			setItemsList(items.filter((item) => item._id !== id))
		} catch (err) {
			console.log(err)
		}		
	}
	const handleStatus = async (id) => {
		const oneOrder = OrdersList.filter((order) => order._id === id)[0];
		const currentStat = oneOrder.status
		try{
			const res = await axios.put(`/api/orders/${id}`, {status: currentStat + 1})
			setOrdersList([
				res.data,
				...OrdersList.filter((order) =>order._id !== id)
			])
		} catch(err) {
			console.log(err)
		}
	}
  return (
  	<div>
  	 <div className='flex justify-end'>
  	 <Link href='/admin/create'>
  	   <button className='mr-8 font-bold text-white my-2 mt-5 bg-teal-600 rounded cursor-pointer py-1.5 px-4'>Create</button>
  	 </Link>
  	 </div>
  	 <div className='flex flex-col sm:flex-row justify-center'>
  	  <div className='basis-1/2 p-2 m-2 bg-background-color-light rounded-xl shadow-xl mt-4 sm:m-4'>
  	  	<h2 className='flex justify-center text-2xl font-bold py-3 text-app-color'>Items</h2>
  	  	<table className='w-full'>
         <tbody>
          <tr>
          <th className='py-3'>Item</th>
          <th>Id</th>
          <th>Title</th>
          <th>Price</th>
          <th>Action</th>
          </tr>        
          {items.map(item => (
            <tr key={item._id} className='p-2 text-center'>
             <td className='py-2 flex justify-center'><img src={item.img} className='h-12 w-12 sm:h-24 sm:w-24 object-cover object-center rounded-full ' /></td>
             <td>{item._id.slice(0,6)}..</td>
             <td>{item.title}</td>
             <td>{item.prices[0]}</td>
             <td className=''>
               <div className='flex justify-center'>
             	<div>
             	<button className='bg-green-500 px-1.5 mr-1 rounded text-white'>Edit</button>
             	</div>
             	<div>
             	<button className='bg-red-500 px-1.5 rounded text-white' onClick={()=>handleDelete(item._id)}>Del</button>
             	</div>
               </div>
             </td>
            </tr>
          ))}    
         </tbody>
        </table>
      </div>
      <div className='basis-1/2'>
      	<div className=' p-2 bg-background-color-light rounded-xl shadow-xl m-2'>
      	<h2 className='flex justify-center text-2xl font-bold py-3 text-app-color'>Orders</h2>
        <table className='w-full'>
          <tbody>
            <tr className=''>
              <th className='py-3'>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orders.map((order) => (
            <tbody key={order._id}>
              <tr className='text-center'>
                <td className='py-3 px-1'>{order._id.slice(0, 6)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)} className='bg-sky-600 py-0.5 px-1 rounded'>
                    Next
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        </div>
      </div>
     </div>
    </div>
  )
}
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const itemsRes = await axios.get("/api/items/")
  const ordersRes = await axios.get("/api/orders/")
  return {
    props: {
      items: itemsRes.data,
      orders: ordersRes.data
    }
  }
}

export default Admin