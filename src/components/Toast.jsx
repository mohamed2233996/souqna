'use client';
import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Toast = ({ message, duration = 3000, onClose, type }) => {
    const [visible, setVisible] = useState(false); // مخفي أولًا
    const { t } = useTranslation();

    useEffect(() => {
        // عرض الـ Toast بعد render
        const showTimer = setTimeout(() => setVisible(true), 10);

        // بعد مدة محددة، يبدأ الاختفاء
        const hideTimer = setTimeout(() => {
            setVisible(false);
            // بعد الانيميشن، نحذف Toast من DOM
            setTimeout(onClose, 500);
        }, duration);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [duration, onClose]);

    if (!message) return null;

    return (
        <div
            className={`
                fixed bottom-4 right-10 flex flex-col items-center justify-center gap-2 
                bg-white dark:bg-dark text-primary p-2 md:p-4 w-44 md:w-64 shadow-xl 
                border border-primary z-[1999]
                transition-all duration-500 transform
               ${visible
                    ? 'animate-slide-in-bottom  opacity-100'
                    : 'animate-slide-out-right opacity-0'}
            `}
        >
            {type === 'added' && <Flame size={60} />}
            {type === 'removed' && <Flame size={60} className="text-red-500" />}
            <span className="font-black text-center">{message}</span>
            <a className="text-center underline" href="/chekout">
                {t("go_to_chekout")}
            </a>
        </div>
    );
};

export default Toast;
