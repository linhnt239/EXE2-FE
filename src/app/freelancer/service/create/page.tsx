'use client';

import { FunctionComponent } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { CheckCircleIcon } from '@heroicons/react/20/solid';
import joi from 'joi';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { UserMeSaleBookingIV1CreateDto, userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKImageUploadMultiple from '@/core/components/form/NKImageUploadMultiple';
import NKNumberField from '@/core/components/form/NKNumberField';
import NKSelectApiOption from '@/core/components/form/NKSelectApiOption';
import NKTextField from '@/core/components/form/NKTextField';

const NKRichText = dynamic(() => import('@/core/components/form/NKRichText'), { ssr: false });

interface ProfilePageProps {}

const MePage: FunctionComponent<ProfilePageProps> = () => {
    const router = useRouter();
    return (
        <div>
            <div className="max-w-xl rounded-lg  border bg-white px-4 py-8 shadow-lg">
                <NKFormWrapper<UserMeSaleBookingIV1CreateDto>
                    apiAction={async (data) => {
                        return userMeSaleBookingApi.v1Create(data);
                    }}
                    onExtraSuccessAction={(data) => {
                        toast.success('Create success');
                        router.push(NKRouter.freelancer.service.detail(data.id));
                    }}
                    defaultValues={{ description: '', extraFee: 0, imageUrls: [], name: '', price: 0, serviceCategoryId: '', group: 'freelance' }}
                    schema={{
                        description: joi.string().required(),
                        extraFee: joi.number().required(),
                        imageUrls: joi.array().required(),
                        name: joi.string().required(),
                        price: joi.number().required(),
                        serviceCategoryId: joi.string().required(),
                        group: joi.string().required(),
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div className=" text-center text-2xl font-semibold">Tạo dịch vụ</div>
                        <NKImageUploadMultiple label="Banner" name="imageUrls" />
                        <NKTextField label="Tên dịch vụ thiết kế" name="name" />
                        <NKRichText label="Mô tả" name="description" />
                        <NKNumberField label="Giá" name="price" />
                        <NKSelectApiOption label="Danh Mục" name="serviceCategoryId" apiAction={serviceCategoryApi.v1Select} />
                        <div>
                            <button
                                type="submit"
                                className="flex  items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                            >
                                <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                Tạo dịch vụ
                            </button>
                        </div>
                    </div>
                </NKFormWrapper>
            </div>
        </div>
    );
};

export default MePage;
