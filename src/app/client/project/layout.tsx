import * as React from 'react';

import Link from 'next/link';

import { ListBulletIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

import { NKRouter } from '@/core/NKRouter';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps & React.PropsWithChildren> = ({ children }) => {
    return <div className="flex flex-col">{children}</div>;
};

export default Layout;
