'use client';
import { t } from 'i18next';
import { Trash2 } from 'lucide-react';
import React from 'react';

const CardItem = ({ product, quantity, onRemove, onUpdateQuantity }) => {
    return (
        <li className="flex py-6 gap-4">
            {/* صورة المنتج */}
            <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <img
                    src={product.imageSrc || product.image}
                    alt={product.imageAlt || product.title}
                    className="w-full h-full p-2"
                />
            </div>

            {/* بيانات المنتج */}
            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                        <h3>
                            <a href={product.href || '#'}>{product.name || product.title}</a>
                        </h3>
                        <p className="ml-4">${product.price}</p>
                    </div>
                    {product.color && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.color}</p>
                    )}
                </div>

                <div className="flex flex-1 items-end justify-between text-sm mt-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onUpdateQuantity(quantity - 1)}
                            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            disabled={quantity <= 1}
                        >
                            −
                        </button>
                        <span className="text-gray-700 dark:text-gray-300">{quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(quantity + 1)}
                            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            +
                        </button>
                    </div>

                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => onRemove(product.id)}
                            className="font-bold text-lg text-shadow-red-700 hover:text-red-500 transition-colors duration-300 flex items-center gap-1"
                        >
                            <Trash2 />
                            {t('Remove')}
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CardItem;
