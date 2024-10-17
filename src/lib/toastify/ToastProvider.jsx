"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";
import { ToastContainer } from "react-toastify";

export default function ToastProvider({ children }) {
    const contextClass = {
        success: "bg-blue-600",
        error: "bg-red-600",
        info: "bg-gray-600",
        warning: "bg-orange-400",
        default: "bg-indigo-600",
    };

    return (
        <>
            {children}
            <ToastContainer position="top-center" autoClose={3000} limit={1}/>
        </>
    );
}