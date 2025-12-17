'use client';
import { ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductBox = (props) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-transparent shadow-md hover:shadow-lg transition-all duration-300">
            <div
                className="relative w-full h-[-webkit-fill-available] flex items-center justify-center overflow-hidden rounded-lg">
                <img
                    src={props.image}
                    alt={props.title}
                    className="max-h-52 w-auto object-contain transition-transform duration-500 hover:scale-105"
                />
            </div>
            <h2 className="text-lg text-gray-900 dark:text-white font-bold mt-3 mb-2 line-clamp-2">
                {props.title}
            </h2>
            <div className="flex flex-row justify-between items-center mb-4">
                <p className="text-primary font-bold">${props.price}</p>

                {props.rating__rate && (
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                            {props.rating__rate} ({props.rating__count})
                        </span>
                    </div>
                )}
            </div>
            <button onClick={() => props.onAddToCart?.()}
            className="bg-primary mt-auto flex items-center justify-center font-bold w-full text-white px-4 py-2 rounded-3xl hover:bg-primary-dark transition-colors duration-300">
                {t("add to cart")}
                <ShoppingCart className="inline-block mx-2" size={16} />
            </button>
        </div>
    );
};

export default ProductBox;
