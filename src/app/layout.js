import { Tajawal } from "next/font/google";
import "./globals.css";
import '../i18n';
import Providers from "./providers";
import Navbar from "@/components/Navbar";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: 'swap',
});

export const metadata = {
  title: "Souqna | سوقنا",
  description: "Your one-stop shop for everything you need.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" style={{ scrollbarWidth: 'none' }}>
      <body
        className={`${tajawal.variable} font-tajawal antialiased transition duration-300`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}