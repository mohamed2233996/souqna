"use client";
import React from "react";

export default function ToastContainer({ children }) {
    return (
        <div id="toast-portal" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999999]">
            {children}
        </div>
    );
}
