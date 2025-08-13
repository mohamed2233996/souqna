'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import DarkSWitcher from './DarkSWitcher';
import { useLogo } from '../_hooks/logoLoad';

const Navbar = () => {

    const [isLoggedIn, setisLoggedIn] = useState(Boolean);
    const router = useRouter();
    const { t } = useTranslation();

    const logoSrc = useLogo();




    return (
        <nav className="bg-white border-gray-200 dark:bg-dark fixed top-0 z-[1000] w-full shadow-xl">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center w-full sm:w-fit justify-center mb-4 sm:mb-0">
                    <Image
                        src={logoSrc}
                        alt="Logo"
                        width={70}
                        height={70}
                        priority
                    />
                </a>
                <div className='flex items-center w-[70%] m-auto sm:m-0 sm:w-fit justify-center flex-wrap gap-6'>
                    <DarkSWitcher />
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
