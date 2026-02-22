'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSingleProduct } from '@/hooks/useSingleProduct';
import Image from 'next/image';
import { ShoppingCart, Star, ArrowLeft, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@/hooks/addToCart';
import { useWishlist } from '@/context/WishlistContext';
import Swal from 'sweetalert2'; 
import { useRelatedProducts } from '@/hooks/useRelatedProducts';
import ProductBox from '@/components/productBox';
import { useToast } from '@/context/ToastContext';

const ProductPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { t } = useTranslation();
    const { showToast } = useToast(); // التوست الرايق بتاعك
    const { user } = useAuth();
    const { product, loading, error } = useSingleProduct(id);
    const { wishlistIds, toggleWishlist } = useWishlist();
    const isWishlisted = wishlistIds.includes(Number(id));
    const { related, loading: loadingRelated } = useRelatedProducts(product?.category, product?.id);

    // Toast الإشعارات الجانبية (SweetAlert) لو حبيت تستخدمه بجانب التوست بتاعك
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const handleAddToCart = async (targetProduct) => {
        if (!user) {
            await Swal.fire({
                icon: "warning",
                title: t("login_required_title", "يجب تسجيل الدخول أولاً!"),
                text: t("login_required_text", "يرجى تسجيل الدخول لتتمكن من إضافة المنتجات إلى سلتك."),
                confirmButtonText: t("login_button", "تسجيل الدخول"),
                confirmButtonColor: "#fc8c06",
                showCancelButton: true,
                cancelButtonText: t("cancel", "إلغاء"),
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/auth/login";
                }
            });
            return;
        }

        const res = await addToCart(targetProduct, showToast, t, user);
        
        if (!res?.error) {
            showToast({ message: t("added_successfully", "تمت الإضافة بنجاح!"), type: "success" });
        }
    };

    const handleWishlist = async () => {
        const result = await toggleWishlist(product);
         if (!user) {
            Swal.fire({
                icon: 'warning',
                title: t('login_first', 'سجل دخولك أولاً'),
                confirmButtonColor: '#fc8c06',
            });
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
            <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{t("no products found")}</h2>
            <button onClick={() => router.push('/')} className="text-primary hover:underline">{t("back_to_home")}</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12">
            <div className="container mx-auto px-4">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-6 hover:text-primary transition-colors">
                    <ArrowLeft size={20} /> {t('back')}
                </button>

                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[300px] md:h-[500px] bg-white rounded-2xl p-4 overflow-hidden">
                            <Image src={product.image} alt={product.title} fill className="object-contain p-4" priority />
                        </motion.div>

                        <div className="flex flex-col">
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2">{product.category}</span>
                            <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 leading-tight">{product.title}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-600 px-2 py-1 rounded-md">
                                    <Star size={18} fill="currentColor" />
                                    <span className="font-bold">{product.rating__rate}</span>
                                </div>
                                <span className="text-gray-400 text-sm">({product.rating__count} {t("review")})</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">{product.description}</p>
                            <div className="mb-10">
                                <span className="text-sm text-gray-500 block mb-1">{t('price')}</span>
                                <span className="text-4xl font-black text-primary">${product.price}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button
                                    onClick={() => handleAddToCart(product)} // التعديل هنا (Arrow Function)
                                    className="flex-[2] bg-primary hover:bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    <ShoppingCart size={22} /> {t('add_to_cart')}
                                </button>
                                <button
                                    onClick={handleWishlist}
                                    className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border-2 
                                    ${isWishlisted ? 'bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800' : 'bg-gray-50 border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'}`}
                                >
                                    <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
                                    {isWishlisted ? t('wishlisted') : t('add_to_wishlist')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Related Products Section */}
                <div className="mt-20 border-t dark:border-gray-800 pt-10">
                    <h3 className="text-2xl font-bold mb-8 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-8 bg-primary rounded-full"></span>
                        {t('related_products', 'منتجات قد تعجبك أيضاً')}
                    </h3>
                    {loadingRelated ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <p className="dark:text-white">جاري تحميل المنتجات...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related.map((item) => (
                                <ProductBox
                                    key={item.id}
                                    id={item.id}
                                    {...item}
                                    onAddToCart={() => handleAddToCart(item)} // Arrow Function هنا كمان
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;