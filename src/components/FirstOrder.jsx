"use client";
import React from 'react';
import LiquidEther from './ReactBits/LiquidEther';
import { useTranslation } from 'react-i18next';

const FirstOrder = () => {
        const { t } = useTranslation();
    
    return (
        <div className='border-t dark:border-primary border-gray-300' style={{ width: '100%', height: 500, position: 'relative' }}>
            <LiquidEther
                colors={['#fc8c06'
                    , '#ff3c00', '#ffcc00'
                ]}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={false}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />
            <div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black dark:text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("firstOrder")}</h2>
                    <p className="text-lg md:text-xl mb-12">{t("Use_code")} <span className="font-mono bg-white text-black px-2 py-1 rounded">FIRST10</span>{t("at_checkout")}.</p>
                    <a href="#shop" className="inline-block bg-white text-black text-xl font-black shadow-[0px_0px_10px_0px_#fc8c06,0px_0px_20px_0px_#fc8c06,0px_0px_30px_0px_#fc8c06,0px_0px_40px_0px_#fc8c06,0px_0px_50px_0px_#fc8c06,0px_0px_60px_0px_#fc8c06,0px_0px_70px_0px_#fc8c06] px-6 py-3 rounded-4xl hover:scale-105 transition">
                        {t("Shop_Now")}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FirstOrder;
