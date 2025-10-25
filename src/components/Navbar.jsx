'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import DarkSWitcher from './DarkSWitcher';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogo } from '@/hooks/logoLoad';


const Navbar = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const logoSrc = useLogo();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white/90 border-b border-gray-200 dark:bg-black/90 dark:border-gray-800 fixed top-0 z-[1000] w-full shadow-md backdrop-blur-md">
            <div className={`max-w-screen-xl text-center px-4 py-3 flex items-center justify-between`}>

                {/*  اللوجو */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={logoSrc}
                        alt="Logo"
                        width={55}
                        height={55}
                        priority
                    />
                </Link>

                {/*  اللينكات في النص */}
                <div className="hidden sm:flex items-center gap-8">
                    <Link href="/buy" className="text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('buy')}</Link>
                    <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('contact')}</Link>
                    <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('about')}</Link>
                </div>

                <div className="relative w-64 hidden sm:block">

                    <input
                        type="text"
                        placeholder={t('search') || "Search..."}
                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 
                            bg-gray-50 dark:bg-gray-900 dark:text-white
                            px-4 py-2 text-sm 
                            shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/*  الدارك + اللغة في الآخر */}
                <div className="hidden sm:flex items-center gap-4">
                    <DarkSWitcher />
                    <LanguageSwitcher />
                </div>

                {/*  زر الهامبورجر (موبايل) */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden text-gray-700 dark:text-gray-200"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>


            {/*  القائمة (موبايل) */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="sm:hidden flex flex-col items-center gap-4 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black"
                    >
                        {menuOpen && (
                            <div className="sm:hidden flex flex-col items-center gap-4 py-4 border-gray-200 dark:border-gray-700 transition-all">
                                {/* 🔍 البحث (موبايل) */}
                                <div className="w-[90%]">
                                    <input
                                        type="text"
                                        placeholder={t('search') || "Search..."}
                                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:text-white dark:bg-gray-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <Link href="/buy" className="w-full px-4 text-center text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('buy')}</Link>
                                <Link href="/contact" className="w-full px-4 text-center text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('contact')}</Link>
                                <Link href="/about" className="w-full px-4 text-center text-gray-700 dark:text-gray-200 hover:text-primary transition">{t('about')}</Link>
                                <div className="flex gap-4 mt-2">
                                    <DarkSWitcher />
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
