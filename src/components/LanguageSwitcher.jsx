import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBtn from './Buttons/navBtn';

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
        <NavBtn
            onClick={toggleLanguage}
            children={i18n.language === "en" ? "Ar" : "EN"}
        />
    );
}

export default LanguageSwitcher;
