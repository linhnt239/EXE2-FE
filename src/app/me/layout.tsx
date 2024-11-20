'use client';

import { FunctionComponent, PropsWithChildren } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NKRouter } from '@/core/NKRouter';

const tabs = [
    { name: 'Cập nhật thông tin', href: NKRouter.userMe.updateProfile() },
    { name: 'Thay đổi mật khẩu', href: NKRouter.userMe.changePassword() },
    { name: 'Nhận xét từ khách hàng', href: NKRouter.userMe.customerFeedback() },
    { name: 'Ví', href: NKRouter.userMe.wallet() },
    { name: 'Freelancer của tôi', href: NKRouter.freelancer.service.index() },
    { name: 'Dự án của tôi', href: NKRouter.client.project.index() },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const MeLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const pathName = usePathname();

    const currentPath = pathName.replace('/me/', '');

    return (
        <div className="mx-auto mt-5 flex min-h-screen w-full max-w-[1000px] flex-col gap-5">
            <div className=" flex-shrink-0 border-gray-200">
                <nav className="-mb-px flex gap-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                currentPath === tab.href
                                    ? 'border-[#4ade80] text-sm text-[#4ade80]'
                                    : ' text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'w-full whitespace-nowrap border-b-2 px-1 py-2 text-center text-sm font-medium',
                            )}
                            aria-current={currentPath === tab.href ? 'page' : undefined}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default MeLayout;
