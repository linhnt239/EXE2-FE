'use client';

import * as React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowLeft, ArrowUp, Plus } from 'akar-icons';
import clsx from 'clsx';
import { FaDivide } from 'react-icons/fa';

import { NKRouter } from '@/core/NKRouter';
import { userMeWalletApi } from '@/core/api/user-me-walllet.api';
import { userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const walletQuery = useQuery(['wallet'], async () => {
        const res = await userMeWalletApi.v1Get();
        return res;
    });

    const userWalletTransactionQuery = useQuery(
        ['user-wallet-transaction'],
        async () => {
            const res = await userWalletTransactionApi.v1GetByWallet(walletQuery.data?.id || '', {
                filters: [],
                orderBy: [],
                page: 0,
                pageSize: 10,
            });

            return res;
        },
        {
            enabled: !!walletQuery.data?.id,
        },
    );

    return (
        <div className="fade-in relative flex h-full w-full flex-col items-start items-center justify-start">
            <div className="relative flex h-40 w-full items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                <span className="text-3xl font-medium text-white">{formatMoneyVND(walletQuery.data?.availableBalance || 0)}</span>
                <Link href={NKRouter.app.settings.wallet.deposit()}>
                    <button className="absolute bottom-0 left-1/2 flex h-12 w-12 -translate-x-1/2 translate-y-1/2 items-center  justify-center rounded-full border-2 border-white bg-indigo-600 text-white">
                        <Plus strokeWidth={2} size={24} />
                    </button>
                </Link>
            </div>
            <Link href={NKRouter.app.settings.index()} className="">
                <ArrowLeft className="absolute left-4 top-4 text-white" size={24} />
            </Link>
            <div className="flex w-full max-w-[500px] flex-col gap-2 bg-white px-4 py-6">
                <div className="flex h-full w-full flex-col gap-1">
                    <p className="text-base font-medium text-gray-800">Transaction History</p>
                    <ScrollInfinityBuilder
                        sourceKey="user-wallet-transaction"
                        className="flex flex-col gap-2"
                        queryApi={(dto) => userWalletTransactionApi.v1GetByWallet(walletQuery.data?.id || '', dto)}
                        render={(item, index) => (
                            <div key={item.id} className="flex w-full justify-between bg-indigo-100/50 px-4 py-2">
                                <div className="flex w-full items-center gap-4">
                                    <div
                                        className={clsx(
                                            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-current',
                                            {
                                                'text-red-600': item.amount < 0,
                                                'text-green-600': item.amount >= 0,
                                            },
                                        )}
                                    >
                                        {item.amount >= 0 ? <ArrowUp strokeWidth={2} size={24} /> : <ArrowDown strokeWidth={2} size={24} />}
                                    </div>
                                    <div className="flex w-full flex-col">
                                        <div className="flex w-full justify-between text-sm font-medium text-gray-700">
                                            <FieldBadgeApi value={item.status} apiAction={userWalletTransactionApi.v1GetEnumStatus} />
                                            <span
                                                className={clsx({
                                                    'text-red-600': item.amount < 0,
                                                    'text-green-600': item.amount >= 0,
                                                })}
                                            >
                                                {formatMoneyVND(item.amount)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium text-gray-700">
                                            <FieldBadgeApi value={item.type} apiAction={userWalletTransactionApi.v1GetEnumType} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
