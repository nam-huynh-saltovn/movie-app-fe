import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Alert } from "../components/alert/Alert";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
    const { user, isAdmin } = useSelector(state => state.user);
    const location = useLocation();

    if(!user){
        Alert( 3000, "Thông báo", "Bạn cần đăng nhập để truy cập", "warning", "OK");
        return <Navigate to="auth/login" replace state={{ from: location }} />
    }
    if(user&&!isAdmin){
        Alert( 3000, "Thông báo", "Bạn không có quyền truy cập. Hãy thử đăng nhập tài khoản khác", "warning", "OK");
        return <Navigate to="auth/login" replace state={{ from: location }} />
    }
        
    return (
        <Outlet />
    );
};
