'use client';

import * as React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'akar-icons';
import { FormProvider, useForm } from 'react-hook-form';

import { NKRouter } from '@/core/NKRouter';
import { productCategoryApi } from '@/core/api/product-category.api';
import { UserMeSaleIV1CreateDto, userMeSaleApi } from '@/core/api/user-me-sale.api';
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

const defaultValues: UserMeSaleIV1CreateDto = {
    name: '',
    description: '',
    imageUrls: [],
    price: 0,
    productCategoryId: '',
};

const Page: React.FunctionComponent<PageProps> = () => {
    const formMethods = useForm<UserMeSaleIV1CreateDto>({
        defaultValues,
    });

    const router = useRouter();

    const productCategoryQuery = useQuery(
        ['productCategory', 'all'],
        async () => {
            const res = await productCategoryApi.v1GetAll();
            return res;
        },
        {
            initialData: [],
        },
    );

    const createProductMutation = useMutation(
        (data: UserMeSaleIV1CreateDto) => {
            return userMeSaleApi.v1Create(data);
        },
        {
            onSuccess: (data) => {
                formMethods.reset(defaultValues);
                router.push(NKRouter.app.userMeSale.detail(data.id));
            },
        },
    );

    const onSubmit = (data: UserMeSaleIV1CreateDto) => {
        createProductMutation.mutate(data);
    };

    return (
        <div className="relative flex h-full w-full flex-col">
            <div className="relative flex h-fit w-full items-start justify-start bg-blue-600 p-4">
                <Link href={NKRouter.app.userMeSale.index()}>
                    <button className="h-6 w-6">
                        <ChevronLeft className="text-white" />
                    </button>
                </Link>

                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">Tạo sản phẩm</p>
            </div>

            <div className="w-full bg-white p-4">
                <FormProvider {...formMethods}>
                    <form id="cart" onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div>
                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="sm:col-span-2">
                                    <NKTextField label="Tên sản phẩm" name="name" theme={'AUTH'} />
                                </div>
                                <div className="sm:col-span-2">
                                    <NKSelectField
                                        options={[
                                            {
                                                label: 'Chọn danh mục',
                                                value: '',
                                            },
                                            ...productCategoryQuery.data.map((item) => ({
                                                label: item.name,
                                                value: item.id,
                                            })),
                                        ]}
                                        label="Danh mục"
                                        name="productCategoryId"
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
                                        Tạo sản phẩm
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
