'use client';
import { ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductBox = (props) => {
    const { t } = useTranslation();

    const hasRating = props.rating__rate != null;
    const ratingValue = hasRating ? Math.round(props.rating__rate) : 0;

    return (
        <div className="group flex flex-col h-full border border-gray-100 dark:border-gray-800 rounded-2xl p-4 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Image Container */}
            <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 p-2 mb-4">
                <img
                    src={props.image}
                    alt={props.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
                />
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow px-1">
                {/* Title */}
                <h2 className="text-base text-gray-800 dark:text-gray-100 font-bold mb-3 line-clamp-2 min-h-[3rem] text-center">
                    {props.title}
                </h2>

                {/* Price and Rating Section (Side by Side) */}
                <div className="mt-auto flex flex-row items-center justify-between w-full mb-4">
                    
                    {/* Price */}
                    <p className="text-primary font-extrabold text-xl">${props.price}</p>

                    {/* Stars Rating */}
                    {hasRating ? (
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        size={14}
                                        fill={index < ratingValue ? "#F59E0B" : "transparent"}
                                        color={index < ratingValue ? "#F59E0B" : "#D1D5DB"}
                                    />
                                ))}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                                {props.rating__rate} <span className="font-normal text-[10px]">({props.rating__count})</span>
                            </span>
                        </div>
                    ) : (
                        <div className="h-5"></div>
                    )}
                </div>
            </div>

            {/* Add to Cart Button */}
            <button 
                onClick={() => props.onAddToCart?.()}
                className="bg-primary w-full flex items-center justify-center gap-2 font-bold text-white px-4 py-3 rounded-xl hover:bg-orange-600 hover:shadow-md active:scale-95 transition-all duration-300"
            >
                {t("add to cart")}
                <ShoppingCart size={18} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default ProductBox;