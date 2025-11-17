"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "@/components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback(({ message, type = "info" }) => {
    setToast({ message, type });
}, []);

    const hideToast = () => setToast(null);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
                <Toast
                    message={toast?.message}
                    type={toast?.type}
                    onClose={hideToast}
                />
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
