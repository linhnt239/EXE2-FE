'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'akar-icons';
import _get from 'lodash/get';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import {
    UserMeSaleBookingOrderIV1CreateDto,
    UserMeSaleBookingOrderIV1UpdateDto,
    userMeSaleBookingOrderApi,
} from '@/core/api/user-me-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import NKDatetimeField from '@/core/components/form/NKDatetimeField';
import NKNumberField from '@/core/components/form/NKNumberField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const defaultValues: UserMeSaleBookingOrderIV1UpdateDto = {
    extraFee: 0,
    note: '',
};

const Page: React.FunctionComponent<PageProps> = () => {
    const formMethods = useForm<UserMeSaleBookingOrderIV1UpdateDto>({ defaultValues });
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSaleBookingOrderQuery = useQuery(
        ['userSaleBooking', id],
        async () => {
            const res = await userSaleBookingOrderApi.v1GetById(id);

            return res;
        },
        {
            enabled: !!id,
            onSuccess: (data) => {
                formMethods.setValue('note', data.note);
                formMethods.setValue('extraFee', data.extraFee);
            },
        },
    );

    const router = useRouter();

    const updateMutation = useMutation(async (dto: UserMeSaleBookingOrderIV1UpdateDto) => userMeSaleBookingOrderApi.v1Put(id, dto), {
        onSuccess: (data) => {
            toast.success('Cập nhật thành công');
            router.push(NKRouter.app.userMeSaleBookingHistory.detail(id));
        },
    });

    const onSubmit = (data: UserMeSaleBookingOrderIV1UpdateDto) => {
        updateMutation.mutate(data);
    };

    return (
        <div className="relative flex h-full w-full flex-col">
            <div className="relative flex h-fit w-full items-start justify-start bg-blue-600 p-4">
                <Link href={NKRouter.app.userMeSaleBookingHistory.index()}>
                    <button className="h-6 w-6">
                        <ChevronLeft className="text-white" />
                    </button>
                </Link>

                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">Cập nhật yêu cầu</p>
            </div>

            <div className="w-full bg-white p-4">
                <FormProvider {...formMethods}>
                    <form id="cart" onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Tên dịch vụ: <span className="text-indigo-600">{userSaleBookingOrderQuery.data?.userSaleBooking.name}</span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Danh mục:{' '}
                                        <span className="text-indigo-600">
                                            {userSaleBookingOrderQuery.data?.userSaleBooking.serviceCategory.name}
                                        </span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Giá dịch vụ:{' '}
                                        <span className="text-indigo-600">{formatMoneyVND(userSaleBookingOrderQuery.data?.price || 0)}</span>
                                    </p>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Ngày bắt đầu:{' '}
                                        <span className="text-indigo-600">
                                            {moment(userSaleBookingOrderQuery.data?.startDate).format('DD/MM/YYYY - HH:mm')}
                                        </span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Ngày kết thúc:{' '}
                                        <span className="text-indigo-600">
                                            {moment(userSaleBookingOrderQuery.data?.endDate).format('DD/MM/YYYY - HH:mm')}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex w-full flex-col sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">Mô tả:</p>
                                    <p className="text-base text-gray-900">{userSaleBookingOrderQuery.data?.description}</p>
                                </div>

                                <div className="sm:col-span-2">
                                    <NKNumberField label="Phí phát sinh" name="extraFee" theme={'AUTH'} />
                                </div>

                                <div className="sm:col-span-2">
                                    <NKTextareaField label="Ghi chú" name="note" theme={'AUTH'} />
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center bg-blue-600 px-4 py-2 font-semibold text-white"
                                    >
                                        Cập nhật
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};

export default Page;
