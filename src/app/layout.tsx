
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Poppins, Space_Grotesk } from 'next/font/google';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/layout/splash-screen';
import { usePathname } from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Blood Bridge',
//   description: 'Bridging the gap between need & donor.',
// };

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(pathname === '/');

  useEffect(() => {
    if (pathname === '/') {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Adjust the duration as needed

        return () => clearTimeout(timer);
    } else {
        setLoading(false);
    }
  }, [pathname]);

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} font-body antialiased`}>
        {loading ? <SplashScreen /> : children}
        <Toaster />
      </body>
    </html>
  );
}
