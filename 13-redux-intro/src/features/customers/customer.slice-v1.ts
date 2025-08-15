
type CustomerState = {
    fullName: string,
    nationalID: string,
    createdAt: string
}

type CustomerAction =
    | { type: 'customer/createCustomer', payload: { fullName: string, nationalID: string, createdAt: string } }
    | { type: 'customer/updateName', payload: string }

const initCustomerState: CustomerState = {
    fullName: '',
    nationalID: '',
    createdAt: ''
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

function createCustomer(fullName: string, nationalID: string): CustomerAction {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

function updateName(fullName: string): CustomerAction {
    return { type: 'customer/updateName', payload: fullName }
}

export { createCustomer, updateName, customerReducer }