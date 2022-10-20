import styles from '../../styles/order.module.css'
import Image from "next/image";
import axios from 'axios'
import { url } from '../../network/network'

function Order({order}) {
  console.log(order)
   const status = order.status;

   const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
  	<div className='sm:flex'>
      <div className='sm:basis-3/4 p-4'>
        <table className='w-full'>
         <thead>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Total</th>
         </thead>
         <tbody>
          <tr className='p-2'>
           <td className='text-center'>{order._id}</td>
           <td className='text-center'>{order.customer}</td>
           <td className='text-center'>{order.address}</td>
           <td className='text-center'>$ {order.total}</td>
          </tr>          
         </tbody>
        </table>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/checked.png" width={20} height={20} alt="" />
            </div>          
          
        </div>
        </div>
      </div>
      <div className='sm:basis-1/4'>
       <div className='bg-black text-white p-4 m-3 rounded-xl'>
           <h2 className='font-bold text-xl py-2 flex justify-center'>CART TOTAL</h2>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <span  className='mr-3 font-semibold'>Subtotal:</span>
	         <span>$ {order.total}</span>
	       </div>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <span className='mr-3 font-semibold'>Discount:</span>
	         <span>$ 0.0</span>
	       </div>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <span className='mr-3 font-semibold'>Total:</span>
	         <span>$ {order.total}</span>
	       </div>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <button className='bg-green-500 border-none outline-none cursor-pointer py-2 px-3 font-bold rounded px-2 w-full'>paid</button>
	       </div>
       </div>
      </div>
    </div>
  )
}

export default Order

export const getServerSideProps = async ({params}) => {
  const res = await url.get(`/api/orders/${params.id}`)
  const order = res.data
  return {
    props: {
      order
    }
  }
}
