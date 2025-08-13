import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useLogo() {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setTheme(savedTheme);
    }, []);

    const { i18n } = useTranslation();
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
