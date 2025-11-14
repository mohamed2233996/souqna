'use client';
import React, { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Toast = ({ message, duration = 3000, onClose, type }) => {
    const [exiting, setExiting] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setExiting(true); // يبدأ الانيميشن للخروج
            setTimeout(onClose, 500); // بعد 0.5s نحذف الـ Toast
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`
        fixed bottom-4 right-10 flex flex-col items-center justify-center gap-2 bg-white dark:bg-dark text-primary px-4 py-4 w-50 shadow-xl border border-primary shadow-primary z-[1999]
        ${exiting ? 'animate-slide-out-right' : 'animate-slide-in-bottom'}
        `}
        >
            {
                type = 'added' ? (
                    <Flame size={100} />
                ) :
                    type = 'removed' ? (
                        <Flame size={100} className="text-red-500" />
                    ) : null
            }

            <span className='font-black text-center'>{message}</span>
            <a className='text-center underline' href='/chekout'>{t("go_to_chekout")}</a>
        </div>
    );
};

export default Toast;
