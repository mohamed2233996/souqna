'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProductBox from './productBox';
import { useTranslation } from 'react-i18next';
import { addToCart } from '@/hooks/addToCart';
import { useToast } from '@/context/ToastContext';
import Loading from './Loading';
import ProductSkeleton from './ProductSkeleton';
import { useAuth } from '@/context/AuthContext';

const Shop = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();



    const handleAddToCart = async (product) => {

        await addToCart(product, showToast, t, user);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("id", { ascending: true });

            if (error) {
                console.error("❌ Supabase Error:", error);
                setError(error);
            } else {
                setProducts(data);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (error) return <div className="text-red-500">Error loading products</div>;

    return (
        <div id="shop" className="py-16 bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-700">
            <div className="container m-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">{t("our products")}</h1>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? Array.from({ length: 8 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                    )) :
                        products.map((product) => (
                            <ProductBox
                                key={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                rating={{
                                    rate: product.rating__rate,
                                    count: product.rating__count,
                                }}
                                onAddToCart={() => handleAddToCart(product)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;
