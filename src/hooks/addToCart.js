'use client';
import { supabase } from "../../lib/supabaseClient";
import Swal from "sweetalert2";

export async function addToCart(product, showToast, t) {
    try {
        // ✅ جلب المستخدم الحالي
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            await Swal.fire({
                icon: "warning",
                title: "You must login first!",
                text: "Please login to add products to your cart.",
                confirmButtonText: "Login"
            }).then(() => {
                window.location.href = "/auth/login";
            });
            return { data: null, error: new Error("User not logged in") };
        }

        const user_id = user.id;
        const { id: product_id, price } = product;

        // ✅ تحقق إذا المنتج موجود في السلة
        const { data: existing, error: existingError } = await supabase
            .from("cart_items")
            .select("*")
            .eq("user_id", user_id)
            .eq("product_id", product_id)
            .maybeSingle();

        if (existingError) throw existingError;

        if (existing) {
            // ✅ زيادة الكمية
            const { data, error } = await supabase
                .from("cart_items")
                .update({ quantity: existing.quantity + 1 })
                .eq("id", existing.id)
                .select();

            if (error) throw error;

                showToast({
                    message: t("Product_quantity_updated"),
                    type: "added",
                });

            // 🔥 حدث التحديث بعد التعديل
            window.dispatchEvent(new Event("cartUpdated"));

            return { data, error: null };
        } else {
            // ✅ إضافة منتج جديد
            const { data, error } = await supabase
                .from("cart_items")
                .insert([{ user_id, product_id, price, quantity: 1 }])
                .select();

            if (error) throw error;

            if (showToast) {
                showToast({
                    message: t("Product_added"),
                    type: "added",
                });
            }

            // 🔥 حدث التحديث هنا
            window.dispatchEvent(new Event("cartUpdated"));

            return { data, error: null };
        }
    } catch (error) {
        console.error("❌ Error in addToCart:", error.message);
        return { data: null, error };
    }
}
