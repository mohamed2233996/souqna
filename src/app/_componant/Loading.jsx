// components/Loading.tsx
import Image from 'next/image';
import React from 'react';
import logo from "@/imges/logo.svg";

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Loading = () => {
    
    return (
        <div className="fixed inset-0 bg-white dark:bg-dark flex items-center justify-center z-50 overflow-hidden">
            {/* الحروف المتطايرة */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => {
                    const letter = letters[Math.floor(Math.random() * letters.length)];
                    const left = Math.random() * 100;
                    const duration = 4 + Math.random() * 3;
                    const delay = Math.random() * 3;

                    return (
                        <span
                            key={i}
                            className="absolute text-red-800 text-2xl font-bold animate-float"
                            style={{
                                left: `${left}%`,
                                bottom: '-20px',
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                            }}
                        >
                            {letter}
                        </span>
                    );
                })}
            </div>

            {/* الشعار */}
            <div className="animate-bounce z-10">
                <Image src={logo} alt="Logo" className="w-40" priority />
            </div>
        </div>
    );
};

export default Loading;
