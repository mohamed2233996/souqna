'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

export const useWishlistData = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchCompleteWishlist = async () => {
            // لو مفيش يوزر مسجل، مفيش داعي نكلم الداتابيز
            if (!user?.id) {
                setWishlistItems([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                // 1. نجيب الـ product_id من جدول wishlist بتاعك
                const { data: wishlistData, error: wishlistError } = await supabase
                    .from('wishlist')
                    .select('product_id')
                    .eq('user_id', user.id);

                if (wishlistError) throw wishlistError;

                if (wishlistData && wishlistData.length > 0) {
                    // تحويل المصفوفة لـ IDs فقط
                    const ids = wishlistData.map(item => item.product_id);

                    // 2. نجيب بيانات المنتجات كاملة من جدول products
                    const { data: productsData, error: productsError } = await supabase
                        .from('products')
                        .select('*')
                        .in('id', ids);

                    if (productsError) throw productsError;
                    
                    setWishlistItems(productsData || []);
                } else {
                    setWishlistItems([]);
                }
            } catch (err) {
                console.error("Wishlist Hook Error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompleteWishlist();
    }, [user?.id]); // هيعيد التحميل أول ما اليوزر يسجل دخول

    return { wishlistItems, loading };
};