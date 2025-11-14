'use client';

import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const UserDropdown = ({ user }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
        setLoading(false);
        router.push('/')
    };

    // استخدم صورة المستخدم من metadata أو صورة افتراضية
    const avatar =
        user?.user_metadata?.avatar_url ||
        "https://ui-avatars.com/api/?name=" + (user?.email || "U") + "&background=random";

    const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "User";

    return (
        <div className="dropdown dropdown-end">
            {/* الزر (الصورة) */}
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img alt="user avatar" src={avatar} />
                </div>
            </div>

            {/* القائمة */}
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 dark:bg-gray-800 dark:text-white rounded-box w-52"
            >
                <li className="text-center font-semibold text-primary border-b border-gray-200 pb-2">
                    {userName}
                </li>

                <li>
                    <a className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <User size={16} /> {t("Profile")}
                    </a>
                </li>

                <li>
                    <a className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Settings size={16} /> {t("Settings")}
                    </a>
                </li>

                <li>
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="flex items-center gap-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-800"
                    >
                        <LogOut size={16} />
                        {loading ? 'Logging out...' : 'Logout'}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default UserDropdown;
