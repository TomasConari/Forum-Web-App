import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

export const ProtectedRoute = () => {
    const [Auth, setAuth] = useState(false);

    return Auth ? <Outlet /> : <Navigate to="/" />;
};