'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { getCartItems } from '@/hooks/getCartItems'
import { removeFromCart } from '@/hooks/removeFromCart'
import { useToast } from '@/context/ToastContext'
import CardItem from '@/components/CardItem'
import Loading from '@/components/Loading'
import { updateCartQuantity } from '@/hooks/updateCartQuantity'
import FirstOrder from '@/components/FirstOrder'
import SkeletonItem from '@/components/SkeletonItem'

export default function page() {
    const { t } = useTranslation()
    const { showToast } = useToast()

    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCart = async () => {
        setLoading(true)
        const { data, error } = await getCartItems()
        if (error) console.error('❌ Error fetching cart:', error)
        else setCartItems(data || [])
        setLoading(false)
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleRemove = async (cartItemId) => {
        await removeFromCart(cartItemId, showToast, t)
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId))
    }

    const handleUpdateQuantity = async (productId, newQuantity) => {
        await updateCartQuantity(productId, newQuantity, showToast, t);
        setCartItems((prev) =>
            prev.map((item) =>
                item.products.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.products.price * item.quantity,
        0
    )

    return (
        <div className="py-24 min-h-screen bg-gray-100 dark:bg-dark">
            <div className="container m-auto px-4">
                <h1 className="text-3xl font-bold mb-6">{t('cart')}</h1>

                {loading ? (
                    <ul className="space-y-4">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <SkeletonItem key={idx} />
                        ))}
                    </ul>
                ) : cartItems.length === 0 ? (
                    <p className="text-center text-lg font-medium">{t('cart_is_empty')}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Items List */}
                        <div className="md:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <CardItem
                                    key={item.id}
                                    product={item.products}
                                    quantity={item.quantity}
                                    onRemove={() => handleRemove(item.id)}
                                    onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.products.id, newQuantity)}
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 flex flex-col space-y-4">
                            <h2 className="text-xl font-bold">{t('summary')}</h2>
                            <div className="flex justify-between text-lg font-semibold">
                                <span>{t('total')}:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <p className="text-sm text-gray-500">
                                {t('shipping_and_taxes_calculated_at_checkout')}
                            </p>
                            <Link
                                href="/checkout"
                                className="w-full text-center bg-primary text-white font-bold py-3 rounded-xl hover:bg-transparent hover:text-primary border border-primary transition"
                            >
                                {t('checkout')}
                            </Link>
                            <Link
                                href="/"
                                className="w-full text-center mt-2 text-gray-700 hover:text-primary transition"
                            >
                                {t('continue_shopping')} &rarr;
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <FirstOrder />
        </div>
    )
}
