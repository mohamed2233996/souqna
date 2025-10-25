import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useLogo() {
    const [theme, setTheme] = useState(null);
    const { i18n } = useTranslation();

    useEffect(() => {
        // أول مرة
        setTheme(localStorage.getItem('theme'));

        // متابعة تغييرات الـ localStorage
        const handleStorageChange = () => {
            setTheme(localStorage.getItem('theme'));
        };
        window.addEventListener('storage', handleStorageChange);

        // لو عندك class على الـ html بيتغير مع الثيم
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
        });
        observer.observe(document.documentElement, { attributes: true });

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            observer.disconnect();
        };
    }, []);

    if (i18n.language === 'ar') {
        return theme === 'dark'
            ? '/logos/logo-ar-dark.png'
            : '/logos/logo-ar-white.png';
    } else {
        return theme === 'dark'
            ? '/logos/logo-en-dark.png'
            : '/logos/logo-en-white.png';
    }
}
