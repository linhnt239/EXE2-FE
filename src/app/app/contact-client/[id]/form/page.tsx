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
import { UserMeSaleBookingOrderIV1CreateDto, userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import NKDatetimeField from '@/core/components/form/NKDatetimeField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const defaultValues: UserMeSaleBookingOrderIV1CreateDto = {
    clientNote: '',
    endDate: '',
    startDate: '',
    extraFee: 0,
    price: 0,
    userSaleBookingId: '',
};

const Page: React.FunctionComponent<PageProps> = () => {
    const formMethods = useForm<UserMeSaleBookingOrderIV1CreateDto>({ defaultValues });
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSaleBookingQuery = useQuery(
        ['userSaleBooking', id],
        async () => {
            const res = await userSaleBookingApi.v1GetById(id);

            return res;
        },
        {
            enabled: !!id,
            onSuccess: (data) => {
                formMethods.setValue('userSaleBookingId', id);
                formMethods.setValue('price', data.price);
                formMethods.setValue('startDate', moment().add(1, 'day').format('YYYY-MM-DDTHH:mm:ss'));
                formMethods.setValue('endDate', moment().add(1, 'day').format('YYYY-MM-DDTHH:mm:ss'));
            },
        },
    );

    const router = useRouter();

    const createMutation = useMutation(userMeSaleBookingOrderApi.v1Post, {
        onSuccess: (data) => {
            toast.success('Đặt lịch thành công');
            router.push(NKRouter.app.userSaleBookingHistory.detail(data.id));
        },
    });

    const onSubmit = (data: UserMeSaleBookingOrderIV1CreateDto) => {
        createMutation.mutate(data);
    };

    return (
        <div className="relative flex h-full w-full flex-col">
            <div className="relative flex h-fit w-full items-start justify-start bg-blue-600 p-4">
                <Link href={NKRouter.app.userMeSale.index()}>
                    <button className="h-6 w-6">
                        <ChevronLeft className="text-white" />
                    </button>
                </Link>

                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">Đặt lịch dịch vụ</p>
            </div>

            <div className="w-full bg-white p-4">
                <FormProvider {...formMethods}>
                    <form id="cart" onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Tên dịch vụ: <span className="text-indigo-600">{userSaleBookingQuery.data?.name}</span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Danh mục: <span className="text-indigo-600">{userSaleBookingQuery.data?.serviceCategory.name}</span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Giá dịch vụ: <span className="text-indigo-600">{formatMoneyVND(userSaleBookingQuery.data?.price || 0)}</span>
                                    </p>
                                </div>
                                <div className="sm:col-span-2">
                                    <p className="text-base font-semibold text-gray-900">
                                        Chi phí phát sinh: <span className="text-indigo-600">{formatMoneyVND(0)}</span>
                                    </p>
                                    <p className="text-sm italic text-gray-700">*Sẽ cập nhật lại sau khi người cung cấp dịch vụ xem mô tả</p>
                                </div>

                                <div className="sm:col-span-2">
                                    <NKTextareaField label="Mô tả" name="description" theme={'AUTH'} />
                                </div>

                                <div className="sm:col-span-2">
                                    <NKDatetimeField label="Ngày bắt đầu" name="startDate" theme={'AUTH'} />
                                </div>

                                <div className="sm:col-span-2">
                                    <NKDatetimeField label="Ngày kết thúc" name="endDate" theme={'AUTH'} />
                                </div>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center bg-blue-600 px-4 py-2 font-semibold text-white"
                                    >
                                        Đặt lịch ngay
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
