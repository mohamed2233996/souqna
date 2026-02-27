'use client'
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import MainBtn from './Buttons/mainBtn';
import bgImage from '../imges/banner.png';

const Landing = () => {
    const { t } = useTranslation();

    return (
        // 1. زودنا الارتفاع للموبايل min-h-[80vh] عشان المحتوى ياخد راحته
        <div id="landing" className="w-full relative min-h-[80vh] md:min-h-[60vh] flex items-center overflow-hidden">
            
            {/* الخلفية مع تحسين التباين */}
            <Image
                src={bgImage}
                alt="Banner Background"
                fill
                priority
                placeholder="blur"
                // 2. أضفنا opacity-80 على الموبايل عشان الكلام "ينطق" فوق زحمة الصورة
                className="object-cover object-center contrast-110 saturate-125 opacity-80 md:opacity-100"
                sizes="100vw"
            />
            
            {/* 3. تغميق الـ Overlay سنة على الموبايل لتحسين الـ Readability */}
            <div className='absolute inset-0 bg-white/60 dark:bg-black/70 md:bg-white/40 md:dark:bg-black/40 z-0'></div>

            <div className='relative z-10 py-12 md:py-28 w-full'>
                <div className="container mx-auto px-6 flex flex-col justify-center items-center text-center">
                    
                    {/* الساب تايتل - صغرنا الخط للموبايل */}
                    <div className="mb-6 bg-gray-100 dark:bg-black border border-primary p-1 rounded-full shadow-2xl shadow-primary/50 w-fit">
                        <p className="text-[10px] md:text-lg text-primary font-bold px-4 uppercase tracking-wider">
                            {t('landing_subtitle') || "Your gateway to amazing content"}
                        </p>
                    </div>
                    
                    {/* العناوين - صغرنا الـ text-3xl للموبايل عشان ما يكسرش السطر */}
                    <div className="flex flex-col items-center text-black dark:text-white mb-6">
                        <h1 className="text-3xl md:text-6xl font-black mb-2 leading-tight">
                            {t('welcome_to') || "مرحبًا بكم في"}
                            <span className='text-primary block md:inline'> {t("souqna")}</span>
                        </h1>
                        <h2 className="text-xl md:text-5xl font-bold opacity-90">
                            {t('our_site') || "One-Stop Shop for Everything"}
                        </h2>
                    </div>

                    {/* الوصف - تحديد عرض أقصى وتحسين المسافات */}
                    <p className="text-sm md:text-xl font-medium mb-10 text-gray-800 dark:text-gray-200 max-w-[90%] md:max-w-2xl">
                        {t('landing_description') || "Discover a world of content tailored just for you."}
                    </p>
                    
                    {/* الزرار */}
                    <div className="flex justify-center w-full">
                         <MainBtn
                            onClick={() => {
                                window.location.href = '#shop';
                            }}
                            className="font-black text-base md:text-xl px-8 py-3"
                        >
                            {`${t('get_started') || "Get Started"} 🛒`}
                        </MainBtn>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;