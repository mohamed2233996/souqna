'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function CategoryCarousel({ categories, onSelectCategory }) {
    const { t, i18n } = useTranslation() // أضفنا i18n هنا
    const isArabic = i18n.language === 'ar' // نتحقق هل اللغة الحالية عربي؟
    
    const [selected, setSelected] = useState(null)
    const carouselRef = useRef(null)
    const [allImage, setAllImage] = useState(null)

    // دالة لجلب الاسم الصحيح بناءً على اللغة
    const getCatName = (cat) => {
        if (cat.id === 'all') return isArabic ? "الكل" : "All"
        return isArabic && cat.nameAr ? cat.nameAr : cat.name
    }

    const handleSelect = (cat) => {
        setSelected(cat.name)
        if (onSelectCategory) onSelectCategory(cat.name)
    }

    useEffect(() => {
        if (!categories || categories.length === 0) return

        const canvas = document.createElement('canvas')
        canvas.width = 200
        canvas.height = 200
        const ctx = canvas.getContext('2d')
        const imagesPerRow = 2
        const size = canvas.width / imagesPerRow

        let loaded = 0
        const imgs = categories.slice(0, 4).map(cat => {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            img.src = cat.image
            img.onload = () => {
                loaded++
                if (loaded === imgs.length) {
                    imgs.forEach((im, i) => {
                        const x = (i % imagesPerRow) * size
                        const y = Math.floor(i / imagesPerRow) * size
                        ctx.drawImage(im, x, y, size, size)
                    })
                    setAllImage(canvas.toDataURL())
                }
            }
            return img
        })
    }, [categories])

    const scroll = (direction) => {
        const carousel = carouselRef.current
        if (!carousel) return
        const scrollStep = 200
        carousel.scrollBy({ left: direction === 'left' ? -scrollStep : scrollStep, behavior: 'smooth' })
    }

    const allCategory = {
        id: 'all',
        name: "All",
        nameAr: "الكل", // أضفناها هنا
        image: allImage || '', 
        products_count: categories.reduce((sum, c) => sum + c.products_count, 0)
    }

    const categoriesWithAll = [allCategory, ...categories]

    return (
        <div className="relative flex items-center justify-center mt-2 md:mt-4 lg:mt-6">
            {/* زر التنقل - مراعاة الاتجاه في العربي */}
            <button
                onClick={() => scroll(isArabic ? 'right' : 'left')}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 md:block hidden text-primary bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition text-xl"
            >
                {isArabic ? <ArrowRight /> : <ArrowLeft />}
            </button>

            <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-none"
                style={{ scrollBehavior: 'smooth' }}
            >
                {categoriesWithAll.map(cat => (
                    <div
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className="flex-shrink-0 w-40 sm:w-48 md:w-52 cursor-pointer transition-transform hover:scale-95"
                    >
                        <div className={`
                            relative h-40 sm:h-48 md:h-52 rounded-lg overflow-hidden transition
                            ${selected === cat.name ? 'ring-4 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-dark' : ''}
                        `}>
                            {cat.image && (
                                <img
                                    src={cat.image}
                                    alt={getCatName(cat)}
                                    className="w-full h-full object-cover brightness-90"
                                />
                            )}

                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-white rounded-lg transition-opacity">
                                <h3 className="font-black uppercase text-lg text-center">
                                    {getCatName(cat)} {/* استخدام الدالة هنا */}
                                </h3>
                                <span className="text-sm">
                                    {cat.products_count} {t('products')}
                                </span>
                            </div>
                        </div>

                        <p className="mt-2 text-center font-bold text-sm text-gray-800 dark:text-gray-200 uppercase">
                            {getCatName(cat)} {/* واستخدامها هنا أيضاً */}
                        </p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => scroll(isArabic ? 'left' : 'right')}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 md:block hidden text-primary bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition text-xl"
            >
                {isArabic ? <ArrowLeft /> : <ArrowRight />}
            </button>
        </div>
    )
}