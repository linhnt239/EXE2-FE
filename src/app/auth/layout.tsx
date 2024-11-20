'use client';

import * as React from 'react';

import UnAuthWrapper from '@/core/components/wrapper/UnAuthWrapper';

interface LayoutProps extends React.PropsWithChildren {}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return <UnAuthWrapper>{children}</UnAuthWrapper>;
};

export default Layout;
