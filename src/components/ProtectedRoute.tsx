
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import jwtDecode from "jwt-decode";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = localStorage.getItem("authToken") !== null;

    const token = localStorage.getItem("authToken");
    let isExpired = false;
    if (token) {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        isExpired = decoded.exp < currentTime;
    }

  return isAuthenticated && !isExpired ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute
