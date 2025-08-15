import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type CustomerState = {
    fullName: string,
    nationalID: string,
    createdAt: string
}

const initCustomerState: CustomerState = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}

const customerSlice = createSlice({
    name: 'customer',
    initialState: initCustomerState,
    reducers: {
        createCustomer(state: CustomerState, action: PayloadAction<{ fullName: string, nationalID: string }>) {
            state.fullName = action.payload.fullName
            state.nationalID = action.payload.nationalID
            state.createdAt = new Date().toISOString()
        },
        updateName(state: CustomerState, action: PayloadAction<string>) {
            state.fullName = action.payload
        }
    }
})


export const { createCustomer, updateName } = customerSlice.actions

export default customerSlice.reducer