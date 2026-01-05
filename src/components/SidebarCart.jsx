'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { getCartItems } from '@/hooks/getCartItems'
import { removeFromCart } from '@/hooks/removeFromCart'
import { useToast } from '@/context/ToastContext'

import CardItem from './CardItem'
import Loading from './Loading'
import { updateCartQuantity } from '@/hooks/updateCartQuantity'
import SkeletonItem from './SkeletonItem'
import { useAuth } from '@/context/AuthContext'

const SidebarCart = () => {
  const { t } = useTranslation()
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();


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

  useEffect(() => {
    const refresh = () => fetchCart()
    window.addEventListener('cartUpdated', refresh)
    return () => window.removeEventListener('cartUpdated', refresh)
  }, [])

  const handleRemove = async (cartItemId) => {
    await removeFromCart(cartItemId, showToast, t, user)
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const handleUpdateQuantity = async (productId, newQuantity) => {
    await updateCartQuantity(productId, newQuantity, showToast, t, user);
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
    <>
      {/* زر فتح السلة */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center
    size-11 rounded-full
    bg-primary text-white
    shadow-xl
    transition-all duration-300
    hover:scale-110 hover:shadow-2xl
    active:scale-95
  "
      >
        {open ? <X className="w-6 h-6" /> : <ShoppingBasket className="w-5 h-5" />}
      </button>




      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          className="
    fixed inset-0 bg-black/30 backdrop-blur-sm
    transition-opacity duration-500
    data-[closed]:opacity-0
  "
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <DialogPanel
                className="
    pointer-events-auto
    w-screen max-w-md
    transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    data-[closed]:translate-x-full"
              >
                <div className="flex h-full flex-col bg-white dark:bg-gray-900 shadow-xl pt-4">

                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-4">
                    <X className="size-8 rounded-full bg-primary text-white dark:text-gray-800 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl" onClick={() => setOpen(false)} />
                    <DialogTitle className="text-xl text-center font-black">
                      {t('card')}
                    </DialogTitle>
                  </div>

                  {/* Empty State */}
                  {!loading && cartItems.length === 0 && (
                    <p className="font-bold text-center">
                      {t('cart_is_empty')}
                    </p>
                  )}

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'none' }}>
                    {loading ? (
                      <ul className="space-y-4">
                        {Array.from({ length: cartItems.length }).map((_, idx) => (
                          <SkeletonItem key={idx} />
                        ))}
                      </ul>
                    ) : (

                      <ul className="space-y-4">
                        {cartItems.map((item) => (
                          <CardItem
                            key={item.id}
                            product={item.products}
                            quantity={item.quantity}
                            onRemove={() => handleRemove(item.id)}
                            onUpdateQuantity={(newQuantity) => handleUpdateQuantity(item.products.id, newQuantity)}
                          />
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Footer */}
                  {!loading && cartItems.length > 0 && (
                    <div className="px-4 py-4">
                      <h2 className="font-bold text-lg mb-4">
                        {t('total')}: ${totalPrice.toFixed(2)}
                      </h2>

                      <Link
                        onClick={() => setOpen(false)}
                        href="/cart"
                        className="block w-full text-center mb-3 bg-primary text-white font-bold py-2 rounded-xl hover:bg-transparent hover:text-primary border border-primary transition"
                      >
                        {t('goToCart')}
                      </Link>

                      <Link
                        onClick={() => setOpen(false)}
                        href="/checkout"
                        className="block w-full text-center bg-primary text-white font-bold py-2 rounded-xl hover:bg-transparent hover:text-primary border border-primary transition"
                      >
                        {t('checkout')}
                      </Link>
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default SidebarCart
