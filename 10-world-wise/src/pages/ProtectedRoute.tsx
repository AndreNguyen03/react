import { useEffect, type ReactNode } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/')
    }, [isAuthenticated, navigate])

    return isAuthenticated ? children : null
}

export { ProtectedRoute }