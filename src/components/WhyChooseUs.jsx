"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Truck, ShieldCheck, Zap, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <Truck size={40} className="text-primary" />,
            title: t("fast_shipping") || "توصيل سريع",
            desc: t("shipping_desc") || "توصيل لحد باب البيت في أسرع وقت ممكن."
        },
        {
            icon: <ShieldCheck size={40} className="text-primary" />,
            title: t("secure_payment") || "دفع آمن",
            desc: t("payment_desc") || "أنظمة دفع مشفرة وآمنة تماماً لبياناتك."
        },
        {
            icon: <Zap size={40} className="text-primary" />,
            title: t("best_quality") || "أفضل جودة",
            desc: t("quality_desc") || "بنختار منتجاتنا بعناية عشان نضمن لك تجربة مميزة."
        },
        {
            icon: <Headphones size={40} className="text-primary" />,
            title: t("support_24") || "دعم متواصل",
            desc: t("support_desc") || "فريق خدمة العملاء معاك في أي وقت للاستفسار."
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-black overflow-hidden">
            <div className="container mx-auto px-4">
                
                {/* العنوان الرئيسي */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-primary font-bold uppercase tracking-widest mb-2">
                        {t("features") || "مميزاتنا"}
                    </h2>
                    <h1 className="text-3xl md:text-5xl font-black dark:text-white">
                        {t("why_souqna") || "لماذا تتسوق من سوقنا؟"}
                    </h1>
                </motion.div>

                {/* كروت المميزات */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-primary transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-primary/10"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-black w-fit group-hover:bg-primary/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;