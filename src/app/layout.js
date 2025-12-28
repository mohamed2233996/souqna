import { Geist, Geist_Mono,Tajawal} from "next/font/google";
import "./globals.css";
import '../i18n';
import Providers from "./providers";
import Head from "next/head";
import Navbar from "@/components/Navbar";

import SidebarCart from "@/components/SidebarCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata = {
  title: "Souqna | سوقنا",
  description: "Your one-stop shop for everything you need.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{scrollbarWidth:'none'}}>
      <Head>
        {/* Preload logos */}
        <link rel="preload" as="image" href="/logos/logo-en-white.png" />
        <link rel="preload" as="image" href="/logos/logo-en-dark.png" />
        <link rel="preload" as="image" href="/logos/logo-ar-white.png" />
        <link rel="preload" as="image" href="/logos/logo-ar-dark.png" />
      </Head>
      <body
        className={`${tajawal.variable} antialiased transition duration-300`}
      >
          <Providers>
            {/* <SidebarCart /> */}
            <Navbar />
            {children}
          </Providers>
      </body>
    </html>
  );
}
