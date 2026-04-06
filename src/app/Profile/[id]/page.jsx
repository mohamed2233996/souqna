'use client'

import { getCartItems } from '@/hooks/getCartItems'
import { useUser } from '@/hooks/useUser'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function UserProfilePage() {
    const params = useParams()
    const router = useRouter()

    const id = params.id
    const { t } = useTranslation();
    const { user } = useUser()
    const { profile, loading } = useUserProfile(id);
    const [cartItems, setCartItems] = useState([])
    const [loadingCart, setLoadingCart] = useState(true)
    const avatar =
        user?.user_metadata?.avatar_url ||
        "https://ui-avatars.com/api/?name=" + (user?.email || "U") + "&background=random";


    useEffect(() => {
        const handlePageShow = (event) => {
            if (event.persisted) {
                // الصفحة رجعت من cache، نعمل reload
                window.location.reload();
            }
        };

        window.addEventListener('pageshow', handlePageShow);

        return () => {
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    useEffect(() => {
        if (!user) return

        if (id !== user.id) {
            // إعادة التوجيه
            router.replace('/')
        }

    }, [id, user])

    const fetchCart = async () => {
        setLoadingCart(true)
        const { data, error } = await getCartItems()
        if (error) console.error('❌ Error fetching cart:', error)
        else setCartItems(data || [])
        setLoadingCart(false)
    }

    useEffect(() => {
        fetchCart()
    }, [])


    return (
        <div className="py-24 min-h-screen bg-gray-100 dark:bg-dark">
            {!user ?
                <div className="text-center flex flex-col justify-center items-center gap-4 mt-10">
                    <p className='text-xl font-bold'>{t("Profile_not_found")}</p>
                    <p>
                        {t("please_login_to_view_profile")}
                    </p>
                    <button>
                        <a href="/auth/login" className="mt-4 underline text-primary font-semibold">
                            {t("Go_to_Login")}
                        </a>
                    </button>
                </div>
                : <>

                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow flex flex-col md:flex-row gap-8">
                        <div className="w-28 h-28 overflow-hidden rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img alt="user avatar" src={avatar} className='w-full' />
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{profile?.full_name || t("not_available")}</h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>{t("Email")}:</strong> {profile?.email || t("not_available")}</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>{t("phone")}:</strong> {profile?.phone || t("not_available")}</p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>{t("address")}:</strong> {profile?.address || t("not_available")}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>{t("joined_on")}:</strong> {new Date(user?.created_at).toLocaleDateString() || t("not_available")}</p>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow mt-8">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t("cart_items")}</h2>
                        <div>
                            {cartItems && cartItems.length > 0 ? (
                                <ul>
                                    {cartItems?.map((item) => (
                                        <li key={item.id} className="border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-2 justify-between items-center py-4">
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {item.products.title} - {t("quantity")}:
                                                <span className='text-primary'> {item.quantity}</span>
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300 min-w-[200px]">
                                                {t("price")}:
                                                <span className='text-primary font-bold'> {(item.products.price * item.quantity).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</span>
                                            </p>
                                        </li>
                                    ))}
                                    <li>
                                        <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-4 flex flex-col md:flex-row gap-2 justify-center items-center">
                                            {t("total")}:
                                            <span className='text-primary'> {' '}
                                                {cartItems.reduce((total, item) => total + item.products.price * item.quantity, 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">{t("no_items_in_cart")}</p>
                            )}
                        </div>
                        <p className='text-center mt-6 font-bold'>{t("profileToshop")}</p>
                        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-4'>
                            <button className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition">
                                <a href="/">{t("Go_to_Shop")}</a>
                            </button>
                            <button className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-secondary-dark transition">
                                <a href="/cart">{t("View_Orders")}</a>
                            </button>
                        </div>
                    </div>
                </>}
        </div>
    )
}
