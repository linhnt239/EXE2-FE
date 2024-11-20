'use client';

import { FunctionComponent, PropsWithChildren } from 'react';

import AuthWrapper from '@/core/components/wrapper/AuthWrapper';

interface LayoutProps {}

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <AuthWrapper>
            <div className=" mt-24 flex  h-full min-h-screen w-full items-start justify-center  gap-5">{children}</div>
        </AuthWrapper>
    );
};

export default Layout;
