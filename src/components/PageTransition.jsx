'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [isPending, setIsPending] = useState(false);

    // تأثير التنقل بين الصفحات
    useEffect(() => {
        setIsPending(true);
        const timer = setTimeout(() => setIsPending(false), 700); // وقت الأنيميشن
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isPending && (
                    <motion.div
                        key="loader"
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] bg-primary flex flex-col items-center justify-center"
                    >
                        {/* لوجو سوقنا في نص الشاشة وقت التحميل */}
                        <div className="text-white text-4xl font-black italic tracking-tighter">
                            SOUQNA
                        </div>
                        <div className="mt-4 loading loading-ring loading-lg text-white"></div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </>
    );
}