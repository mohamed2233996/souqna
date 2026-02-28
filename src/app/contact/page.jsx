'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import MainBtn from '@/components/Buttons/mainBtn';
import { useContact } from '@/hooks/useContact';

const Contact = () => {
    const { t } = useTranslation();
    const { sendData, loading, success, error, resetStatus } = useContact();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const inputClass = "w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white transition-all duration-300 shadow-sm";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendData(formData);
        if (!error) {
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-28 pb-12">
            <div className="container mx-auto px-4">

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-4">
                        {t('contact_title') || "تواصل معنا"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('contact_desc') || "إحنا هنا عشان نساعدك! لو عندك أي استفسار، متترددش تبعتلنا."}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* معلومات التواصل */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                            <h2 className="text-2xl font-bold dark:text-white mb-8">{t('contact_info') || "معلومات التواصل"}</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/10 p-3 rounded-2xl text-primary"><MapPin size={28} /></div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t('address') || "العنوان"}</p>
                                        <p className="font-bold dark:text-white">منوف، المنوفية</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-500/10 p-3 rounded-2xl text-green-500"><Phone size={28} /></div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t('phone') || "رقم الهاتف"}</p>
                                        <p className="font-bold dark:text-white" dir="ltr">+20 01025402633</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-green-500/10 p-3 rounded-2xl text-green-500"><MessageCircle size={28} /></div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t('whatsapp') || "واتساب"}</p>
                                        <a href="https://wa.me/201025402633" target="_blank" rel="noopener noreferrer" className="font-bold dark:text-white" dir="ltr">
                                            +20 01025402633
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-64 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13734.2568725848!2d30.9333!3d30.5000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14587df607f0f63b%3A0x6b4c3b6f9a6e1a4!2z2LTYqNix2KfYqNmE2YjZhNip2Iwg2YXZhtmI2YE!5e0!3m2!1sar!2seg!4v1700000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Shubra Blola Map"></iframe>
                        </div>
                    </motion.div>

                    {/* فورم التواصل */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                        <AnimatePresence mode="wait">
                            {success ? (
                                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                    <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold dark:text-white">
                                        {t('message_sent') || "تم إرسال رسالتك!"}
                                    </h2>
                                    <p className="text-gray-500 mt-2">
                                        {t('message_sent_desc') || "شكرًا لتواصلك معنا. سنرد عليك في أقرب وقت ممكن."}
                                    </p>
                                    <button onClick={resetStatus} className="mt-6 text-primary font-bold underline cursor-pointer">
                                        {t('send_another') || "إرسال رسالة أخرى"}
                                    </button>
                                </motion.div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t('name') || "الاسم"}
                                            </label>
                                            <input required name="name" value={formData.name} onChange={handleChange} type="text" className={inputClass} />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t('email') || "البريد الإلكتروني"}
                                            </label>
                                            <input required name="email" value={formData.email} onChange={handleChange} type="email" className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t('subject') || "الموضوع"}
                                        </label>
                                        <input required name="subject" value={formData.subject} onChange={handleChange} type="text" className={inputClass} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t('message') || "الرسالة"}
                                        </label>
                                        <textarea required name="message" value={formData.message} onChange={handleChange} rows="5" className={inputClass}></textarea>
                                    </div>

                                    {error && <p className="text-red-500 text-sm font-bold">❌ {error}</p>}

                                    <MainBtn disabled={loading} type="submit" className="w-full py-4 flex items-center justify-center gap-3 text-xl shadow-lg shadow-primary/20">
                                        {loading ? <Loader2 className="animate-spin" /> : (t('send_message') || "إرسال الرسالة")}
                                        {!loading && <Send size={20} />}
                                    </MainBtn>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;