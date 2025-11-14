"use client";

import { getCartItems } from "@/hooks/getCartItems";
import { ShoppingBasket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardItem from "./CardItem";
import { removeFromCart } from "@/hooks/removeFromCart";
import Toast from "./Toast";

const SidebarCart = ({ id = "drawer-cart" }) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);


  const fetchCart = async () => {
    setLoading(true);
    const { data, error } = await getCartItems();
    if (error) {
      console.error('❌ Error fetching cart:', error);
    } else {
      setCartItems(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (cartItemId) => {
    await removeFromCart(cartItemId, setToast, t);
    fetchCart();
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div className="drawer drawer-end z-50">
      {/* Drawer toggle */}
      <input id={id} type="checkbox" className="drawer-toggle" />

      {/* زر فتح السلة */}
      <div className="drawer-content">
        <label
          htmlFor={id}
          className="flex items-center justify-center text-white bg-primary font-bold border border-primary py-2 rounded-xl px-3 hover:bg-transparent hover:text-primary transition-colors duration-300 cursor-pointer"
        >
          <ShoppingBasket />
        </label>
      </div>

      {/* drawer-side + overlay (DaisyUI) */}
      <div className="drawer-side">
        <label htmlFor={id} aria-label="close sidebar" className="drawer-overlay"></label>

        {/* صندوق السلة — سيتصرف كـ bottom sheet على الموبايل و sidebar على الديسكتوب */}
        <div className="drawer-content-box bg-white dark:bg-gray-900 dark:text-white shadow-lg">
          <h2 className="font-bold text-xl mt-2 mb-4">{t('card')}</h2>
          <ul className="menu">
            {cartItems.map((item) => (
              <CardItem
                key={item.id}
                product={item}
                onRemove={handleRemove}
              />
            ))}
          </ul>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            onClose={() => setToast(null)}
            position="bottom-right"
          />
        )}
      </div>

      {/* CSS مخصص: يتحكم في الإخفاء/الظهور لكل breakpoint */}
      <style jsx>{`
        /* الافتراضي (موبايل):
          - صندوق ثابت bottom:0 عرض كامل
          - مخفي عبر translateY(100%)، يظهر translateY(0) عند checked
        */
        .drawer-content-box {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 70vh; /* ممكن تغيرها ل 60vh أو 80vh حسب ذوقك */
          max-height: 100vh;
          padding: 1rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          transform: translateY(100%);
          transition: transform 0.45s ease;
          z-index: 60;
          overflow-y: auto;
        }

        /* عند الـ checked على أي موبايل — اسحب للأعلى لعرض الصندوق */
        input#${id}:checked ~ .drawer-side .drawer-content-box {
        }

        /* للشاشات الأكبر (sm = 640px) — نغير المكان والسلوك:
          - نصبح sidebar ثابت من اليمين (top:0; bottom:0; width:320px)
          - مخفي عبر translateX(100%), يظهر translateX(0) عند checked
        */
        @media (min-width: 640px) {
          .drawer-content-box {
            left: auto;
            right: 0;
            top: 0;
            bottom: 0;
            height: 100vh;
            width: 20rem; /* 320px = sm:w-80 */
            max-height: 100vh;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            transform: translateX(100%); /* مخفي خارج الشاشة على اليمين */
          }

          /* عند checked نرجعها لليمين داخل الشاشة */
          input#${id}:checked ~ .drawer-side .drawer-content-box {
            transform: translateX(0);
          }
        }

        /* تحسين مرئي: اجعل overlay فوق كل شيء */
        .drawer-overlay {
          z-index: 50;
        }
      `}</style>
    </div>
  );
};

export default SidebarCart;
