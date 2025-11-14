'use client';
import React from 'react';
import { Trash } from 'lucide-react';

const CardItem = ({quantity, product, onRemove }) => {
    return (
        <div className="mb-4 flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">

            {/* صورة المنتج */}
            <div className="w-20 h-20 flex-shrink-0">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white font-bold line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    ${product.price} x {quantity}
                </p>
            </div>

            {/* زر الحذف */}
            <button
                onClick={() => onRemove(product.id)}
                className="bg-red-500 hover:bg-red-800 text-white dark:text-dark rounded-full p-2 transition-colors duration-300"
                aria-label="Remove from cart"
            >
                <Trash size={20} />
            </button>
        </div>
    );
};

export default CardItem;
