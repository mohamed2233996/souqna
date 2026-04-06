'use client';
import React from 'react';
import { useWishlistData } from '@/hooks/useWishlistData'; 
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import ProductBox from './productBox';

const FavoriteProducts = () => {
    const { t } = useTranslation();
    
    // الهوك الجديد مش بياخد props لأنه بيجيب الداتا من الداتابيز مباشرة بناءً على اليوزر
    const { wishlistItems, loading } = useWishlistData(); 

    // 1. حالة التحميل (Loading State) - شكل Skeleton شيك
    if (loading) {
        return (
            <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
                <div className="container mx-auto px-4">
                    <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg mb-8"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-80 w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // 2. لو مفيش بيانات، السكشن يختفي تماماً
    if (!wishlistItems || wishlistItems.length === 0) return null;

    const displayItems = wishlistItems.slice(0, 4);

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-primary font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <ShoppingBag size={18} /> {t("continue_shopping") || "استكمل تسوقك"}
                        </h2>
                        <h1 className="text-2xl md:text-4xl font-black dark:text-white">
                            {t("based_on_favorites") || "بناءً على قائمة أمنياتك"}
                        </h1>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayItems.map((product, index) => (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* تأكد إن الـ ProductBox بياخد المنتجات صح من الهوك */}
                            <ProductBox id={product.id} {...product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FavoriteProducts;