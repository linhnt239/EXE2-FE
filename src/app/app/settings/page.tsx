'use client';

import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft, LockOn, Person, ShoppingBag, Tag, Wallet } from 'akar-icons';
import { MdConnectWithoutContact, MdOutlineShield, MdOutlineSupervisedUserCircle } from 'react-icons/md';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const userMeQuery = useQuery(['user-me', userState.id], () => {
        return userMeApi.v1Get();
    });

    const logoutMutation = useMutation(
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

    return (
        <div className="fade-in relative flex w-full flex-1 flex-col bg-white">
            {/* <div className="relative">
                <div
                    className="h-40"
                    style={{
                        backgroundImage: `url(${userMeQuery.data?.banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>

                <div className="absolute -bottom-1/4 left-8">
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <img src={userMeQuery.data?.avatar} alt={userMeQuery.data?.name} className="w-20 h-20 rounded-full" />
                            <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-1 right-3"></div>
                        </div>
                        <div className="text-sm font-semibold">{userMeQuery.data?.name}</div>
                    </div>
                </div>
            </div> */}
            <div className="mt-3 flex flex-col gap-2 px-4">
                <Link href={NKRouter.app.home()}>
                    <button className="absolute left-4 top-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-black">
                        <ChevronLeft strokeWidth={3} size={24} />
                    </button>
                </Link>
                <h1 className="text-center text-3xl font-semibold text-black">Cài Đặt</h1>
                <div className="mt-3">
                    <h3 className="text-sm text-gray-300">Thông Tin</h3>
                </div>
                <div className="">
                    <Link href={NKRouter.app.post.user(userState.id)} className="flex items-center justify-between gap-2  py-3 font-semibold">
                        <div className="flex items-center justify-center">
                            <div>Tài Khoản Của Tôi</div>
                        </div>
                        <div className="h-6 w-6">
                            <Person strokeWidth={2} size={24} />
                        </div>
                    </Link>
                    <Link href={NKRouter.app.settings.update()} className="flex items-center justify-between gap-2  py-3 font-semibold">
                        <div className="flex items-center justify-center">
                            <div>Cập Nhật Thông Tin</div>
                        </div>
                        <div className="h-6 w-6">
                            <Person strokeWidth={2} size={24} />
                        </div>
                    </Link>
                    <Link href={NKRouter.app.settings.wallet.index()} className="flex items-center justify-between gap-2  py-3 font-semibold">
                        <div className="flex items-center justify-center">
                            <div>Ví Của Tôi</div>
                        </div>
                        <div className="h-6 w-6">
                            <Wallet strokeWidth={2} size={24} />
                        </div>
                    </Link>

                    <Link href={NKRouter.app.settings.changePassword()} className="flex items-center justify-between gap-2  py-3 font-semibold ">
                        <div className="flex items-center justify-center">
                            <div>Đỗi Mật Khẩu</div>
                        </div>
                        <div className="h-6 w-6">
                            <LockOn strokeWidth={2} size={24} />
                        </div>
                    </Link>
                </div>
                <div className="mt-3">
                    <h3 className="text-sm text-gray-300">Dich Vụ</h3>
                </div>
                <div className="">
                    <Link href={NKRouter.app.userMeSale.index()} className="flex items-center justify-between gap-2  py-3 font-semibold">
                        <div className="flex items-center justify-center">
                            <div>Snapix Shop</div>
                        </div>
                        <div className="h-6 w-6">
                            <ShoppingBag strokeWidth={2} size={24} />
                        </div>
                    </Link>
                    <Link href={NKRouter.app.userMeSaleBooking.index()} className="flex items-center justify-between gap-2  py-3 font-semibold">
                        <div className="flex items-center justify-center">
                            <div>Snapix Booking</div>
                        </div>
                        <div className="h-6 w-6">
                            <Tag strokeWidth={2} size={24} />
                        </div>
                    </Link>
                </div>
                <div className="mt-1">
                    <h3 className="text-sm text-gray-300">Hỗ Trợ</h3>
                </div>
                <div className="">
                    <Link href={NKRouter.app.contactUs.index()} className="flex items-center justify-between gap-2 py-3  font-semibold ">
                        <div className="flex items-center justify-center">
                            <div>Liên Hệ Hỗ Trợ</div>
                        </div>
                        <div className="h-6 w-6 text-2xl">
                            <MdConnectWithoutContact />
                        </div>
                    </Link>

                    <Link href={NKRouter.app.settings.terms()} className="flex items-center justify-between gap-2 py-3  font-semibold ">
                        <div className="flex items-center justify-center">
                            <div>Điều khoản dịch vụ</div>
                        </div>
                        <div className="h-6 w-6 text-2xl">
                            <MdOutlineShield />
                        </div>
                    </Link>
                    <Link href={NKRouter.app.settings.policy()} className="flex items-center justify-between gap-2 py-3  font-semibold ">
                        <div className="flex items-center justify-center">
                            <div>Chính sách riêng tư</div>
                        </div>
                        <div className="h-6 w-6 text-2xl">
                            <MdOutlineSupervisedUserCircle />
                        </div>
                    </Link>

                    <div className="flex items-center justify-between gap-2 py-3  font-semibold ">
                        <div className="flex items-center justify-center">
                            <div>Phiên Bản</div>
                        </div>
                        <div className=" ">v1.24</div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        logoutMutation.mutate();
                    }}
                    className="rounded-full  py-3 text-left font-semibold  text-red-500 "
                >
                    <div>Đăng Xuất</div>
                </button>
            </div>
        </div>
    );
};

export default Page;
