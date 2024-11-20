'use client';

import * as React from 'react';

import AdsBanner from '@/core/components/Background/AdsBanner';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps & React.PropsWithChildren> = ({ children }) => {
    return (
        <AuthWrapper>
            <div className="relative flex w-full justify-center py-4">
                <AdsBanner className="mr-6 flex h-[700px] w-64 justify-center" slug="left-banner" />
                <div className="fade-in flex h-full w-full max-w-5xl flex-col items-center justify-start rounded-lg bg-white  px-4 py-8 shadow">
                    {children}
                </div>
                <AdsBanner className="ml-6 flex h-[700px] w-64 justify-center" slug="right-banner" />
            </div>
        </AuthWrapper>
    );
};

export default Layout;
