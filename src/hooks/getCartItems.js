'use client';
import { supabase } from "../../lib/supabaseClient";

export async function getCartItems(setToast, t) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return { data: [], error: "No user" };

        const { data, error } = await supabase
            .from("cart_items")
            .select(`
                id,
                quantity,
                price,
                product_id,
                products (*)
            `)
            .eq("user_id", user.id);

        if (error) throw error;

        console.log("🛒 Full Cart Items:", data);

        return { data, error: null };

    } catch (error) {
        console.error("❌ Error in getCartItems:", error.message);
        return { data: [], error };
    }
}

