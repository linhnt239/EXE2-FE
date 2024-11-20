'use client';

import { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { UserMeSaleBookingIV1UpdateDto, userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKImageUploadMultiple from '@/core/components/form/NKImageUploadMultiple';
import NKNumberField from '@/core/components/form/NKNumberField';
import NKSelectApiOption from '@/core/components/form/NKSelectApiOption';
import NKTextField from '@/core/components/form/NKTextField';

const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), { ssr: false });

interface ProfilePageProps {}

const MePage: FunctionComponent<ProfilePageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const serviceQuery = useQuery({
        queryKey: ['service', id],
        queryFn: () => {
            return userSaleBookingApi.v1GetById(id);
        },
    });
    const router = useRouter();

    if (serviceQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="max-w-xl rounded-lg  border bg-white px-4 py-8 shadow-lg">
                <NKFormWrapper<UserMeSaleBookingIV1UpdateDto>
                    apiAction={async (data) => {
                        return userMeSaleBookingApi.v1Update(id, data);
                    }}
                    onExtraSuccessAction={(data) => {
                        toast.success('Update success');
                        router.push(NKRouter.freelancer.service.detail(id));
                    }}
                    defaultValues={{
                        group: 'freelance',
                        description: _get(serviceQuery, 'data.description', ''),
                        extraFee: 0,
                        imageUrls: _get(serviceQuery, 'data.imageUrls', []),
                        name: _get(serviceQuery, 'data.name', ''),
                        price: _get(serviceQuery, 'data.price', 0),
                        serviceCategoryId: _get(serviceQuery, 'data.serviceCategory.id', ''),
                    }}
                    schema={{
                        group: joi.string().required(),
                        description: joi.string().required(),
                        extraFee: joi.number().required(),
                        imageUrls: joi.array().required(),
                        name: joi.string().required(),
                        price: joi.number().required(),
                        serviceCategoryId: joi.string().required(),
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div className=" text-center text-2xl font-semibold">Chỉnh sửa dịch vụ</div>
                        <NKImageUploadMultiple label="Banner" name="imageUrls" />
                        <NKTextField label="Tên dịch vụ thiết kế" name="name" />
                        <NKRichText label="Miêu tả" name="description" />
                        <NKNumberField label="Giá thuê" name="price" />
                        <NKSelectApiOption label="Danh mục" name="serviceCategoryId" apiAction={serviceCategoryApi.v1Select} />
                        <div>
                            <button
                                type="submit"
                                className="flex  items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </NKFormWrapper>
            </div>
        </div>
    );
};

export default MePage;
