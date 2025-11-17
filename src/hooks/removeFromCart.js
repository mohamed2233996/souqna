'use client';
import { supabase } from "../../lib/supabaseClient";

export async function removeFromCart(cartItemId, showToast, t) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("cart_items")
            .delete()
            .eq("id", cartItemId)
            .select();

        if (error) throw error;

            showToast({
                message: t("Product_removed"),
                type: "removed",
            });

        // 🔥 أهم إضافة — تحدّث السلة فورًا
        window.dispatchEvent(new Event("cartUpdated"));

        return { data, error: null };
    } catch (error) {
        console.error("❌ Error in removeFromCart:", error.message);
        return { data: null, error };
    }
}
