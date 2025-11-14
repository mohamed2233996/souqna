"use client";
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setError(error.message);
            else setMessage("✅ تم تسجيل الدخول بنجاح!");
        } else {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setError(error.message);
            else setMessage("✅ تم إنشاء الحساب، تفقد بريدك الإلكتروني لتأكيده!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input input-bordered w-full"
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input input-bordered w-full"
                    />
                    <button className="btn btn-primary w-full">
                        {isLogin ? "دخول" : "إنشاء حساب"}
                    </button>
                </form>

                {error && <p className="text-red-500 mt-3">{error}</p>}
                {message && <p className="text-green-500 mt-3">{message}</p>}

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-6 text-blue-600 hover:underline text-sm"
                >
                    {isLogin ? "ليس لديك حساب؟ أنشئ واحداً" : "هل لديك حساب؟ سجل الدخول"}
                </button>
            </div>
        </div>
    );
};

export default Auth;
