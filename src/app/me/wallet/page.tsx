'use client';

import * as React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowLeft, ArrowUp, Minus, Plus } from 'akar-icons';
import clsx from 'clsx';
import joi from 'joi';
import _get from 'lodash/get';
import moment from 'moment';
import { FaDivide } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKConfig } from '@/core/NKConfig';
import { NKRouter } from '@/core/NKRouter';
import { IV1WalletDepositDto, IV1WalletWithdrawDto, userMeWalletApi } from '@/core/api/user-me-walllet.api';
import { userMeApi } from '@/core/api/user-me.api';
import { userWalletTransactionApi } from '@/core/api/user-wallet-transaction.api';
import { queryClient } from '@/core/common/configGlobal';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKNumberField from '@/core/components/form/NKNumberField';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface WalletsPageProps {}

const WalletsPage: React.FunctionComponent<WalletsPageProps> = () => {
    const [isAddBalanceModalOpening, setIsAddBalanceModalOpening] = React.useState(false);
    const [isWithdrawBalanceModalOpening, setIsWithdrawBalanceModalOpening] = React.useState(false);
    const walletQuery = useQuery(['wallet'], async () => {
        const res = await userMeWalletApi.v1Get();
        return res;
    });
    const userState = useSelector<RootState, UserState>((state) => state.user);
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

    const onAddBalance = () => {
        setIsAddBalanceModalOpening(true);
    };

    const onCloseAddBalanceModal = () => {
        setIsAddBalanceModalOpening(false);
    };

    const userMeQuery = useQuery(['user-me', userState.id], () => {
        return userMeApi.v1Get();
    });

    return (
        <div className="fade-in relative flex h-full w-full  flex-col items-start justify-start">
            <div className="relative flex h-40 w-full  justify-between ">
                <div className="flex items-center gap-4 rounded-xl bg-green-100 p-8">
                    <div className="h-16 w-16">
                        <img src="https://cdn-icons-png.flaticon.com/512/11217/11217003.png" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className=" text-gray-400">Ví của tôi</div>
                        <span className="text-4xl font-bold text-black">{formatMoneyVND(walletQuery.data?.availableBalance || 0)}</span>
                    </div>
                </div>
                <div className=" flex  flex-col gap-2">
                    <ModalBuilder
                        btnLabel={
                            <div className=" flex items-center justify-center gap-2 rounded-xl  border-2 border-white bg-green-600 px-4 py-2 text-white duration-300 hover:bg-green-400">
                                <Plus strokeWidth={2} size={24} />
                                Thêm số dư
                            </div>
                        }
                        modalTitle=""
                    >
                        <div className="relative  max-h-full w-[350px]">
                            <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> Thêm số dư</h3>
                                    <button
                                        onClick={onCloseAddBalanceModal}
                                        type="button"
                                        className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-hide="default-modal"
                                    >
                                        <svg
                                            className="h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <div className="flex w-full flex-col gap-2  px-4 pb-6">
                                    <NKFormWrapper<IV1WalletDepositDto>
                                        defaultValues={{
                                            amount: 10000,
                                        }}
                                        apiAction={async (data) => {
                                            const res = await userMeWalletApi.v1PostDeposit(data);
                                            const id = _get(res, 'id', '');
                                            const checkout = await userWalletTransactionApi.v1CheckoutVnpay({
                                                userTransactionId: id,
                                                redirectUrl: `${window.location}`,
                                                notifyUrl: NKConfig.API_URL + '/v1/user-wallet-transaction/verify-vnpay',
                                            });

                                            window.location.assign(checkout.checkoutUrl);
                                        }}
                                        schema={{
                                            amount: joi.number().min(10000).required(),
                                        }}
                                    >
                                        <div>
                                            <div className="mt-1">
                                                <NKNumberField name="amount" label="Amount" />
                                            </div>
                                            <button
                                                type="submit"
                                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white bg-black px-3 py-2.5 text-center text-sm text-white duration-300 hover:bg-gray-700"
                                            >
                                                <Plus strokeWidth={2} size={20} />
                                                Thêm số dư
                                            </button>
                                        </div>
                                    </NKFormWrapper>
                                </div>
                            </div>
                        </div>
                    </ModalBuilder>
                    <ModalBuilder
                        btnLabel={
                            <div className=" flex  items-center justify-center gap-2 rounded-xl border-2 border-white bg-red-600 px-4 py-2  text-white duration-300 hover:bg-red-400">
                                <Minus strokeWidth={2} size={24} />
                                Rút tiền
                            </div>
                        }
                        modalTitle=""
                    >
                        {(close) => {
                            return (
                                <div className="relative  max-h-full w-[350px]">
                                    <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                                        <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Rút tiền</h3>
                                            <button
                                                onClick={onCloseAddBalanceModal}
                                                type="button"
                                                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                                data-modal-hide="default-modal"
                                            >
                                                <svg
                                                    className="h-3 w-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>

                                        <div className="flex w-full flex-col gap-2  px-4 pb-6">
                                            <NKFormWrapper<IV1WalletWithdrawDto>
                                                defaultValues={{
                                                    amount: 10000,
                                                }}
                                                apiAction={userMeWalletApi.v1PostWithdraw}
                                                onExtraSuccessAction={() => {
                                                    queryClient.invalidateQueries(['user-wallet-transaction']);
                                                    toast.success('Rút tiền thành công');
                                                    close();
                                                }}
                                                schema={{
                                                    amount: joi.number().min(10000).required(),
                                                }}
                                            >
                                                <div>
                                                    <div className="mt-1">
                                                        <NKNumberField name="amount" label="Số điền" />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white bg-black px-3 py-2.5 text-center text-sm text-white duration-300 hover:bg-gray-700"
                                                    >
                                                        <Minus strokeWidth={2} size={20} />
                                                        Rút tiền
                                                    </button>
                                                </div>
                                            </NKFormWrapper>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </ModalBuilder>
                </div>
            </div>

            <div className="flex w-full  flex-col gap-2 bg-white  py-6">
                <div className="flex h-full w-full flex-col gap-1">
                    {Boolean(walletQuery.data?.id) && (
                        <>
                            <ScrollInfinityBuilder
                                sourceKey="user-wallet-transaction"
                                className="flex flex-col gap-2"
                                queryApi={(dto) => userWalletTransactionApi.v1GetByWallet(walletQuery.data?.id || '', dto)}
                                render={(item, index) => (
                                    <div
                                        key={item.id}
                                        className={clsx('flex w-full justify-between  rounded-lg px-4 py-3', {
                                            'bg-red-600': item.amount < 0 && item.status === 'SUCCESS',
                                            'bg-green-600': item.amount >= 0 && item.status === 'SUCCESS',
                                            'bg-yellow-600': item.status !== 'SUCCESS',
                                        })}
                                    >
                                        <div className="flex w-full items-center gap-4">
                                            <div
                                                className={clsx(
                                                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-current',
                                                )}
                                            >
                                                <img src={`/assets/icon/${item.type.toLowerCase()}.png`} />
                                            </div>
                                            <div className="flex w-full items-center justify-between">
                                                <div className="flex  flex-col">
                                                    <p className="w-full  text-white">
                                                        <FieldBadgeApi
                                                            isApplyColor={false}
                                                            value={item.type}
                                                            apiAction={userWalletTransactionApi.v1GetEnumType}
                                                        />
                                                    </p>
                                                    <p className="text-sm text-white">{moment(item.createdAt).format('DD/MM/YYYY HH:mm')}</p>
                                                </div>
                                                <div className="flex  flex-col  text-sm font-medium text-white">
                                                    <div className="capitalize">
                                                        <FieldBadgeApi
                                                            isApplyColor={false}
                                                            value={item.status}
                                                            apiAction={userWalletTransactionApi.v1GetEnumStatus}
                                                        />
                                                    </div>
                                                    <span className="text-white">{formatMoneyVND(item.amount)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletsPage;
