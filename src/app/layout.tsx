// 'use client';
import { Viewport } from 'next';
import { Roboto, Rubik } from 'next/font/google';
import Script from 'next/script';

import clsx from 'clsx';
import 'swiper/css/effect-fade';

import { NKConfig } from '@/core/NKConfig';
import { AntdProvider } from '@/core/common/AntdProvider';
import RootProvider from '@/core/components/common/RootProvider';
import Footer from '@/core/components/layout/footer';
import Header from '@/core/components/layout/header';
import { LangProvider } from '@/core/contexts/LangContext';

import './globals.css';
import '@smastrom/react-rating/style.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';

const font = Roboto({
    display: 'swap',
    subsets: ['latin-ext', 'latin', 'cyrillic', 'cyrillic-ext'],
    weight: ['100', '300', '400', '500', '700', '900'],
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
                <meta name="theme-color" content="#fff" />
                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> */}

                <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${NKConfig.GG_ANALYTICS_ID}`} />

                <Script id="gg" strategy="lazyOnload">
                    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${NKConfig.GG_ANALYTICS_ID}', {
        page_path: window.location.pathname,
        });
    `}
                </Script>
            </head>
            <body className={clsx(font.className, 'flex min-h-screen w-full flex-col')}>
                <AntdProvider>
                    <LangProvider>
                        <RootProvider>
                            <div className="flex min-h-screen w-full flex-col">
                                <Header />
                                <div className="mt-20 flex h-full w-full flex-1 justify-center">{children}</div>
                                <Footer />
                            </div>
                        </RootProvider>
                    </LangProvider>
                </AntdProvider>
            </body>
        </html>
    );
}
