'use client';
import React from 'react';

const SkeletonItem = () => {
    return (
        <li className="flex py-6 gap-4 animate-pulse">
            {/* صورة المنتج */}
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-md shrink-0" />

            {/* بيانات المنتج */}
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
            </div>

            {/* زر الحذف */}
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </li>
    );
};

export default SkeletonItem;
