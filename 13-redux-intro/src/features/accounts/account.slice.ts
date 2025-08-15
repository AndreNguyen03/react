import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppThunk } from '../../store'

const initState: AccountState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false
}

type AccountState = {
    balance: number,
    loan: number,
    loanPurpose: string,
    isLoading: boolean
}

const accountSlice = createSlice({
    name: 'account',
    initialState: initState,
    reducers: {
        deposit(state: AccountState, action: PayloadAction<number>) {
            state.balance += action.payload
            state.isLoading = false
        },
        withdraw(state: AccountState, action: PayloadAction<number>) {
            state.balance -= action.payload
        },
        requestLoan(state: AccountState, action: PayloadAction<{ amount: number, purpose: string }>) {
            if (state.loan > 0) return;

            state.loan = action.payload.amount
            state.loanPurpose = action.payload.purpose
            state.balance += action.payload.amount
        },
        payLoan(state: AccountState) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        convertingCurrency(state: AccountState) {
            state.isLoading = true;
        }
    }
})

export const { withdraw, requestLoan, payLoan } = accountSlice.actions

export default accountSlice.reducer

type AccountAction =
    | { type: 'account/deposit', payload: number }
    | { type: 'account/withdraw', payload: number }
    | { type: 'account/requestLoan', payload: { amount: number, purpose: string } }
    | { type: 'account/payLoan' }
    | { type: 'account/convertingCurrency' }

// const initAccountState: AccountState = {
//     balance: 0,
//     loan: 0,
//     loanPurpose: '',
//     isLoading: false
// }

// function accountReducer(state: AccountState = initAccountState, action: AccountAction) {
//     switch (action.type) {
//         case 'account/deposit':
//             return { ...state, balance: state.balance + action.payload, isLoading: false }
//         case 'account/withdraw':
//             return { ...state, balance: state.balance - action.payload }
//         case 'account/requestLoan':
//             if (state.loan > 0) return state;
//             return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose }
//         case 'account/payLoan':
//             return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
//         case 'account/convertingCurrency':
//             return { ...state, isLoading: true }
//         default:
//             return state;
//     }
// }

export function deposit(amount: number, currency: string): AccountAction | AppThunk {
    if (currency === 'USD')
        return { type: 'account/deposit', payload: amount }

    return async function (dispatch) {
        // API call
        try {
            dispatch({ type: 'account/convertingCurrency' })

            const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
            const data = await response.json();
            const converted = data.rates.USD;

            dispatch({ type: 'account/deposit', payload: converted })
        } catch (error) {
            console.error((error as Error).message)
        }
    }
}
// function withdraw(amount: number): AccountAction {
//     return { type: 'account/withdraw', payload: amount }
// }
// function requestLoan(amount: number, purpose: string): AccountAction {
//     return { type: 'account/requestLoan', payload: { amount, purpose } }
// }
// function payLoan(): AccountAction {
//     return { type: 'account/payLoan' }
// }

// export { deposit, withdraw, requestLoan, payLoan, accountReducer }