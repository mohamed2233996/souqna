'use client'
import React, { useEffect, useState } from 'react';
import TextPressure from './ReactBits/TextPressure';
import { useTranslation } from 'react-i18next';


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
        <div className='section mt-32'>
            <div className="container mx-auto px-4 flex flex-col justify-center">
                {i18n.language === 'ar' ? (
                    <>
                        <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 las" style={{ color: textColor }}>
                            {t('welcome_to') || "مرحبًا بكم في موقعنا!"}
                        </h1>
                        <h1 className="text-5xl md:text-7xl font-bold text-center" style={{ color: textColor }}>
                            {t('our_site') || "مرحبًا بكم في موقعنا!"}
                        </h1>
                    </>)
                    : (
                        <div style={{ position: 'relative', height: '200px' }}>
                            <TextPressure
                                text={t('welcome_to') || "Welcome to our site!"}
                                flex={true}
                                alpha={false}
                                stroke={false}
                                width={true}
                                weight={true}
                                italic={true}
                                textColor={textColor}
                                strokeColor="#ff0000"
                                minFontSize={36}
                            />
                            <TextPressure
                                text={t('our_site') || "Welcome to our site!"}
                                flex={true}
                                alpha={false}
                                stroke={false}
                                width={true}
                                weight={true}
                                italic={true}
                                textColor={textColor}
                                strokeColor="#ff0000"
                                minFontSize={36}
                            />
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Landing;
