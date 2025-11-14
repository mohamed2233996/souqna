'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/hooks/logoLoad";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2"; // <- استدعاء SweetAlert

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const logoSrc = useLogo();
    const { t } = useTranslation();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: t("passwords_not_match") || "Passwords do not match",
            });
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/login`,
            },
        });

        setLoading(false);

        if (error) {
            Swal.fire({
                icon: "error",
                title: error.message,
            });
        } else {
            Swal.fire({
                icon: "success",
                title: t("check_email_to_confirm") || "Please check your email to confirm your account.",
                confirmButtonText: "OK",
            }).then(() => {
                // يمكن توجيه المستخدم مباشرة لصفحة تسجيل الدخول بعد الضغط على OK
                router.push("/auth/login");
            });

            // تصفير الحقول
            setEmail("");
            setPassword("");
            setConfirmPassword("");
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
                onSubmit={handleRegister}
                className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-lg w-2/3 md:w-1/3"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">{t("register")}</h2>

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
                    className="w-full bg-white dark:bg-gray-900 dark:text-white mb-3 p-2 border border-black dark:border-gray-300 outline-primary focus:border-primary rounded-xl"
                />

                <input
                    type="password"
                    placeholder={t("confirm_password")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 dark:text-white mb-4 p-2 border border-black dark:border-gray-300 outline-primary focus:border-primary rounded-xl"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-primary text-white font-black w-full p-2 rounded ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/80"}`}
                >
                    {loading ? t("loading") || "Loading..." : t("create_account")}
                </button>

                <p className="text-sm font-bold text-center mt-6">
                    {t("already_have_account")}
                </p>
                <p
                    className="text-sm text-center mt-2 cursor-pointer text-blue-500"
                    onClick={() => router.push("/auth/login")}
                >
                    {t("login")}
                </p>
            </form>
        </div>
    );
}
