'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/hooks/logoLoad";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const logoSrc = useLogo();
    const { t } = useTranslation();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            return Swal.fire({ icon: "error", title: t("Please_enter_your_full_name") || "Please enter your full name." });
        }

        if (password !== confirmPassword) {
            return Swal.fire({ icon: "error", title: t("passwords_not_match") || "Passwords do not match" });
        }

        setLoading(true);

        try {
            // 1️⃣ تسجيل المستخدم في Supabase Auth
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName },
                    emailRedirectTo: `${window.location.origin}/auth/login` }
            });
            if (signUpError) throw signUpError;

            // 3️⃣ رسالة نجاح للمستخدم
            Swal.fire({
                icon: "success",
                title: t("registration_successful") || "Registration successful!",
                text: t("you_can_now_log_in") || "You can now log in with your credentials.",
                confirmButtonText: "OK"
            }).then(() => router.push("/auth/login"));

            // تصفير الحقول
            setFullName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            Swal.fire({ icon: "error", title: err.message || "Unexpected error occurred" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-20 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <Link href="/" className="flex items-center">
                <Image src={logoSrc} alt="Logo" width={150} height={150} priority />
            </Link>

            <form
                onSubmit={handleRegister}
                className="bg-white text-black dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/3"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">{t("register")}</h2>

                <input
                    type="text"
                    placeholder={t("Full_Name")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full mb-3 p-2 border border-black dark:border-gray-300 rounded-xl outline-primary focus:border-primary bg-white dark:bg-gray-900 dark:text-white"
                    required
                />

                <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border border-black dark:border-gray-300 rounded-xl outline-primary focus:border-primary bg-white dark:bg-gray-900 dark:text-white"
                    required
                />

                <input
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 p-2 border border-black dark:border-gray-300 rounded-xl outline-primary focus:border-primary bg-white dark:bg-gray-900 dark:text-white"
                    required
                />

                <input
                    type="password"
                    placeholder={t("confirm_password")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mb-4 p-2 border border-black dark:border-gray-300 rounded-xl outline-primary focus:border-primary bg-white dark:bg-gray-900 dark:text-white"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded bg-primary text-white font-black ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/80"}`}
                >
                    {loading ? t("loading") || "Loading..." : t("create_account")}
                </button>

                <p className="text-sm font-bold text-center mt-6">{t("already_have_account")}</p>
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
