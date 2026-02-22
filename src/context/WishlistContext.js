'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../../lib/supabaseClient';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlistIds, setWishlistIds] = useState([]);

    // 1. مزامنة البيانات عند فتح الموقع
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('wishlist_ids') || '[]');
        setWishlistIds(localData);

        if (user) {
            fetchWishlistFromDB();
        }
    }, [user]);

    const fetchWishlistFromDB = async () => {
        const { data } = await supabase.from('wishlist').select('product_id');
        if (data) {
            const ids = data.map(item => Number(item.product_id));
            setWishlistIds(ids);
            localStorage.setItem('wishlist_ids', JSON.stringify(ids));
        }
    };

    const toggleWishlist = async (product) => {
        if (!user) return "login_required";

        const productId = Number(product.id);
        const isExist = wishlistIds.includes(productId);
        
        // تحديث سريع للـ UI
        const newIds = isExist 
            ? wishlistIds.filter(id => id !== productId) 
            : [...wishlistIds, productId];
        
        setWishlistIds(newIds);
        localStorage.setItem('wishlist_ids', JSON.stringify(newIds));

        // تحديث الداتابيز
        if (isExist) {
            await supabase.from('wishlist').delete().eq('product_id', productId).eq('user_id', user.id);
            return "removed";
        } else {
            await supabase.from('wishlist').insert([{ user_id: user.id, product_id: productId }]);
            return "added";
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);