import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Background from '@/assets/background/bg.png';
import React from 'react';
import Header from '@/components/common/Header';
import ReduxProvider from '@/redux/api/provider/ReduxProvider';
import { Toaster } from 'react-hot-toast';


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title:
    'Grommr - A site for guys into gaining and encouraging, bellies, chubby bears, gay chubs and admirers',
  description:
    'A site for guys into gaining and encouraging, bellies, chubby bears, gay chubs and admirers',
};

// const pathName = typeof window !== 'undefined' ? window.location.pathname : '';

// const isLogin = pathName === '/login';

const pathName = typeof window !== 'undefined' ? window.location.pathname : '';

const isLogin = pathName === '/login';

// const pathName = typeof window !== 'undefined' ? window.location.pathname : '';

// const isLogin = pathName === '/login';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      data-theme='light'>
      <body
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundColor: '#594614',
          minHeight: '100vh',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>

          <div className=''>
            <Header />
          </div>

          <div className='md:px-5'>
            {!isLogin ? (
              <div className='md:rounded-lg text-text'>{children}</div>
             ) : ( 
              <>
                {children}
                
              </>
             )} 
        </div>
        <Toaster/>
        <div className='md:container'></div>
          </ReduxProvider>
      </body>
    </html>
  );
}
