"use client";
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import firstOrderImage from '@/imges/firstOrder.jpg';

const FirstOrder = () => {
        const { t } = useTranslation();
    
    return (
        <div className='mt-20 after:absolute after:inset-0 after:bg-black after:opacity-50' style={{ width: '100%', height: 400, position: 'relative' }}>
            <Image 
                src={firstOrderImage}
                alt="First Order Promotion"
                layout="fill"
                objectFit="cover"
                className=" blur-sm"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-30">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("firstOrder")}</h2>
                    <p className="text-lg md:text-xl mb-12">{t("Use_code")} <span className="font-mono bg-white text-black px-2 py-1 rounded">FIRST10</span>{t("at_checkout")}.</p>
                    <a href="#shop" className="inline-block bg-white text-black text-xl font-black shadow-[0px_0px_10px_0px_#fc8c06,0px_0px_20px_0px_#fc8c06,0px_0px_30px_0px_#fc8c06,0px_0px_40px_0px_#fc8c06,0px_0px_50px_0px_#fc8c06,0px_0px_60px_0px_#fc8c06,0px_0px_70px_0px_#fc8c06] px-6 py-3 rounded-4xl hover:scale-105 transition">
                        {t("Shop_Now")}
                    </a>
                </div>
        </div>
    );
}

export default FirstOrder;
