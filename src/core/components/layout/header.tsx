'use client';

import { Fragment, FunctionComponent, useMemo } from 'react';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

import { Menu, Transition } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { MdNotifications, MdNotificationsActive } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

import ButtonC from '../Button/Button';
import NotificationPopup from '../Notifications/NotificationPopup';

interface HeaderProps {}

const sections = [
    {
        id: 'home',
        name: 'Trang chủ',
        href: '/',
    },
    {
        id: 'services',
        name: 'Tìm Freelancer',
        href: NKRouter.service.index(),
    },
    {
        id: 'project',
        name: 'Tìm dự án',
        href: NKRouter.project.index(),
    },
    {
        id: 'forum',
        name: 'Diễn đàn',
        href: NKRouter.forum.index(),
    },
];

const Header: FunctionComponent<HeaderProps> = () => {
    const router = useRouter();
    const params = useParams();
    const userState = useSelector<RootState, UserState>((state) => state.user);

    const { mutate: logout } = useMutation(
        () => {
            return userMeApi.v1PostLogout();
        },
        {
            onSuccess: () => {
                const cookies = new Cookies();
                cookies.remove(NKConstant.TOKEN_COOKIE_KEY);
                store.dispatch(userActions.resetState());
                window.location.reload();
            },
        },
    );

    const userMeQuery = useQuery(
        ['user-me', userState.id],
        () => {
            return userMeApi.v1Get();
        },
        {
            enabled: !!userState.id,
        },
    );

    const pathname = usePathname();

    return (
        <nav className="fixed left-0 top-0 z-50 flex w-full justify-center bg-black px-8">
            <div className={`flex h-20 w-full items-center justify-between gap-x-96 gap-y-2  py-4 text-sm font-normal leading-[17px] tracking-wide`}>
                <Link href={NKRouter.app.home()}>
                    <div className="flex items-center justify-center self-stretch pb-px [min-height:48px]">
                        <img
                            className="w-24 self-stretch mix-blend-normal"
                            src={'https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/33%3A554.webp'}
                        />
                    </div>
                </Link>
                <div className="flex     items-center justify-center gap-x-10">
                    {sections.map((item) => (
                        <div
                            key={item.id}
                            className={clsx('flex items-center text-left duration-200 hover:text-green-400', {
                                'text-white': pathname !== item.href,
                                'text-green-400': pathname === item.href,
                            })}
                        >
                            <Link href={`${item.href}`}>{item.name}</Link>
                        </div>
                    ))}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            {userState.isAuth ? (
                                <div className="flex items-center gap-10">
                                    <NotificationPopup />
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 flex-shrink-0 rounded-full" src={userMeQuery.data?.avatar} alt="avatar" />
                                    </Menu.Button>
                                </div>
                            ) : (
                                <ButtonC onClick={() => router.push(NKRouter.auth.login())}>Đăng nhập</ButtonC>
                            )}
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={NKRouter.me.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Tài khoản
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={NKRouter.freelancer.service.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Freelancer của tôi
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={NKRouter.client.project.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Dự án của tôi
                                        </Link>
                                    )}
                                </Menu.Item>
                                {/* <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                            href={NKRouter.findFreelance.service.index()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Tìm Freelancer
                                        </Link>
                                    )}
                                </Menu.Item> */}
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            onClick={() => logout()}
                                            className={clsx(active ? 'bg-gray-100' : '', 'block cursor-pointer px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Đăng xuất
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {!userState && <ButtonC onClick={() => router.push(NKRouter.auth.login())}>Đăng nhập</ButtonC>}
                </div>
            </div>
        </nav>
    );
};

export default Header;
