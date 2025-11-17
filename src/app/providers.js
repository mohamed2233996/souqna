// src/app/providers.jsx
'use client';

import { ToastProvider } from '@/context/ToastContext';
import '../i18n';
export default function Providers({ children }) {
  return (
    <ToastProvider >
      {children}
    </ToastProvider >
  )
}
