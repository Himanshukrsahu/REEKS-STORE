import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ThemeHandler from '../components/ThemeHandler';
import ToastContainer from '../components/Toast';
import FloatingSocials from '../components/FloatingSocials';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Reeks Store | Molecular Skincare & Radiance Renewal',
  description: 'Premium Swiss-formulated cellular skincare tailored for your exact skin type. Healthy skin starts with molecular science.',
  keywords: 'skincare, luxury beauty, day cream, retinol serum, skin type quiz, AI recommendations',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Reeks Store | Molecular Skincare & Radiance Renewal',
    description: 'Swiss-formulated skincare tailored for your exact skin type.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
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
