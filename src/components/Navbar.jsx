'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import DarkSWitcher from './DarkSWitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// تم الاستغناء عن useLogo لمنع الـ Infinite Re-renders
import SidebarCart from './SidebarCart';
import { supabase } from '../../lib/supabaseClient';
import UserDropdown from './UserDropdown';

const Navbar = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data.user));
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <nav className="bg-white/90 border-b border-gray-200 dark:bg-black/90 dark:border-gray-800 fixed top-0 z-[40] w-full shadow-md backdrop-blur-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                {/* 1. اللوجو الذكي (بيغير نفسه بالـ CSS بدون JS) */}
                <Link href="/" className="flex items-center" aria-label="Home">
                    {/* لوجو العربي - يظهر فقط في العربي */}
                    {isArabic ? (
                        <>
                            <Image 
                                src="/logos/logo-ar-white.png" 
                                alt="سوقنا" width={55} height={55} priority 
                                className="dark:hidden object-contain"
                            />
                            <Image 
                                src="/logos/logo-ar-dark.png" 
                                alt="سوقنا" width={55} height={55} priority 
                                className="hidden dark:block object-contain"
                            />
                        </>
                    ) : (
                        /* لوجو الإنجليزي - يظهر فقط في الإنجليزي */
                        <>
                            <Image 
                                src="/logos/logo-en-white.png" 
                                alt="Souqna" width={55} height={55} priority 
                                className="dark:hidden object-contain"
                            />
                            <Image 
                                src="/logos/logo-en-dark.png" 
                                alt="Souqna" width={55} height={55} priority 
                                className="hidden dark:block object-contain"
                            />
                        </>
                    )}
                </Link>

                <div className="hidden sm:flex items-center gap-8">
                    <Link href="/shop" className="text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('buy')}</Link>
                    <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('contact')}</Link>
                    <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('about')}</Link>
                </div>

                {/* البحث */}
                <div className="relative w-64 hidden md:block">
                    <input
                        type="text"
                        placeholder={t('search') || "Search..."}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 dark:text-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                </div>

                {/* الأزرار الجانبية */}
                <div className="hidden sm:flex items-center gap-4">
                    <DarkSWitcher />
                    <LanguageSwitcher />
                    {user ? (
                        <UserDropdown user={user} />
                    ) : (
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition active:scale-95"
                        >
                            {t('login')}
                        </button>
                    )}
                    <SidebarCart />
                </div>

                {/* موبايل منيو */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                    className="sm:hidden text-gray-700 dark:text-gray-200 p-2"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* القائمة (موبايل) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-4 py-6">
                            <div className="w-[90%] mb-2">
                                <input
                                    type="text"
                                    placeholder={t('search')}
                                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:text-white dark:bg-gray-800 px-4 py-2 text-sm"
                                />
                            </div>
                            <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-lg font-medium dark:text-white">{t('buy')}</Link>
                            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-lg font-medium dark:text-white">{t('contact')}</Link>
                            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-lg font-medium dark:text-white">{t('about')}</Link>
                            
                            <div className="flex items-center gap-6 mt-4 p-4 border-t dark:border-gray-800 w-full justify-center">
                                <DarkSWitcher />
                                <LanguageSwitcher />
                                <SidebarCart />
                            </div>
                            
                            {!user && (
                                <button
                                    onClick={() => router.push('/auth/login')}
                                    className="w-[80%] py-3 bg-primary text-white rounded-xl font-bold"
                                >
                                    {t('login')}
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;