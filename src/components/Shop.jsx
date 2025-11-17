'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProductBox from './productBox';
import { useTranslation } from 'react-i18next';
import { addToCart } from '@/hooks/addToCart';
import { useToast } from '@/context/ToastContext';

const Shop = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { showToast } = useToast();
    const[loading , setLoading] = useState(false);


    const handleAddToCart = async (product) => {
        await addToCart(product ,showToast , t);
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
        <div id="shop" className="py-10 bg-gray-100 dark:bg-dark">
            <div className="container m-auto px-4">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">{t("our products")}</h1>

                {/* Products grid */}
                {loading && <p className="font-bold text-center animate-bounce">{t("loading")}...</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
