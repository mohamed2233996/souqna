'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProductBox from './productBox';
import { useTranslation } from 'react-i18next';

const Shop = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
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
        };

        fetchProducts();
    }, []);

    if (error) return <div className="text-red-500">Error loading products</div>;

    return (
        <div id="shop" className="py-10">
            <div className="container m-auto px-4">
                <h1 className="text-3xl font-bold mb-6 dark:text-white">{t("our products")}</h1>

                {/* Products grid */}
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
