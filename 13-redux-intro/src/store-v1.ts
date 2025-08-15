import { combineReducers, createStore } from "redux"

type AccountState = {
    balance: number,
    loan: number,
    loanPurpose: string,
}

type CustomerState = {
    fullName: string,
    nationalID: string,
    createdAt: string
}

type AccountAction =
    | { type: 'account/deposit', payload: number }
    | { type: 'account/withdraw', payload: number }
    | { type: 'account/requestLoan', payload: { amount: number, purpose: string } }
    | { type: 'account/payLoan' }

type CustomerAction =
    | { type: 'customer/createCustomer', payload: { fullName: string, nationalID: string, createdAt: string } }
    | { type: 'customer/updateName', payload: string }

const initAccountState: AccountState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
}

const initCustomerState: CustomerState = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}



function reducer(state: AccountState = initAccountState, action: AccountAction) {
    switch (action.type) {
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload }
        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload }
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return { ...state, balance: state.balance + action.payload.amount, loan: action.payload.amount, loanPurpose: action.payload.purpose }
        case 'account/payLoan':
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
        default:
            return state;
    }
}

function customerReducer(state: CustomerState = initCustomerState, action: CustomerAction) {
    switch (action.type) {
        case 'customer/createCustomer':
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
        case 'customer/updateName':
            return { ...state, fullName: action.payload }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    account: reducer,
    customer: customerReducer
})

const store = createStore(rootReducer)
// store.dispatch({ type: 'account/deposit', payload: 500 })

// console.log(store.getState())

// store.dispatch({ type: 'account/withdraw', payload: 200 })

// console.log(store.getState())

// store.dispatch({ type: 'account/requestLoan', payload: { amount: 1000, purpose: 'buy a car' } })

// console.log(store.getState())

// store.dispatch({ type: 'account/payLoan' })
// console.log(store.getState())

function deposit(amount: number): AccountAction {
    return { type: 'account/deposit', payload: amount }
}
function withdraw(amount: number): AccountAction {
    return { type: 'account/withdraw', payload: amount }
}
function requestLoan(amount: number, purpose: string): AccountAction {
    return { type: 'account/requestLoan', payload: { amount, purpose } }
}
function payLoan(): AccountAction {
    return { type: 'account/payLoan' }
}

store.dispatch(deposit(500))
store.dispatch(withdraw(200))
store.dispatch(requestLoan(1000, 'buy a carr'))
store.dispatch(payLoan())

function createCustomer(fullName: string, nationalID: string): CustomerAction {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

function updateName(fullName: string): CustomerAction {
    return { type: 'customer/updateName', payload: fullName }
}

store.dispatch(createCustomer('Ngoc anh dep trai thich gia phuc dep gai', '1231233223'))
store.dispatch(deposit(250))
store.dispatch(updateName('Ngoc anh dep trai nho gia phuc qua di!!!'))