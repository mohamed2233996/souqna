'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import MainBtn from '@/components/Buttons/mainBtn';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-28 pb-12">
            <div className="container mx-auto px-4">

                {/* الرأس - Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-4">
                        {t('contact_title') || "تواصل معنا"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('contact_desc') || "إحنا هنا عشان نساعدك! لو عندك أي استفسار، متترددش تبعتلنا."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* 1. معلومات التواصل */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold dark:text-white mb-8">{t('contact_info') || "معلومات التواصل"}</h2>

                            <div className="space-y-6">
                                {/* لوكيشن  */}
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t('address') || "العنوان"}</p>
                                        <p className="font-bold dark:text-white"> منوف، المنوفية</p>
                                    </div>
                                </div>

                                {/* التليفون */}
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-500/10 p-3 rounded-2xl text-green-500">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t('phone') || "رقم الهاتف"}</p>
                                        <p className="font-bold dark:text-white" dir="ltr">+20 01025402633</p>
                                    </div>
                                </div>

                                {/* واتساب - مباشر */}
                                <a href="https://wa.me/201025402633" target="_blank" className="flex items-center gap-4 hover:scale-105 transition-transform">
                                    <div className="bg-green-600 p-3 rounded-2xl text-white">
                                        <MessageCircle size={28} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">WhatsApp</p>
                                        <p className="font-bold dark:text-white">{t('chat_now') || "دردش معنا الآن"}</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* خريطة بسيطة (اختياري) */}
                        <div className="h-64 rounded-3xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13734.2568725848!2d30.9333!3d30.5000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14587df607f0f63b%3A0x6b4c3b6f9a6e1a4!2z2LTYqNix2KfYqNmE2YjZhNip2Iwg2YXZhtmI2YE!5e0!3m2!1sar!2seg!4v1700000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Shubra Blola Map"
                            ></iframe>
                            </div>
                    </motion.div>

                    {/* 2. فورم التواصل */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('name') || "الاسم"}</label>
                                    <input type="text" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('email') || "الإيميل"}</label>
                                    <input type="email" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('subject') || "الموضوع"}</label>
                                <input type="text" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('message') || "رسالتك"}</label>
                                <textarea rows="5" className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white"></textarea>
                            </div>

                            <MainBtn className="w-full py-4 flex items-center justify-center gap-3 text-xl">
                                {t('send_message') || "إرسال الرسالة"}
                                <Send size={20} />
                            </MainBtn>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Contact;