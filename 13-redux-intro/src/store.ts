import { configureStore, type AnyAction } from "@reduxjs/toolkit"
import accountReducer from "./features/accounts/account.slice"
import customerReducer from "./features/customers/customer.slice"
import { type ThunkAction } from "redux-thunk"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector }