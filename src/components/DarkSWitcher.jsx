'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Moon, Sun } from 'lucide-react'; // تأكد من استيراد الأيقونات الصح

const DarkSWitcher = () => {
    const [theme, setTheme] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') || 'light';
        setTheme(stored);
        if (stored === 'dark') document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
        if (isAnimating) return;
        setIsAnimating(true);

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
            }, 350); 
        });

        // وقت الأنيميشن الكلي
        setTimeout(() => setIsAnimating(false), 1100);
    };

    if (!mounted || theme === null) return <div className="h-7 w-7" />;

    return (
        <>
            {/* الـ Portal لازم يكون برا الـ AnimatePresence عشان يترسم في الـ Body */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isAnimating && (
                        <motion.div
                            key="shutter-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ 
                                opacity: 0,
                                scale: 1.1,
                                filter: "blur(15px)"
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="fixed inset-0 z-[999999] bg-primary flex flex-col items-center justify-center pointer-events-none"
                        >
                            {/* أيقونة الشمس/القمر اللي بتلف */}
                            <motion.div
                                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                                className="mb-4 text-white"
                            >
                                {theme === 'dark' ? <Sun size={80} strokeWidth={2.5} /> : <Moon size={80} strokeWidth={2.5} />}
                            </motion.div>

                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="text-white text-5xl font-black italic tracking-tighter"
                            >
                                SOUQNA
                            </motion.div>
                            
                            <div className="mt-6 loading loading-ring loading-lg text-white/50"></div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <label className="swap swap-rotate text-gray-800 dark:text-gray-200">
                <input 
                    type="checkbox" 
                    onChange={toggleTheme} 
                    checked={theme === 'dark'}
                    className="hidden" 
                />
                <Sun className="swap-on h-7 w-7" />
                <Moon className="swap-off h-7 w-7" />
            </label>
        </>
    );
};

export default DarkSWitcher;