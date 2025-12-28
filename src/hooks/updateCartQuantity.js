'use client';
import { supabase } from '../../lib/supabaseClient';
import Swal from 'sweetalert2';

/**
 * تحديث كمية المنتج في السلة
 * @param {string} productId - معرف المنتج
 * @param {number} newQuantity - الكمية الجديدة
 * @param {function} showToast - دالة عرض Toast
 * @param {function} t - دالة الترجمة
 */
export async function updateCartQuantity(productId, newQuantity, showToast, t) {
    try {
        // جلب المستخدم الحالي
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            await Swal.fire({
                icon: 'warning',
                title: 'You must login first!',
                text: 'Please login to update your cart.',
                confirmButtonText: 'Login',
            }).then(() => {
                window.location.href = '/auth/login';
            });
            return { data: null, error: new Error('User not logged in') };
        }

        const user_id = user.id;

        if (newQuantity < 1) {
            // لو الكمية أقل من 1، حذف المنتج
            const { data, error } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user_id)
                .eq('product_id', productId)
                .select();

            if (error) throw error;

            showToast({
                message: t('Product_removed'),
                type: 'removed',
            });

            window.dispatchEvent(new Event('cartUpdated'));
            return { data, error: null };
        } else {
            // تحديث الكمية
            const { data, error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity })
                .eq('user_id', user_id)
                .eq('product_id', productId)
                .select();

            if (error) throw error;

            showToast({
                message: t('Product_quantity_updated'),
                type: 'added',
            });

            window.dispatchEvent(new Event('cartUpdated'));
            return { data, error: null };
        }
    } catch (error) {
        console.error('❌ Error in updateCartQuantity:', error.message);
        return { data: null, error };
    }
}
