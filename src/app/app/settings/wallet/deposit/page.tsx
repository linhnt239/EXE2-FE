'use client';

import * as React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'akar-icons';
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { userMeApi } from '@/core/api/user-me.api';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    const userMeQuery = useQuery(['user-me', userState.id], () => {
        return userMeApi.v1Get();
    });

    return (
        <div className="fade-in relative flex h-full w-full flex-col items-center justify-start">
            <div className="relative flex w-full   bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-3 text-white">
                <Link href={NKRouter.app.settings.wallet.index()} className="absolute left-4 top-1/2 -translate-y-1/2">
                    <ArrowLeft className="" size={24} />
                </Link>
                <p className="w-full text-center text-lg font-medium">Nạp tiền vào ví</p>
            </div>
            <div className="w-40 mt-16">
                <img src="/assets/images/bank-acb.jpg" alt="" className="h-auto w-full" />
            </div>

            <div className="flex w-full flex-col gap-2 bg-white px-4 py-6">
                <div className="flex w-full items-center justify-between gap-2">
                    <p className="text-left text-sm text-gray-600">Ngân Hàng</p>
                    <p className="text-right text-base text-gray-900">ACB Bank</p>
                </div>
                <div className="flex w-full items-center justify-between gap-2">
                    <p className="text-left text-sm text-gray-600">Số tài khoản</p>
                    <p className="text-right text-base text-gray-900">66619112001</p>
                </div>
                <div className="flex w-full items-center justify-between gap-2">
                    <p className="text-left text-sm text-gray-600">Tên chủ tài khoản</p>
                    <p className="text-right text-base text-gray-900">Phạm Vĩnh Tài</p>
                </div>
                <div className="flex w-full items-center justify-between gap-2">
                    <p className="text-left text-sm text-gray-600">Số tiền</p>
                    <p className="text-right text-base text-gray-900">Tối thiểu 10.000 VNĐ</p>
                </div>

                <div className="flex w-full items-center justify-between gap-2">
                    <p className="text-left text-sm text-gray-600">Nội dung</p>
                    <p className="text-right text-base text-gray-900">NAPTIEN {userMeQuery.data?.email.split('@')[0]}</p>
                </div>
                <span className="text-right text-sm font-medium italic text-red-600">*Vui lòng nhập đúng nội dung</span>
                <span className="text-gray-7000 text-sm font-medium">
                    Lưu ý: Nạp tiền vào ví sẽ được cộng vào ví trong vòng 5 phút, nếu sai nội dung, vui lòng liên hệ với bộ phận hỗ trợ
                </span>
            </div>
        </div>
    );
};

export default Page;
