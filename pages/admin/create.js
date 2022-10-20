import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../../network/network'

function Create() {
	  const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extras, setExtras] = useState(null)

    const router = useRouter()

	const handleExtraInput = (e) =>{
		setExtras({...extras, [e.target.name]: e.target.value})
	}
	const handleExtra = (e) => {
		setExtraOptions(prev => [...prev, extras])
	}
	const changePrice = (e, index) => {
      const currentPrices = prices;
      currentPrices[index] = e.target.value;
      setPrices(currentPrices);
    };
	const handleCreate = async () => {
		const data = new FormData()		
		data.append("file", file)
		data.append("upload_preset", "foodApp")
		try {
			const dataRes = await axios.post("https://api.cloudinary.com/v1_1/dzyhtuc5s/image/upload",
				data
			)
			const config = dataRes.data
        	const newItem = {
              title,
              desc,
              prices,
              extras,
              img: config.url,
            }
            console.log(newItem)
            await url.post("/api/items", newItem);
            router.push("/admin")
		}catch(err){
			console.log(err)
		}
	}
	
  return (
  	<div className='p-4 m-4 flex justify-center items-center'>
  	 <div className='rounded-xl bg-background-color-light sm:w-3/5 shadow-xl p-6'>
      <h2 className='py-1 m-2 sm:text-4xl text-2xl font-bold'>Create new item</h2>
      <div className='p-2'>
        <h4 className='my-2 font-semibold'>Choose product image</h4>
        <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
      </div>
      <div className='my-2 p-2'>
        <label className='font-semibold'>Title</label>
        <input onChange={(e)=>setTitle(e.target.value)} className='bg-background-color-light pl-2 w-full h-11 rounded hover:border-sky-600 border outline-none' placeholder='Enter item name'/>
      </div>
      <div className='my-2 p-2'>
        <label className='font-semibold'>Desc</label>      
        <input onChange={(e)=>setDesc(e.target.value)} className='bg-background-color-light pl-2 w-full h-11 rounded hover:border-sky-600 border outline-none' placeholder='Give some info..'/>
      </div>
      <div className='my-2 p-2'>
      <label className='font-semibold'>Prices</label>
        <input onChange={(e)=>changePrice(e, 0)} type='number' placeholder='small' className='h-9 m-3 w-16 outline-none border rounded pl-2 bg-background-color-light'/>
        <input onChange={(e)=>changePrice(e, 1)} type='number' placeholder='medium' className='h-9 m-3 w-16 outline-none border rounded pl-2 bg-background-color-light'/>
        <input onChange={(e)=>changePrice(e, 2)} type='number' placeholder='large' className='h-9 m-3 w-16 outline-none border rounded pl-2 bg-background-color-light'/>
      </div>
      <div className='my-2 p-2'>
        <label className='font-semibold'>Extras</label>
         <input onChange={handleExtraInput} name='text' placeholder='item' className='w-32 h-9 rounded border outline-none m-2 pl-2 bg-background-color-light'/>
         <input onChange={handleExtraInput} name='price' placeholder='price' type='number' className='h-9 outline-none rounded w-16 m-2 pl-2 border bg-background-color-light'/>
         <button onClick={handleExtra} className='bg-indigo-600 m-2 outline-none text-white font-bold px-3 py-1.5 rounded cursor-pointer'>Add</button>
      </div>
      <div className='my-2 p-2 flex flex-wrap'>
            {extraOptions.map((option) => (
              <span key={`${option.text}+ ${Math.random()}`} className='bg-pink-500 px-3 py-1 m-2 text-white rounded'>
                {option.text}
              </span>
            ))}
      </div>
      <div className='flex justify-end'>
        <button onClick={handleCreate} className='m-2 bg-teal-600 rounded font-bold text-white px-3 py-2'>Create</button>
      </div>
     </div>
    </div>
  )
}

export default Create