"use client";

import { useLogo } from '@/hooks/logoLoad';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Globe, MessageCircle } from 'lucide-react'; // استيراد أيقونات إضافية

const Footer = () => {
    const logoSrc = useLogo();
    const { t } = useTranslation();

    return (
        <footer className="bg-neutral text-neutral-content">
            {/* الجزء الرئيسي من الفوتر */}
            <div className="footer p-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* القسم الأول: عن سوقنا */}
                <aside className="flex flex-col gap-4">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logoSrc}
                            alt="Souqna Logo"
                            width={140}
                            height={140}
                            priority
                            className="drop-shadow-md"
                        />
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs opacity-80">
                        <span className="font-bold text-primary text-lg block mb-1">SOUQNA</span>
                        {t("souqnaFooter") || "سوقنا هو وجهتكم الأولى للتسوق الإلكتروني العصري، نوفر لكم أجود المنتجات بأفضل الأسعار."}
                    </p>
                    <div className="flex flex-col gap-2 text-sm mt-2">
                        <div className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> منوف، المنوفية</div>
                        <div className="flex items-center gap-2"><Phone size={16} className="text-primary" /> +20 01025402633</div>
                    </div>
                </aside>

                {/* القسم الثاني: روابط سريعة */}
                <nav>
                    <h6 className="footer-title text-primary opacity-100">{t("QuickLinks") || "روابط سريعة"}</h6>
                    <Link href="/" className="link link-hover mb-2">{t("Home") || "الرئيسية"}</Link>
                    <Link href="/about" className="link link-hover mb-2">{t("About") || "من نحن"}</Link>
                    <Link href="/contact" className="link link-hover mb-2">{t("Contact") || "تواصل معنا"}</Link>
                    <Link href="/shop" className="link link-hover mb-2">{t("Shop") || "المتجر"}</Link>
                </nav>

                <nav>
                    <h6 className="footer-title text-primary opacity-100">{t("OurPromise") || "لماذا سوقنا؟"}</h6>
                    <div className="text-sm space-y-3 opacity-80">
                        <p className="flex items-center gap-2">✓ {t("Quality") || "جودة مضمونة"}</p>
                        <p className="flex items-center gap-2">✓ {t("FastDelivery") || "توصيل سريع"}</p>
                        <p className="flex items-center gap-2">✓ {t("SecurePayment") || "دفع آمن"}</p>
                        <p className="flex items-center gap-2 text-primary font-bold italic">✓ {t("CodingClasses") || "دورات برمجة"}</p>
                    </div>
                </nav>

                {/* القسم الرابع: السوشيال ميديا */}
                <nav>
                    <h6 className="footer-title text-primary opacity-100">{t("Social") || "تابعنا"}</h6>
                    <p className="text-sm mb-4 opacity-80">{t("SocialFollow") || "تابعنا على منصات التواصل الاجتماعي ليصلك كل جديد."}</p>
                    <div className="grid grid-flow-col gap-5">
                        {/* Facebook */}
                        <a href="https://www.facebook.com/mhamed.gamal.316535" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all scale-110 hover:scale-125">
                            <Facebook size={26} />
                        </a>

                        {/* WhatsApp */}
                        <a href="https://wa.me/201025402633" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-all scale-110 hover:scale-125">
                            <MessageCircle size={26} />
                        </a>

                        {/* Portfolio */}
                        <a href="https://portfilio-next.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-all scale-110 hover:scale-125">
                            <Globe size={26} />
                        </a>
                    </div>
                </nav>
            </div>

            {/* الجزء السفلي: الحقوق */}
            <div className="footer footer-center p-6 bg-neutral text-neutral-content border-t border-neutral-content/10">
                <aside className="flex flex-col md:flex-row gap-4 justify-between w-full container mx-auto px-10">
                    <p className="text-sm">
                        © {new Date().getFullYear()} <span className="text-primary font-bold">SOUQNA</span>. {t("AllRightFooter") || "جميع الحقوق محفوظة."}
                    </p>
                    <p className="text-xs opacity-50">
                        Designed & Developed by <a href="https://portfilio-next.vercel.app/" className="underline hover:text-white">Mhamed Gamal</a>
                    </p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;