import styles from '../../styles/item.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addItem } from '../../features/cartSlice'
import { url } from '../../network/network'

function ItemDetail({item}) {
	const [size, setSize] = useState(0)
  const [price, setPrice] = useState(item.prices[0])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch()
	
  const changePrice = (diff) => {
    setPrice(price + diff)
  }

  const handleSize = (sizeIndex) => {
    const diff = item.prices[sizeIndex] - item.prices[size]
    setSize(sizeIndex)
    changePrice(diff)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked
    if(checked) {
      changePrice(option.price)
      setExtras((prev)=> [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  const handleAddQuantity = () => {
    dispatch(addItem({...item, extras, price, quantity}))
  }
  return (
  <div className={`sm:flex p-3`}>
  	<div className='flex justify-center items-center basis-1/2'>
  	    <img src={item.img} className='p-2'/>
  	</div>
  	<div className='basis-1/2 flex flex-col justify-center p-3'>
    
  	   <h2 className='py-3 text-3xl font-bold'>{item.title}</h2>
  	   <span className='text-app-color text-xl py-4 font-semibold'>$ {price}</span>
  	   <p className='py-3 text-xl'>{item.desc}</p>
       <h3 className='text-xl font-semibold py-2'>Choose the size</h3>
       <div className='flex py-3'>
        <div className='flex justify-evenly'>
         <div className='relative cursor-pointer' onClick={() =>handleSize(0)}>
           <img src='/size.png' className={`${styles.sizeImg} w-12 h-12`} />
           <span className='absolute top-0 -right-5 px-2 bg-green-500 rounded-full text-sm text-white'>small</span>
         </div>
         <div className='relative cursor-pointer' onClick={() =>handleSize(1)}>
           <img src='/size.png' className={`${styles.sizeImg} w-16 h-16 ml-5`} />
           <span className='absolute top-0 -right-5 px-2 bg-green-500 rounded-full text-sm text-white'>medium</span>
         </div>
         <div className='relative cursor-pointer' onClick={() =>handleSize(2)}>
           <img src='/size.png' className={`${styles.sizeImg} w-20 h-20 ml-5`} />
           <span className='absolute top-0 -right-5 px-2 bg-green-500 rounded-xl text-sm text-white'>large</span>
         </div>
        </div>
       </div>
       <h3 className='text-xl font-semibold py-2'>Choose Additional Ingrediants</h3>
       <div className='py-3 flex flex-col sm:flex-row text-sm'>
        { item.extras.map((option => (         
          <div key={option._id} className='flex ml-2 py-2 items-center'>
           <input onChange={(e)=>handleChange(e, option)} type='checkbox' id={option.text} name={option.text} className='h-5 w-7'/>
           <label htmlFor={option.text}>{option.text}</label>
         </div>
        )))
         
       }
        {console.log(item)}
       </div>
       <div className='py-5'>
         <input onChange={(e) => setQuantity(e.target.value)} type='number' defaultValue={1} className='h-10 w-16 outline-none border p-1 rounded text-center text-black'/>
         <button onClick={handleAddQuantity} className='py-2 cursor-pointer px-4 ml-5 rounded font-bold text-white bg-app-color'>Add to cart</button>
       </div>
  	</div>
   </div>
  )
}

export default ItemDetail

export const getServerSideProps = async ({params}) => {
  const res = await url.get(`/api/items/${params.id}`)
  const item = res.data
  return {
    props: {
      item
    }
  }
}