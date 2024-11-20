'use client';

import * as React from 'react';

import Link from 'next/link';

import { ShoppingBag } from 'akar-icons';

import { NKRouter } from '@/core/NKRouter';
import { useCart } from '@/core/contexts/CartContext';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps & React.PropsWithChildren> = ({ children }) => {
    const { cart } = useCart();
    return (
        <>
            {children}
            <Link className="fixed right-4 top-4 z-20" href={NKRouter.app.cart()}>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                    <ShoppingBag className="text-white" size={20} />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {cart?.orderItems.length || 0}
                    </span>
                </div>
            </Link>
        </>
    );
};

export default Layout;
