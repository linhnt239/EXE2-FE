'use client';

import { FunctionComponent, PropsWithChildren } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ListBulletIcon, PlusCircleIcon } from '@heroicons/react/20/solid';

import { NKRouter } from '@/core/NKRouter';
import MainLayout from '@/core/components/layout/MainLayout';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';

interface MeLayoutProps {}
const tabs = [
    { name: 'Update Profile', href: NKRouter.userMe.updateProfile() },
    { name: 'Change password', href: NKRouter.userMe.changePassword() },
    // { name: 'Wallet', href: 'wallet' },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const MeLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathName = usePathname();

    return (
        <AuthWrapper>
            <div className=" flex min-h-screen w-full  gap-5 bg-green-50">
                <div className=" flex w-full flex-col gap-5 ">
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default MeLayout;
