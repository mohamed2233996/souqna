'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image'; // استيراد مكون الصورة

export default function CategoryCarousel({ categories, onSelectCategory }) {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    const [selected, setSelected] = useState(null);
    const carouselRef = useRef(null);
    const [allImage, setAllImage] = useState(null);

    const getCatName = (cat) => {
        if (cat.id === 'all') return isArabic ? "الكل" : "All";
        return isArabic && cat.nameAr ? cat.nameAr : cat.name;
    };

    const handleSelect = (cat) => {
        setSelected(cat.name);
        if (onSelectCategory) onSelectCategory(cat.name);
    };

    useEffect(() => {
        if (!categories || categories.length === 0) return;

        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        const imagesPerRow = 2;
        const size = canvas.width / imagesPerRow;

        let loaded = 0;
        const imgs = categories.slice(0, 4).map(cat => {
            const img = new window.Image(); // استخدام window.Image لتجنب التعارض
            img.crossOrigin = 'anonymous';
            img.src = cat.image;
            img.onload = () => {
                loaded++;
                if (loaded === imgs.length) {
                    imgs.forEach((im, i) => {
                        const x = (i % imagesPerRow) * size;
                        const y = Math.floor(i / imagesPerRow) * size;
                        ctx.drawImage(im, x, y, size, size);
                    });
                    setAllImage(canvas.toDataURL());
                }
            };
            return img;
        });
    }, [categories]);

    const scroll = (direction) => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const scrollStep = 200;
        carousel.scrollBy({ left: direction === 'left' ? -scrollStep : scrollStep, behavior: 'smooth' });
    };

    const allCategory = {
        id: 'all',
        name: "All",
        nameAr: "الكل",
        image: allImage || '',
        products_count: categories.reduce((sum, c) => sum + c.products_count, 0)
    };

    const categoriesWithAll = [allCategory, ...categories];

    return (
        <div className="relative flex items-center justify-center mt-2 md:mt-4 lg:mt-6 px-8">
            {/* زر التنقل الأيسر مع aria-label */}
            <button
                onClick={() => scroll(isArabic ? 'right' : 'left')}
                aria-label={isArabic ? "التالي" : "Previous"}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 md:block hidden text-primary bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition text-xl"
            >
                {isArabic ? <ArrowRight /> : <ArrowLeft />}
            </button>

            <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto px-2 py-4 scrollbar-none"
                style={{ scrollBehavior: 'smooth' }}
            >
                {categoriesWithAll.map(cat => (
                    <div
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className="flex-shrink-0 w-40 sm:w-48 md:w-52 cursor-pointer transition-transform hover:scale-95"
                    >
                        {/* استخدام Image من Next.js لتحسين الأداء */}
                        <div className={`
                            relative h-40 sm:h-48 md:h-52 rounded-lg overflow-hidden transition bg-gray-100 dark:bg-gray-800
                            ${selected === cat.name ? 'ring-4 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-dark' : ''}
                        `}>
                            {cat.image ? (
                                <Image
                                    src={cat.image}
                                    alt={getCatName(cat)}
                                    fill
                                    sizes="(max-width: 768px) 160px, 200px"
                                    className="object-cover brightness-90"
                                    priority={cat.id === 'all'}
                                    // إذا كانت الصورة هي صورة "الكل" الناتجة عن الكانفاس، يفضل إضافة unoptimized
                                    unoptimized={cat.id === 'all'}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    {t('loading')}
                                </div>
                            )}

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-white rounded-lg transition-opacity z-10">
                                <h3 className="font-black uppercase text-lg text-center px-2">
                                    {getCatName(cat)}
                                </h3>
                                <span className="text-sm">
                                    {cat.products_count} {t('products')}
                                </span>
                            </div>
                        </div>

                        <p className="mt-2 text-center font-bold text-sm text-gray-800 dark:text-gray-200 uppercase">
                            {getCatName(cat)}
                        </p>
                    </div>
                ))}
            </div>

            {/* زر التنقل الأيمن مع aria-label */}
            <button
                onClick={() => scroll(isArabic ? 'left' : 'right')}
                aria-label={isArabic ? "السابق" : "Next"}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 md:block hidden text-primary bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition text-xl"
            >
                {isArabic ? <ArrowLeft /> : <ArrowRight />}
            </button>
        </div>
    );
}