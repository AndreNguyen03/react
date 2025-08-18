import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.slice'
import cartReducer from './features/cart/cart.slice'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
	reducer: {
		user: userReducer,
        cart: cartReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store, useAppDispatch, useAppSelector }
