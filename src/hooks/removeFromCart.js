'use client';

import { supabase } from '../../lib/supabaseClient';
import Swal from 'sweetalert2';

export async function removeFromCart(cartItemId, showToast, t, user) {
    try {
        if (!user) {
            await Swal.fire({
                icon: 'warning',
                title: 'You must login first!',
                confirmButtonText: 'Login',
            }).then(() => {
                window.location.href = '/auth/login';
            });

            return { error: new Error('User not logged in') };
        }

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId)
            .eq('user_id', user.id); // 🔐 أمان زيادة

        if (error) throw error;

        showToast?.({
            message: t('Product_removed'),
            type: 'removed',
        });

        window.dispatchEvent(new Event('cartUpdated'));

        return { error: null };
    } catch (error) {
        console.error('❌ Error in removeFromCart:', error.message);
        return { error };
    }
}
