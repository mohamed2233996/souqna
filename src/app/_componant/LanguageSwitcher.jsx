import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const savedLang = localStorage.getItem('appLanguage');
        if (savedLang && savedLang !== i18n.language) {
            i18n.changeLanguage(savedLang);
            document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        } else {
            // ضبط الاتجاه حسب اللغة الافتراضية أو الحالية
            document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        }
    }, [i18n]);

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
        localStorage.setItem('appLanguage', newLang);  // حفظ اللغة المختارة
    };

    return (
        <button
            onClick={toggleLanguage}
            className="text-white bg-primary font-bold border border-primary py-2 rounded-xl px-3 hover:bg-transparent hover:text-primary transition-colors duration-300"
        >
            {i18n.language === "en" ? "Ar" : "EN"}
        </button>
    );
}

export default LanguageSwitcher;
