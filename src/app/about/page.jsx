'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Users, Award, Rocket } from 'lucide-react';
import Image from 'next/image';
import heroImge from '../../imges/about-hero.png';

const About = () => {
    const { t } = useTranslation();

    const stats = [
        { label: 'عميل سعيد', value: '+99', icon: <Users className="text-primary" /> },
        { label: 'منتج مميز', value: '+60', icon: <Award className="text-primary" /> },
        { label: 'سنة خبرة', value: '5+', icon: <Rocket className="text-primary" /> },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-28 pb-12 overflow-hidden">
            <div className="container mx-auto px-4">
                
                {/* الجزء الأول: القصة */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-primary font-bold mb-2 uppercase tracking-widest">{t('about_souqna') || "عن سوقنا"}</h2>
                        <h1 className="text-4xl md:text-6xl font-black dark:text-white mb-6 leading-tight">
                            {t('startIn')}<span className="text-primary"> {t('menof')}</span> {t("togoto")}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                            {t('about_desc')}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            {t('about_desc2')}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-100 dark:border-gray-900"
                    >
                        <Image 
                            src={heroImge}
                            alt="Souqna Story" 
                            fill 
                            className="object-cover"
                        />
                    </motion.div>
                </div>

                {/* الجزء الثاني: الإحصائيات */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-gray-50 dark:bg-gray-900 p-10 rounded-3xl text-center border border-gray-100 dark:border-gray-800"
                        >
                            <div className="flex justify-center mb-4 scale-150">{stat.icon}</div>
                            <h3 className="text-4xl font-black dark:text-white mb-2">{stat.value}</h3>
                            <p className="text-gray-500 font-bold">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* الجزء الثالث: قيمنا */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-primary rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/40"
                >
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6">{t("retingH")}</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-2 rounded-lg"><Target /></div>
                                    <div>
                                        <h4 className="font-bold text-xl">
                                            {t('Professionalism')}
                                        </h4>
                                        <p className="opacity-80">
                                            {t('Professionalism_desc')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/20 p-2 rounded-lg"><Users /></div>
                                    <div>
                                        <h4 className="font-bold text-xl">
                                            {t('Customer Satisfaction')}
                                        </h4>
                                        <p className="opacity-80">
                                            {t('Customer Satisfaction_desc')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block text-9xl font-black opacity-10 select-none">
                            SOUQNA
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;