'use client';
import { ShoppingCart, Star, Heart } from 'lucide-react'; // ضفنا Heart هنا
import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

const ProductBox = ({id, ...props}) => {
    const { t } = useTranslation();
    const { wishlistIds, toggleWishlist } = useWishlist();
    
    // التحقق من وجود التقييم
    const hasRating = props.rating__rate != null;
    const ratingValue = hasRating ? Math.round(props.rating__rate) : 0;
    
    // التحقق هل المنتج في المفضلة (تأكدنا من تحويل الـ id لرقم)
    const isFav = wishlistIds.includes(Number(id));

    return (
        <div className="group flex flex-col h-full border border-gray-100 dark:border-gray-800 rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300 relative">
            
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist({ id, ...props });
                }}
                aria-label={isFav ? t("remove_from_wishlist") : t("add_to_wishlist")}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow-sm hover:scale-110 transition-transform active:scale-90"
            >
                <Heart 
                    size={20} 
                    className={`transition-colors ${isFav ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-400"}`} 
                />
            </button>

            {/* رابط تفاصيل المنتج */}
            <Link href={`/product/${id}`} className="flex flex-col h-full">
                
                {/* حاوية الصورة */}
                <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 mb-4">
                    <Image
                        src={props.image}
                        alt={props.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-110 p-2"
                        priority={false} 
                    />
                </div>

                {/* معلومات المنتج */}
                <div className="flex flex-col flex-grow px-1">
                    <h2 className="text-base text-gray-800 dark:text-gray-100 font-bold mb-3 line-clamp-2 min-h-[3rem] text-center">
                        {props.title}
                    </h2>

                    <div className="mt-auto flex flex-row items-center justify-between w-full mb-4">
                        <p className="text-primary font-extrabold text-xl">
                            ${props.price}
                        </p>

                        {/* النجوم */}
                        {hasRating ? (
                            <div className="flex items-center gap-1.5">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            size={12}
                                            fill={index < ratingValue ? "#F59E0B" : "transparent"}
                                            color={index < ratingValue ? "#F59E0B" : "#D1D5DB"}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] font-semibold text-gray-400">
                                    ({props.rating__count})
                                </span>
                            </div>
                        ) : (
                            <div className="h-5"></div>
                        )}
                    </div>
                </div>
            </Link>

            {/* زر إضافة للسلة */}
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    props.onAddToCart?.();
                }}
                className="bg-primary w-full flex items-center justify-center gap-2 font-bold text-white px-4 py-3 rounded-xl hover:bg-orange-600 active:scale-95 transition-all duration-300 mt-2"
            >
                {t("add to cart")}
                <ShoppingCart size={18} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default ProductBox;