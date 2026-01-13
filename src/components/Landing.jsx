'use client'
import React, { useEffect, useState } from 'react';
import TextPressure from './ReactBits/TextPressure';
import { useTranslation } from 'react-i18next';
import MainBtn from './Buttons/mainBtn';
import bgImage from '../imges/banner.png';


const Landing = () => {
    const { i18n, t } = useTranslation();
    const [textColor, setTextColor] = useState("#000000"); // الافتراضي Light


    useEffect(() => {
        // دالة لتحديث اللون حسب الوضع الحالي
        const updateTextColor = () => {
            if (document.documentElement.classList.contains("dark")) {
                setTextColor("#ffffff"); // Dark mode → أبيض
            } else {
                setTextColor("#000000"); // Light mode → أسود
            }
        };

        // ناديناها مرة في البداية
        updateTextColor();

        // نراقب أي تغيير في الكلاسات على html
        const observer = new MutationObserver(updateTextColor);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        // cleanup
        return () => observer.disconnect();
    }, []);



    return (
        <div id="landing" className="w-full bg-cover bg-center relative contrast-110 saturate-125"
            style={{
                backgroundImage: `url(${bgImage.src})`,

            }}>
            <div className='absolute inset-0 bg-white/40 dark:bg-black/40'></div>

            <div className='relative z-10 pb-16 pt-8 sm:pt-20 lg:pt-32 bg-no-repeat bg-cover bg-center'>
                <div className="container mx-auto px-4 flex flex-col justify-center">
                    <div className="mb-8 bg-gray-100 dark:bg-black border border-primary p-1 rounded-full shadow-2xl shadow-primary/50 w-fit mx-auto">
                        <p className="text-center text-[12px] md:text-lg text-primary px-4">
                            {t('landing_subtitle') || "Your gateway to amazing content"}
                        </p>
                    </div>
                    {/* {i18n.language === 'ar' ?
                        ( */}
                            <div className="flex flex-col item-center justify-between">
                                <h1 className="text-4xl md:text-6xl font-bold text-center mb-4" style={{ color: textColor }}>
                                    {t('welcome_to') || "مرحبًا بكم في موقعنا!"}
                                    <span className='text-primary'>{t("souqna")}</span>
                                </h1>
                                <h1 className="text-3xl md:text-5xl font-bold text-center" style={{ color: textColor }}>
                                    {t('our_site') || "مرحبًا بكم في موقعنا!"}
                                </h1>
                            </div>
                        {/* ) : (
                            <>
                                <div className='relative h-[100] max-h-[150] md:h-[150] md:max-h-[200] lg:h-[200] lg:max-h-[250]'>
                                    <TextPressure
                                        text={t('welcome_to') || "Welcome to our site!"}
                                        flex={false}
                                        alpha={false}
                                        stroke={false}
                                        width={false}
                                        weight={true}
                                        italic={true}
                                        textColor={textColor}
                                        strokeColor="#ff0000"
                                        minFontSize={35}
                                    />
                                </div>
                                <div className='relative h-[100] max-h-[150] md:h-[150] md:max-h-[200] lg:h-[200] lg:max-h-[250]'>
                                    <TextPressure
                                        text={t('our_site') || "Welcome to our site!"}
                                        flex={false}
                                        alpha={false}
                                        stroke={false}
                                        width={false}
                                        weight={true}
                                        italic={true}
                                        textColor={textColor}
                                        strokeColor="#ff0000"
                                        minFontSize={35}
                                    />

                                </div>
                            </>
                        )} */}
                    <p className="text-center font-bold text-lg mt-8 md:mt-10 lg:mt-20 mb-8 md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                        {t('landing_description') || "Discover a world of content tailored just for you. Explore articles, tutorials, and more."}
                    </p>
                    <MainBtn
                        children={`${t('get_started') || "Get Started"} ${"🛒"}`}
                        className="font-black text-sm bmd:text-xl"
                        onClick={() => {
                            window.location.href = '#shop';
                        }}
                    />
                </div>
            </div>
        </div>

    );
}

export default Landing;
