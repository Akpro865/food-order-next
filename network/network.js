import axios from 'axios'

export const url = axios.create({
	baseURL : "http://localhost:3000"
})

// https://food-order-ashen.vercel.app