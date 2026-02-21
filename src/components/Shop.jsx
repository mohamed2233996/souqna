'use client';

import React, { useEffect, useState, useMemo } from 'react'; // أضفنا useMemo
import ProductBox from './productBox';
import { useTranslation } from 'react-i18next';
import { addToCart } from '@/hooks/addToCart';
import { useToast } from '@/context/ToastContext';
import ProductSkeleton from './ProductSkeleton';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/hooks/useProducts';
import { useCategoriesWithCount } from '@/hooks/useCategoriesWithCount';
import CategoryCarousel from './CategoryCarousel';

const Shop = () => {
    const { t } = useTranslation();
    const { showToast } = useToast();
    const { user } = useAuth();
    const { products, loading, error } = useProducts();
    const { categories } = useCategoriesWithCount();
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleAddToCart = async (product) => {
        await addToCart(product, showToast, t, user);
    };

    const filteredProducts = useMemo(() => {
        if (!selectedCategory || selectedCategory === 'All') {
            return products;
        }
        return products.filter(p => p.category === selectedCategory);
    }, [selectedCategory, products]);

    if (error) return (
        <div className="text-red-500 text-center py-10">
            {t("error loading products")}
        </div>
    );

    return (
        <section id="shop" className="lg:py-16 md:py-10 py-6 bg-white dark:bg-dark transition-colors duration-300">
            <div className="container m-auto px-4">
                
                <div className="min-h-[150px] md:min-h-[200px]">
                    <CategoryCarousel
                        categories={categories}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>

                <div className="relative text-center mb-10 mt-8 md:mt-12">
                    <h2 className="text-4xl font-bold dark:text-white relative z-10">
                        {t("our products")}
                    </h2>
                    
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-80 w-3/4 h-12 pointer-events-none"
                        viewBox="0 0 500 180"
                        aria-hidden="true" 
                    >
                        <path d="m458.3 27.2-5.7-.4c-14.7-1.6-29.2-3.5-45.8-5-27.2-3.2-52 1-93.8-4.1-4.8-.5-1.6 1.1-22 1.1-40-.1-108-6-151.2-10.5-27.7-3.1-57.2-4.7-83.4 4.8l-4.2 2.1q-10.6-.3-21.1 1.7c-1.5.3-2.5 1.4-3.6 2.4-1.9 2 1 4.9-2.4 5.9-1.7.6-3.6.9-4.9 2.2-1 1-.9 2.7-1.9 3.8-.5.7-1.5 1.3-1.3 2.2s1.8.6 2.4 1..." fill="#FC8C06"></path>
                    </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[600px]">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <ProductSkeleton key={`skeleton-${i}`} />
                        ))
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductBox
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                rating__rate={product.rating__rate}
                                rating__count={product.rating__count}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            {t("no products found")}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Shop;