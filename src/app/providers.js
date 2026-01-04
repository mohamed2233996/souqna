// src/app/providers.jsx
'use client';

import { ToastProvider } from '@/context/ToastContext';
import '../i18n';
import { AuthProvider } from '@/context/AuthContext';
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider >
        {children}
      </ToastProvider >
    </AuthProvider>
  )
}
