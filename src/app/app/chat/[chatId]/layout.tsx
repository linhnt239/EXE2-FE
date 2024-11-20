'use client';

import * as React from 'react';

import { ChatContextProvider } from '@/core/contexts/useChatContext';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps & React.PropsWithChildren> = ({ children }) => {
    return <ChatContextProvider>{children}</ChatContextProvider>;
};

export default Layout;
