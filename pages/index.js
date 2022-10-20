import Head from 'next/head'
import axios from 'axios'
import Featured from '../components/Featured/Featured'
import FoodList from '../components/FoodList/FoodList'
import ImgSlide from '../components/ImgSlide/ImgSlide'
import { url } from '../network/network'
import { useState, useEffect } from 'react'

function Home() {
	const [items, setItems] = useState([])
	useEffect(()=>{
		const getItems = async ()=>{
			const res = await url.get('/api/items')
			setItems(res.data)
			console.log(res.data)
		}
		getItems()
	},[])
	console.log(items)
  return (
  	<>
      <Featured />
      <ImgSlide />
      <FoodList items={items}/>
    </>
  )
}

export default Home

