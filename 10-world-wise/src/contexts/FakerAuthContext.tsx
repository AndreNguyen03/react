import { createContext, useReducer } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextType = {
    user: User | null,
    isAuthenticated: boolean
    login: (email: string, password: string) => void,
    logout: () => void
}

type User = {
    name: string,
    email: string,
    password: string,
    avatar: string
}

type State = {
    user: User | null,
    isAuthenticated: boolean
}

type Action =
    | { type: 'login', payload: User }
    | { type: 'logout' }

const initState: State = {
    user: null,
    isAuthenticated: false,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true }
        case 'logout':
            return { ...state, user: null, isAuthenticated: false }
        default:
            throw new Error('Unknown action type')
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }: { children: React.ReactNode }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initState)

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER })
        }
    }

    function logout() {
        dispatch({ type: 'logout' })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }