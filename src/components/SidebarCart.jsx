"use client";

import { getCartItems } from "@/hooks/getCartItems";
import { ShoppingBasket } from "lucide-react";
import React, { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import CardItem from "./CardItem";
import { removeFromCart } from "@/hooks/removeFromCart";
import { useToast } from "@/context/ToastContext";
import Loading from "./Loading";

const SidebarCart = ({ id }) => {

  const generatedId = useId();
  const inputId = id || `drawer-cart-${generatedId}`;


  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchCart = async () => {
    setLoading(true);
    const { data, error } = await getCartItems();
    if (error) console.error("❌ Error fetching cart:", error);
    else setCartItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const refresh = () => fetchCart();
    window.addEventListener("cartUpdated", refresh);
    return () => window.removeEventListener("cartUpdated", refresh);
  }, []);

  const handleRemove = async (cartItemId) => {
    await removeFromCart(cartItemId, showToast, t);
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  return (
    <div className="drawer drawer-end z-50">
      {/* Drawer toggle */}
      <input id={inputId} type="checkbox" className="drawer-toggle" />

      {/* زر فتح السلة */}
      <div className="drawer-content">
        <label
          htmlFor={inputId}
          className="flex items-center justify-center text-white bg-primary font-bold border border-primary py-2 rounded-xl px-3 hover:bg-transparent hover:text-primary transition-colors duration-300 cursor-pointer"
        >
          <ShoppingBasket />
        </label>
      </div>

      {/* drawer-side + overlay */}
      <div className="drawer-side">
        <label htmlFor={inputId} className="drawer-overlay"></label>

        {/* صندوق السلة */}
        <div className="drawer-content-box bg-white dark:bg-gray-900 dark:text-white shadow-lg h-auto rounded-b-xl pb-4 w-100">
          <h2 className="font-bold text-xl mt-2 mb-4">{t("card")}</h2>
          {loading && <Loading />}
          {!loading && cartItems.length === 0 && (
            <p className="font-bold text-center">{t("cart_is_empty")}</p>
          )}
          <ul className="menu">
            {cartItems.map((item) => (
              <CardItem
                key={item.id}
                product={item.products}
                quantity={item.quantity}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </ul>
          {!loading && cartItems.length > 0 && (
            <>
            <h2 className="font-bold text-lg mt-4">
              {t("total")}: $
              {cartItems
                .reduce(
                  (total, item) =>
                    total + item.products.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </h2>
            <button className="w-11/12 mt-4 mx-2 bg-primary text-white font-bold py-2 rounded-xl hover:bg-transparent hover:text-primary border border-primary transition-colors duration-300">
              {t("checkout")}
            </button>
            </>
          )}
        </div>
      </div>


    </div>
  );
};

export default SidebarCart;
