'use client';
import { supabase } from "../../lib/supabaseClient";

export async function getCartItems(setToast, t) {
    try {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from("cart_items")
            .select("*")
            .eq("user_id", user.id);

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error("❌ Error in getCartItems:", error.message);
        return { data: [], error };
    }
}
