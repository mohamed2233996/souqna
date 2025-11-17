'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/hooks/logoLoad";
import { useTranslation } from "react-i18next";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const logoSrc = useLogo();
    const { t } = useTranslation();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // بدأ التحميل

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false); // انتهى التحميل

        if (error) {
            setError(error.message);
        } else {
            router.push("/"); // بعد الدخول يوديه للصفحة الرئيسية
        }
    };

    return (
        <div className="flex flex-col gap-20 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Link href="/" className="flex items-center">
                <Image
                    src={logoSrc}
                    alt="Logo"
                    width={150}
                    height={150}
                    priority
                />
            </Link>
            <form
                onSubmit={handleLogin}
                className="bg-white dark:bg-gray-800 dark:text-white text-black p-6 rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/3"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">{t("login")}</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 dark:text-white mb-3 p-2 border border-black dark:border-gray-300 outline-primary focus:border-primary rounded-xl"
                />
                <input
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 dark:text-white mb-4 p-2 border border-black dark:border-gray-300 outline-primary focus:border-primary rounded-xl"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-primary text-white font-black w-full p-2 rounded ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/80"}`}
                >
                    {loading ? t("loading") || "Loading..." : t("login")}
                </button>

                <p className="text-sm font-bold text-center mt-6">
                    {t("dont_have_account")}
                </p>
                <p
                    className="text-sm text-center mt-2 cursor-pointer text-blue-500"
                    onClick={() => router.push("/auth/register")}
                >
                    {t("create_account")}
                </p>
            </form>
        </div>
    );
}
