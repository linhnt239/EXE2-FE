'use client';

import * as React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'akar-icons';
import { FormProvider, useForm } from 'react-hook-form';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { UserMeSaleBookingIV1CreateDto, userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import NKImageUploadMultiple from '@/core/components/form/NKImageUploadMultiple';
import NKNumberField from '@/core/components/form/NKNumberField';
import { NKRichTextProps } from '@/core/components/form/NKRichText';
import NKSelectField from '@/core/components/form/NKSelectField';
import NKTextField from '@/core/components/form/NKTextField';

// const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), {
//     ssr: false,
// }) as React.FC<NKRichTextProps>;

const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), { ssr: false }) as React.FC<NKRichTextProps>;

interface PageProps {}

const defaultValues: UserMeSaleBookingIV1CreateDto = {
    group: '',
    name: '',
    description: '',
    imageUrls: [],
    price: 0,
    serviceCategoryId: '',
    extraFee: 0,
};

const Page: React.FunctionComponent<PageProps> = () => {
    const formMethods = useForm<UserMeSaleBookingIV1CreateDto>({
        defaultValues,
    });

    const router = useRouter();

    const serviceCategoryQuery = useQuery(
        ['serviceCategory', 'all'],
        async () => {
            const res = await serviceCategoryApi.v1GetAll();
            return res;
        },
        {
            initialData: [],
        },
    );

    const createUserSaleBookingMutation = useMutation(
        (data: UserMeSaleBookingIV1CreateDto) => {
            return userMeSaleBookingApi.v1Create(data);
        },
        {
            onSuccess: (data) => {
                formMethods.reset(defaultValues);
                router.push(NKRouter.app.userMeSaleBooking.detail(data.id));
            },
        },
    );

    const onSubmit = (data: UserMeSaleBookingIV1CreateDto) => {
        createUserSaleBookingMutation.mutate(data);
    };

    return (
        <div className="relative flex h-full w-full flex-col">
            <div className="relative flex h-fit w-full items-start justify-start bg-blue-600 p-4">
                <Link href={NKRouter.app.userMeSale.index()}>
                    <button className="h-6 w-6">
                        <ChevronLeft className="text-white" />
                    </button>
                </Link>

                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">Tạo dịch vụ</p>
            </div>

            <div className="w-full bg-white p-4">
                <FormProvider {...formMethods}>
                    <form id="cart" onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <NKTextField label="Tên dịch vụ" name="name" theme={'AUTH'} />
                                </div>
                                <div className="sm:col-span-2">
                                    <NKSelectField
                                        options={[
                                            {
                                                label: 'Chọn danh mục',
                                                value: '',
                                            },
                                            ...serviceCategoryQuery.data.map((item) => ({
                                                label: item.name,
                                                value: item.id,
                                            })),
                                        ]}
                                        label="Danh mục"
                                        name="serviceCategoryId"
                                        theme={'AUTH'}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <NKRichText label="Mô tả" name="description" theme="DEFAULT" />
                                </div>
                                <div className="sm:col-span-2">
                                    <NKNumberField label="Giá" name="price" type="number" theme={'AUTH'} />
                                </div>
                                <div className="sm:col-span-2">
                                    <NKImageUploadMultiple label="Hình ảnh" name="imageUrls" />
                                </div>
                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center bg-blue-600 px-4 py-2 font-semibold text-white"
                                    >
                                        Tạo dịch vụ
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
