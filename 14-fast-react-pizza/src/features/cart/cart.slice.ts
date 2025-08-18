import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItemType } from '../../types'
import type { RootState } from '../../store'

type CartState = {
	cart: CartItemType[]
}

const initState: CartState = {
	cart: []
	// cart: [
	// 	{
	// 		pizzaId: 12,
	// 		name: 'Mediterranean',
	// 		quantity: 2,
	// 		unitPrice: 16,
	// 		totalPrice: 32
	// 	}
	// ]
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initState,
	reducers: {
		addItem(state: CartState, action: PayloadAction<CartItemType>) {
			state.cart.push(action.payload)
		},
		deleteItem(state: CartState, action: PayloadAction<number>) {
			state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
		},
		increateItemQuantity(state: CartState, action: PayloadAction<number>) {
			state.cart = state.cart.map((item) => {
				if (item.pizzaId === action.payload) {
					item.quantity++
					item.totalPrice = item.quantity * item.unitPrice
				}

				return item
			})
		},
		decreateItemQuantity(state: CartState, action: PayloadAction<number>) {
			state.cart = state.cart.map((item) => {
				if (item.pizzaId === action.payload) {
					item.quantity--
					item.totalPrice = item.quantity * item.unitPrice
				}
				return item
			}).filter(item => item.quantity > 0)
		},
		clearCart(state: CartState) {
			state.cart = []
		}
	}
})

export const { addItem, deleteItem, increateItemQuantity, decreateItemQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

export const getTotalCartQuantity = (state: RootState) =>
	state.cart.cart.reduce((acc: number, item: CartItemType) => acc + item.quantity, 0)

export const getTotalCartPrice = (state: RootState) =>
	state.cart.cart.reduce((acc: number, item: CartItemType) => acc + item.totalPrice, 0)

export const getCart = (state: RootState) => state.cart.cart

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
	state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
