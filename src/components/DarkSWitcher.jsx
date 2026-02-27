'use client';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const DarkSWitcher = () => {
    const [theme, setTheme] = useState(null); // نبدأ بـ null لمنع الرعشة في البداية
    const [isAnimating, setIsAnimating] = useState(false);
    const [mounted, setMounted] = useState(false);

    // التأكد من المود عند التحميل بدون أنيميشن
    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') || 'light';
        setTheme(stored);
        if (stored === 'dark') document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return; // منع الضغط المتكرر اللي بيعمل لاج
        
        setIsAnimating(true);

        // استخدام requestAnimationFrame لضمان سلاسة التنفيذ
        requestAnimationFrame(() => {
            setTimeout(() => {
                const isDark = document.documentElement.classList.contains('dark');
                const nextTheme = isDark ? 'light' : 'dark';

                if (isDark) {
                    document.documentElement.classList.remove('dark');
                } else {
                    document.documentElement.classList.add('dark');
                }

                localStorage.setItem('theme', nextTheme);
                setTheme(nextTheme);
            }, 300); // التوقيت ده مثالي مع الـ opacity
        });

        setTimeout(() => setIsAnimating(false), 900);
    };

    if (!mounted || theme === null) return <div className="h-7 w-7" />;

    return (
        <>
            {/* استخدام الـ Portal خارج الـ Label تماماً */}
            {isAnimating && createPortal(
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[999999] bg-primary flex flex-col items-center justify-center pointer-events-none"
                    style={{ backfaceVisibility: 'hidden' }} // تحسين أداء كارت الشاشة
                >
                    <div className="text-white text-6xl font-black italic tracking-tighter">SOUQNA</div>
                    <div className="mt-4 loading loading-ring loading-lg text-white"></div>
                </motion.div>,
                document.body
            )}

            <label className="swap swap-rotate text-gray-800 dark:text-gray-200">
                <input 
                    type="checkbox" 
                    onChange={toggleTheme} 
                    checked={theme === 'dark'}
                    className="hidden" // إخفاء الـ input الأصلي تماماً
                />
                {/* Sun icon */}
                <svg className="swap-on h-7 w-7 fill-current" viewBox="0 0 24 24">
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                {/* Moon icon */}
                <svg className="swap-off h-7 w-7 fill-current" viewBox="0 0 24 24">
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
            </label>
        </>
    );
};

export default DarkSWitcher;