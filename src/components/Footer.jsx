"use client";

import { useLogo } from '@/hooks/logoLoad';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const logoSrc = useLogo();
    const { t } = useTranslation();

    return (
        <>
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
                <aside>
                    <Link href="/" className="flex items-center">
                        <Image
                            src={logoSrc}
                            alt="Logo"
                            width={120}
                            height={120}
                            priority
                        />
                    </Link>

                    <p className="text-sm mt-2 max-w-xs">
                        {t("souqnaFooter")}
                        <br />
                        {t("footerText")}
                    </p>
                </aside>

                <nav>
                    <h6 className="footer-title">{t("Social")}</h6>

                    <div className="grid grid-flow-col gap-4">
                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/mhamed.gamal.316535"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-current hover:text-primary transition"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>

                        {/* WhatsApp */}
                        <a
                            href="https://wa.me/201025402633"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-current hover:text-green-500 transition"
                            >
                                <path d="M20.52 3.48A11.91 11.91 0 0012.01 0C5.39 0 .01 5.38.01 12c0 2.12.56 4.18 1.62 6L0 24l6.18-1.62A11.95 11.95 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.38l-.36-.21-3.67.96.98-3.58-.24-.37A9.93 9.93 0 1122 12c0 5.52-4.48 10-10 10zm5.43-7.56c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
                            </svg>
                        </a>

                        {/* Portfolio Website */}
                        <a
                            href="https://portfilio-next.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Website"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                className="fill-current hover:text-secondary transition"
                            >
                                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.93 9h-3.09a15.1 15.1 0 00-1.34-5.02A8.03 8.03 0 0119.93 11zM12 4c.88 0 2.29 1.84 3.02 5H8.98C9.71 5.84 11.12 4 12 4zM4.07 13h3.09c.3 1.79.85 3.53 1.62 5.02A8.03 8.03 0 014.07 13zm3.09-2H4.07a8.03 8.03 0 014.64-5.02A15.1 15.1 0 007.16 11zm5.84 9c-.88 0-2.29-1.84-3.02-5h6.04c-.73 3.16-2.14 5-3.02 5zm2.84-1.98A15.1 15.1 0 0016.84 13h3.09a8.03 8.03 0 01-4.09 5.02z" />
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4 border-t border-neutral-content/10">
                <aside className="grid-flow-col items-center gap-2">
                    <p className="text-sm">
                        © {new Date().getFullYear()} {t("AllRightFooter")}
                    </p>
                </aside>

                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/mhamed.gamal.316535"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:text-primary transition"
                        >
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/201025402633"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:text-green-500 transition"
                        >
                            <path d="M20.52 3.48A11.91 11.91 0 0012.01 0C5.39 0 .01 5.38.01 12c0 2.12.56 4.18 1.62 6L0 24l6.18-1.62A11.95 11.95 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.94 9.94 0 01-5.07-1.38l-.36-.21-3.67.96.98-3.58-.24-.37A9.93 9.93 0 1122 12c0 5.52-4.48 10-10 10zm5.43-7.56c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35z" />
                        </svg>
                    </a>

                    {/* Website */}
                    <a
                        href="https://portfilio-next.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Website"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current hover:text-secondary transition"
                        >
                            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.93 9h-3.09a15.1 15.1 0 00-1.34-5.02A8.03 8.03 0 0119.93 11zM12 4c.88 0 2.29 1.84 3.02 5H8.98C9.71 5.84 11.12 4 12 4zM4.07 13h3.09c.3 1.79.85 3.53 1.62 5.02A8.03 8.03 0 014.07 13zm3.09-2H4.07a8.03 8.03 0 014.64-5.02A15.1 15.1 0 007.16 11zm5.84 9c-.88 0-2.29-1.84-3.02-5h6.04c-.73 3.16-2.14 5-3.02 5zm2.84-1.98A15.1 15.1 0 0016.84 13h3.09a8.03 8.03 0 01-4.09 5.02z" />
                        </svg>
                    </a>
                </nav>
            </footer>

        </>
    );
};

export default Footer;
