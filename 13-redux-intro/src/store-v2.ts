import { applyMiddleware, combineReducers, createStore, type AnyAction } from "redux"
import { reducer } from "./features/accounts/account.slice"
import { customerReducer } from "./features/customers/customer.slice-v1"
import { thunk, type ThunkAction } from "redux-thunk"
import { composeWithDevTools } from "@redux-devtools/extension"

const rootReducer = combineReducers({
    account: reducer,
    customer: customerReducer
})

const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)))

// 🔹 Type của store
export type AppStore = typeof store

// 🔹 Type của toàn bộ state trong store
export type RootState = ReturnType<typeof rootReducer>

// 🔹 Type của dispatch
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

export { store }