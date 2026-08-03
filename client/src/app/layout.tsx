import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeHandler from '../components/ThemeHandler';
import ToastContainer from '../components/Toast';
import FloatingSocials from '../components/FloatingSocials';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'REEKS STORE | Build Better Skincare Habits',
  description: 'REEKS STORE is India\'s skincare habit platform helping you stay consistent with your daily routine through reminders, streak tracking, and rewards.',
  keywords: 'skincare, habits, streak tracking, rewards, REEKS STORE, brand partners',
  manifest: '/manifest.json',
  openGraph: {
    title: 'REEKS STORE | Build Better Skincare Habits',
    description: 'Build better skincare habits and get rewarded with REEKS STORE.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeHandler />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingSocials />
        <ToastContainer />
      </body>
    </html>
  );
}
