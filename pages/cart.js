import styles from '../styles/cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../features/cartSlice";
import CashOnDelivery from '../components/CashOnDelivery/CashOnDelivery'
import { url } from '../network/network'

function Cart() {
    const [show, setShow] = useState(false)
    const [cash, setCash] = useState(false)
    const { items, total }  = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const amount =  total;
    const currency = "USD";
    const style = {"layout":"vertical"}; 
    const router = useRouter();

    const createOrder = async (data) => {
    try {
      const res = await axios.post("/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/order/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
   };  

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                         const shipping = details.purchase_units[0].shipping;
                          createOrder({
                            customer: shipping.name.full_name,
                            address: shipping.address.address_line_1,
                            total: cart.total,
                            method: 1,
                          });
                    });
                }}
            />
        </>
      );
    }
  return (
  	<div className='sm:flex'>
      <div className='sm:basis-3/4 p-4'>
        <table className='w-full'>
         <tbody>
          <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Extras</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
          </tr>        
          {items.map(item => (
            <tr key={item._id} className='p-2'>
             <td className='flex justify-center'><img src={item.img} className='h-12 w-12 sm:h-24 sm:w-24 object-cover object-center rounded-full ' /></td>
             <td className='text-center'>{item.title}</td>
             <td className='text-center'>{item.extras.map((extra,i) => (<span key={i}>{extra.text}, </span>))}</td>
             <td className='text-center'>$ {item.price}</td>
             <td className='text-center'>{item.quantity}</td>
             <td className='text-center'>$ {item.price * item.quantity}</td>
            </tr>
          ))}    
         </tbody>
        </table>
      </div>
      <div className='sm:basis-1/4 m-3'>
       <div className='flex justify-center'>
       <div className='bg-black text-white p-4 m-3 rounded-xl w-3/4 sm:w-full'>
           <h2 className='font-bold text-xl py-2 flex justify-center'>CART TOTAL</h2>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <span  className='mr-3 font-semibold'>Subtotal:</span>
	         <span>$ {total}</span>
	       </div>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <span className='mr-3 font-semibold'>Discount:</span>
	         <span>$ 0.0</span>
	       </div>
	       <div className='flex justify-center py-1 xl:py-2'>
	         <span className='mr-3 font-semibold'>Total:</span>
	         <span>$ {total}</span>
	       </div>
	       <div className='flex flex-col justify-center py-1 xl:py-2'>
          {show ? (
          <div>
          <div className='z-10'>
           <button onClick={()=>setCash(true)} className='px-2 my-2 bg-blue-600 border-none outline-none cursor-pointer py-1.5 w-full font-bold rounded'>Cash on delivery</button>
          </div>
          <PayPalScriptProvider
                options={{
                    "client-id": "test",
                    components: "buttons",
                    currency: "USD"
                }}
            >
          <ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
          </PayPalScriptProvider>
         </div>
          ) : (
           <div className='w-full'>
             <button onClick={()=>setShow(true)} className='px-2 my-2 bg-green-600 border-none outline-none cursor-pointer py-2 w-full font-bold rounded'>Checkout Now</button>
           </div>  
          )}                  
        </div>
       </div>
       </div>
      </div>
      {cash && <CashOnDelivery total={total} createOrder={createOrder} />}
    </div>
  )
}

export default Cart
