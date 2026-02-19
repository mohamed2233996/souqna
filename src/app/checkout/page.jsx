'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // افترضت إنك بتستخدم Context للمستخدم
import { useTranslation } from 'react-i18next'; // لو بتستخدم الترجمة هنا
import { getCartItems } from '@/hooks/getCartItems';

export default function CheckoutPage() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // 1. جلب بيانات السلة أول ما الصفحة تفتح
    useEffect(() => {
        const fetchCartData = async () => {
            setPageLoading(true);
            const { data, error } = await getCartItems(); // هننادي الفانكشن بتاعتك

            if (!error && data) {
                setCartItems(data);

                // حساب السعر الإجمالي (السعر × الكمية لكل منتج)
                const total = data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                setTotalPrice(total);
            }
            setPageLoading(false);
        };

        fetchCartData();
    }, []);

    // 2. تجهيز وإرسال الدفع
    const handlePayment = async () => {
        if (!user) return alert('برجاء تسجيل الدخول أولاً');

        setLoading(true);

        // تجهيز المنتجات لصيغة Paymob من الداتا اللي راجعة من Supabase
        const formattedItems = cartItems.map(item => ({
            name: item.products?.title || 'منتج من سوقنا', // بنجيب الاسم من جدول products
            amount_cents: Math.round(item.price * 100), // السعر للقروش
            description: item.products?.description?.substring(0, 50) || 'وصف المنتج', // Paymob بيحتاج الوصف ميكونش طويل أوي
            quantity: item.quantity,
        }));

        try {
            const response = await axios.post('/api/paymob/create-payment', {
                amount: totalPrice,
                currency: 'EGP',
                items: formattedItems,
                user: {
                    firstName: user.user_metadata?.first_name || 'عميل',
                    lastName: user.user_metadata?.last_name || 'سوقنا',
                    email: user.email,
                    phone: user.phone || '01000000000', // لازم رقم تليفون لـ Paymob
                    city: 'القاهرة',
                    country: 'EG',
                },
            });

            if (response.data.success) {
                // الانتقال لـ Iframe الدفع
                window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${process.env.NEXT_PUBLIC_PAYMOB_IFRAME_ID}?payment_token=${response.data.paymentToken}`;
            }

        } catch (error) {
            console.error('Payment Error:', error);
            alert('حدث خطأ في عملية الدفع');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return
        <div className="container h-[100vh] mx-auto p-8 max-w-md flex flex-col justify-center">
            <div className="text-center py-20 text-xl font-bold">{t("loading")}</div>
        </div>;
    }

    return (
        <div className="container h-[100vh] mx-auto p-8 max-w-md flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">{t('done_order')}</h1>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-gray-700">

                {/* تفاصيل سريعة للسلة */}
                <div className="mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{t('proud_cont')}: <span className="font-bold text-gray-800 dark:text-gray-200">{cartItems.length}</span></p>
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-bold text-gray-800 dark:text-gray-200">{t("total")}:</span>
                        <span className="font-extrabold text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading || cartItems.length === 0}
                    className="w-full bg-primary text-white font-bold px-6 py-4 rounded-xl hover:bg-orange-600 active:scale-95 disabled:bg-gray-300 disabled:active:scale-100 transition-all text-lg flex justify-center items-center gap-2"
                >
                    {loading ? (
                        <>
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                            {t('processing')}
                            </>
                    ) : (
                        t('pay_now')
                    )}
                </button>
            </div>
        </div>
    );
}