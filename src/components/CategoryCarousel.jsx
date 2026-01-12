'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function CategoryCarousel({ categories, onSelectCategory }) {
    const { t } = useTranslation()
    const [selected, setSelected] = useState(null)
    const carouselRef = useRef(null)
    const [allImage, setAllImage] = useState(null)

    // Handle select
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
                    // draw images
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


    // Scroll by buttons
    const scroll = (direction) => {
        const carousel = carouselRef.current
        if (!carousel) return
        const scrollStep = 200
        carousel.scrollBy({ left: direction === 'left' ? -scrollStep : scrollStep, behavior: 'smooth' })
    }

    // "All" category
    const allCategory = {
        id: 'all',
        name: "All",
        image: allImage || '', // بدون أي 404
        products_count: categories.reduce((sum, c) => sum + c.products_count, 0)
    }

    const categoriesWithAll = [allCategory, ...categories]

    return (
        <div className="relative flex items-center justify-center">
            {/* زر يسار */}
            <button
                onClick={() => scroll('left')}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 md:block hidden text-primary bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition text-xl"
            >
                <ArrowLeft />
            </button>

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-none"
                style={{ scrollBehavior: 'smooth',
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none' // For Internet Explorer and Edge
                }}
            >
                {categoriesWithAll.map(cat => (
                    <div
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className={`
        relative flex-shrink-0 w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 rounded-lg cursor-pointer transition-transform
        ${selected === cat.name ? 'ring-4 ring-primary' : ''}
        hover:scale-95
            `}
                    >
                        {cat.image && (
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover rounded-lg brightness-90"
                            />
                        )}

                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-white rounded-lg transition-opacity">
                            <h3 className="font-black uppercase text-lg text-center">{cat.name}</h3>
                            <span className="text-sm">{cat.products_count} {t('products')}</span>
                        </div>
                    </div>
                ))}
            </div>


            {/* زر يمين */}
            <button
                onClick={() => scroll('right')}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 md:block hidden text-primary bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition text-xl"
            >
                <ArrowRight />
            </button>
        </div>
    )
}


