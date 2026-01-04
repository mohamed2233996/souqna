'use client';

import { supabase } from '../../lib/supabaseClient';
import Swal from 'sweetalert2';

/**
 * تحديث كمية المنتج في السلة
 */
export async function updateCartQuantity(
    productId,
    newQuantity,
    showToast,
    t,
    user
) {
    try {
        if (!user) {
            await Swal.fire({
                icon: 'warning',
                title: 'You must login first!',
                text: 'Please login to update your cart.',
                confirmButtonText: 'Login',
            }).then(() => {
                window.location.href = '/auth/login';
            });

            return { error: new Error('User not logged in') };
        }

        const user_id = user.id;

        // ❌ لو الكمية صفر أو أقل → حذف
        if (newQuantity <= 0) {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user_id)
                .eq('product_id', productId);

            if (error) throw error;

            showToast?.({
                message: t('Product_removed'),
                type: 'removed',
            });
        } else {
            // ✅ تحديث الكمية
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity })
                .eq('user_id', user_id)
                .eq('product_id', productId);

            if (error) throw error;

            showToast?.({
                message: t('Product_quantity_updated'),
                type: 'added',
            });
        }

        window.dispatchEvent(new Event('cartUpdated'));
        return { error: null };
    } catch (error) {
        console.error('❌ Error in updateCartQuantity:', error.message);
        return { error };
    }
}
