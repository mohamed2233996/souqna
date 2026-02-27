'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom'; // مهم جداً

const DarkSWitcher = () => {
    const [theme, setTheme] = useState('light');
    const [isAnimating, setIsAnimating] = useState(false);
    const [mounted, setMounted] = useState(false); // للتأكد إننا في الكلاينت

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsAnimating(true);
        
        setTimeout(() => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                setTheme('light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                setTheme('dark');
            }
        }, 300);

        setTimeout(() => setIsAnimating(false), 800);
    }

    // مكون الستارة اللي هيخرج بره الـ Navbar
   // المكون اللي بيخرج بالـ Portal
const Overlay = () => (
    <AnimatePresence>
        {isAnimating && (
            <motion.div
                // استخدمنا opacity و scale بدل clipPath لأنهم Hardware Accelerated
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ willChange: 'opacity' }} // بتعرف المتصفح يجهز كارت الشاشة
                className="fixed inset-0 z-[999999] bg-primary flex flex-col items-center justify-center pointer-events-none"
            >
                {/* أنيميشن اللوجو خليه خفيف */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white text-6xl font-black italic tracking-tighter"
                >
                    SOUQNA
                </motion.div>
                
                {/* لودر صغير يدور عشان اليوزر ميحسش إن الموقع وقف */}
                <div className="mt-4 loading loading-ring loading-lg text-white"></div>
            </motion.div>
        )}
    </AnimatePresence>
);

    if (!mounted) return null;

    return (
        <>
            {/* إرسال الستارة لآخر الـ body */}
            {createPortal(<Overlay />, document.body)}

            <label className="swap swap-rotate text-gray-800 dark:text-gray-200">
                <input 
                    type="checkbox" 
                    onChange={toggleTheme} 
                    checked={theme === 'dark'}
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
}

export default DarkSWitcher;