'use client';

import * as React from 'react';
import { FunctionComponent, PropsWithChildren } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Tabs } from '@ark-ui/react';
import clsx from 'clsx';

import { NKRouter } from '@/core/NKRouter';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';

const routes = [
    { name: 'Dịch vụ của bạn', href: NKRouter.freelancer.service.index() },
    { name: 'Yêu cầu từ khách hàng', href: NKRouter.freelancer.request.index() },
    { name: 'Dự án tôi tham gia', href: NKRouter.freelancer.contact.index() },
];

const MeLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const router = useRouter();

    const pathname = usePathname();

    const [tabsValue, setTabsValue] = React.useState('');

    React.useEffect(() => {
        switch (pathname) {
            case NKRouter.freelancer.service.index():
                setTabsValue(NKRouter.freelancer.service.index());
                break;
            case NKRouter.freelancer.request.index():
                setTabsValue(NKRouter.freelancer.request.index());
                break;
            case NKRouter.freelancer.contact.index():
                setTabsValue(NKRouter.freelancer.contact.index());
                break;
            default:
                break;
        }
    }, [pathname]);

    return (
        <AuthWrapper>
            <div className="mx-auto mt-4 flex min-h-screen w-full  justify-center gap-5 bg-white">
                <div className="mx-auto flex w-full max-w-app flex-col gap-5  px-4 py-5">
                    <div className="text-3xl font-bold text-green-600">Freelancer của tôi</div>
                    <div>Tạo dịch vụ của bạn để bắt đầu nhận yêu cầu từ khách hàng.</div>

                    <Tabs.Root className="" value={tabsValue}>
                        <Tabs.List className="flex">
                            {routes.map((route) => (
                                <Tabs.Trigger
                                    key={route.href}
                                    value={route.href}
                                    className={clsx('flex-shrink-0 border-green-600 px-4 py-2 text-base', {
                                        'rounded-t-lg border border-b-0  text-green-600': tabsValue === route.href,
                                        'border-b text-black': tabsValue !== route.href,
                                    })}
                                    onClick={() => router.push(route.href)}
                                >
                                    {route.name}
                                </Tabs.Trigger>
                            ))}

                            <div className="w-full border-b border-green-600" />
                        </Tabs.List>
                        <div className="pt-4">
                            <div className="w-full">{children}</div>
                        </div>
                    </Tabs.Root>
                </div>
            </div>
        </AuthWrapper>
    );
};

export default MeLayout;
