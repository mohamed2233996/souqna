// src/app/providers.jsx
'use client';

import { ToastProvider } from '@/context/ToastContext';
import '../i18n';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import PageTransition from '@/components/PageTransition';
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <PageTransition>
      <WishlistProvider>
        <ToastProvider >
          {children}
        </ToastProvider >
      </WishlistProvider>
      </PageTransition>
    </AuthProvider>
  )
}
