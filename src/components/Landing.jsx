'use client'
import React, { useEffect, useState } from 'react';
import TextPressure from './ReactBits/TextPressure';
import { useTranslation } from 'react-i18next';
import MainBtn from './Buttons/mainBtn';
import bgImage from '../imges/iconsbg.png';


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
        <div className='pb-16 pt-8 sm:pt-20 lg:pt-32 bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${bgImage.src})` }}>
            <div className="container mx-auto px-4 flex flex-col justify-center">
                <div className="mb-8 bg-gray-100 dark:bg-black border border-primary p-1 rounded-full shadow-2xl shadow-primary/50 w-fit mx-auto">
                    <p className="text-center text-sm md:text-lg text-primary px-4">
                        {t('landing_subtitle') || "Your gateway to amazing content"}
                    </p>
                </div>
                {i18n.language === 'ar' ?
                    (
                        <div className="h-[200px] flex flex-col item-center justify-between">
                            <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 las" style={{ color: textColor }}>
                                {t('welcome_to') || "مرحبًا بكم في موقعنا!"}
                            </h1>
                            <h1 className="text-5xl md:text-7xl font-bold text-center" style={{ color: textColor }}>
                                {t('our_site') || "مرحبًا بكم في موقعنا!"}
                            </h1>
                        </div>
                    ) : (
                        <>
                            <div className="relative h-[150px] md:h-[200px] lg:h-[250px] flex items-center justify-center">
                                <TextPressure
                                    text={t('welcome_to') || "Welcome to our site!"}
                                    flex
                                    alpha={false}
                                    stroke={false}
                                    width
                                    weight
                                    italic
                                    textColor={textColor}
                                    strokeColor="#ff0000"
                                    minFontSize={36}
                                    style={{ fontFamily: 'CompressaPRO-GX, Arial, sans-serif' }}
                                />
                            </div>
                            <div className="relative h-[150px] md:h-[200px] lg:h-[250px] flex items-center justify-center">
                                <TextPressure
                                    text={t('our_site') || "Welcome to our site!"}
                                    flex
                                    alpha={false}
                                    stroke={false}
                                    width
                                    weight
                                    italic
                                    textColor={textColor}
                                    strokeColor="#ff0000"
                                    minFontSize={36}
                                    style={{ fontFamily: 'CompressaPRO-GX, Arial, sans-serif' }}
                                />
                            </div>
                        </>

                    )}
                <p className="text-center text-lg mt-8 md:mt-10 lg:mt-20 mb-8 md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    {t('landing_description') || "Discover a world of content tailored just for you. Explore articles, tutorials, and more."}
                </p>
                <MainBtn
                    children={`${t('get_started') || "Get Started"} ${"🛒"}`}
                    className="font-black text-xl"
                    onClick={() => {
                        window.location.href = '#shop';
                    }}
                />
            </div>
        </div>
    );
}

export default Landing;
