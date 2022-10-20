import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	items: [],
	total: 0,
	quantity: 0,
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, {payload}) => {
			state.items.push(payload)
			state.quantity += 1
			state.total += payload.price * payload.quantity
		},
		reset: (state) => {
			state.items = []
			state.total = 0
			state.quantity = 0
		}
	}
})

export const { addItem, reset } = cartSlice.actions
export default cartSlice.reducer