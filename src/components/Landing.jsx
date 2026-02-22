'use client'
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import MainBtn from './Buttons/mainBtn';
import bgImage from '../imges/banner.png';

const Landing = () => {
    const { t } = useTranslation();

    return (
        <div id="landing" className="w-full relative min-h-[50vh] md:min-h-[60vh] overflow-hidden">
            {/* الخلفية */}
            <Image
                src={bgImage}
                alt="Banner Background"
                fill
                priority
                placeholder="blur"
                className="object-cover object-center contrast-110 saturate-125"
                sizes="100vw"
            />
            
            <div className='absolute inset-0 bg-white/40 dark:bg-black/40 z-0'></div>

            <div className='relative z-10 py-8 sm:pt-16 lg:pt-28 h-full'>
                <div className="container mx-auto px-4 flex flex-col justify-center">
                    <div className="mb-8 bg-gray-100 dark:bg-black border border-primary p-1 rounded-full shadow-2xl shadow-primary/50 w-fit mx-auto">
                        <p className="text-center text-[12px] md:text-lg text-primary px-4">
                            {t('landing_subtitle') || "Your gateway to amazing content"}
                        </p>
                    </div>
                    
                    {/* هنا السر: استخدمنا text-black dark:text-white بدل الـ State */}
                    <div className="flex flex-col items-center justify-between text-black dark:text-white">
                        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                            {t('welcome_to') || "مرحبًا بكم في موقعنا!"}
                            <span className='text-primary'> {t("souqna")}</span>
                        </h1>
                        <h1 className="text-3xl md:text-5xl font-bold text-center">
                            {t('our_site') || "مرحبًا بكم في موقعنا!"}
                        </h1>
                    </div>

                    <p className="text-center font-bold text-lg mt-4 md:mt-6 lg:mt-18 mb-6 md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('landing_description') || "Discover a world of content tailored just for you."}
                    </p>
                    
                    <div className="flex justify-center">
                         <MainBtn
                            onClick={() => {
                                window.location.href = '#shop';
                            }}
                            className="font-black text-sm md:text-xl"
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