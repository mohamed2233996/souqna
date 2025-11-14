'use client';
import { supabase } from "../../lib/supabaseClient";

export async function removeFromCart(cartItemId, setToast, t) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("cart_items")
            .delete()
            .eq("id", cartItemId)
            .select();

        if (error) throw error;

        setToast({
            message: t("Product_removed") || "Product removed from cart",
            type: "removed",
        });

        return { data, error: null };
    } catch (error) {
        console.error("❌ Error in removeFromCart:", error.message);
        return { data: null, error };
    }
}
