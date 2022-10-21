import axios from 'axios'

export const url = axios.create({
	baseURL : "https://food-order-next.vercel.app/"
})
