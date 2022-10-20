import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { url } from '../../network/network'

function Login() {
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)
	const router = useRouter() 

	const handleLogin = async() =>{
		try{
		   await url.post("/api/login", {name, password})
		   router.push("/admin/")
		} catch(err){
			console.log(err)
			setError(true)
		}
	}
  return (
  	<div className='flex justify-center items-center sm:p-24 relative'>
     <div className='shadow-lg rounded-xl bg-background-color-light'>
      <h2 className='text-2xl font-bold p-3 flex justify-center'>LogIn</h2>
      <div className='p-4 m-2'>
        <label>Username</label>
        <input onChange={(e)=>setName(e.target.value)} className='mx-3 text-black h-10 border outline-none rounded pl-2'/>
      </div>
      <div className='p-4 m-2'>
        <label>Password</label>
        <input onChange={(e)=>setPassword(e.target.value)} type='password' className='h-10 text-black mx-3 border rounded pl-2 outline-none'/>
      </div>
      <div className='flex justify-center'>
        <button onClick={handleLogin} className='bg-teal-600 outline-none py-2 px-5 my-3 rounded cursor-pointer font-bold text-white'>Login</button>
      </div>
     </div>
     {error && <div className='w-48 p-3 bg-red-5 text-red-600 rounded border border-red-600 flex justify-center bottom-2 absolute'>wrong credentils</div>}
    </div>
  )
}

export default Login