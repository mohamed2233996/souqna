'use client';
import { ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ProductBox = (props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div className='h-52 w-full flex items-center justify-center'>
                <img
                    src={props.image}
                    alt={props.title}
                    className="w-4/5 p-8 hover:p-5 transition-all duration-500 object-cover mb-4 rounded"
                />
            </div>
            <h2 className="text-lg dark:text-white font-bold mb-2 line-clamp-2">{props.title}</h2>
            <div className="flex flex-row justify-between items-center mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-bold">${props.price}</p>
                {props.rating__rate && (
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                            {props.rating__rate} ({props.rating__count})
                        </span>
                    </div>
                )}
            </div>
            <button className="bg-primary mt-auto flex items-center justify-center font-bold w-full text-white px-4 py-2 rounded hover:bg-primary-dark transition">
                {t("add to cart")}
                <ShoppingCart className="inline-block mx-2" />
            </button>
        </div>
    );
}

export default ProductBox;
