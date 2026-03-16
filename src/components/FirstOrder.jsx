"use client";
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import firstOrderImage from '@/imges/firstOrder.jpg';

const FirstOrder = () => {
    const { t } = useTranslation();

    return (
        <div className='mt-20 relative w-full h-[400px] overflow-hidden group'>
            {/* الخلفية مع تأثير Blur خفيف */}
            <Image
                src={firstOrderImage}
                alt="First Order Promotion"
                fill
                priority
                className="object-cover blur-[2px] scale-105 group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay - التظليل عشان الكلام يوضح */}
            <div className='absolute inset-0 bg-black/60 z-10'></div>

            {/* المحتوى */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-lg">
                    {t("firstOrder") || "خصم خاص لأول طلب!"}
                </h2>

                <p className="text-lg md:text-2xl mb-8 font-medium opacity-90">
                    {t("Use_code") || "استخدم كود:"}
                    <span className="mx-2 font-mono bg-primary text-white px-3 py-1 rounded-lg border-2 border-dashed border-white animate-pulse">
                        FIRST10
                    </span>
                    {t("at_checkout") || "عند الدفع"}
                </p>

                <a
                    href="#shop"
                    className="bg-white text-black text-lg md:text-xl font-black px-10 py-4 rounded-full 
                               hover:bg-primary hover:text-white transform hover:scale-110 transition-all duration-300
                               shadow-[0_0_20px_rgba(252,140,6,0.6)] hover:shadow-[0_0_40px_rgba(252,140,6,0.8)]"
                >
                    {t("Shop_Now") || "تسوق الآن 🛒"}
                </a>
            </div>
        </div>
    );
}

export default FirstOrder;