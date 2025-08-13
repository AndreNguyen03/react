import { useContext } from "react";
import { AuthContext } from "../contexts";

function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('AuthCOntext was used outside the AuthProvider')
    }
    return ctx
}

export { useAuth }