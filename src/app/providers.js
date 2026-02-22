// src/app/providers.jsx
'use client';

import { ToastProvider } from '@/context/ToastContext';
import '../i18n';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <WishlistProvider>
        <ToastProvider >
          {children}
        </ToastProvider >
      </WishlistProvider>
    </AuthProvider>
  )
}
