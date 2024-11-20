'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Clock, PeopleGroup, Tag } from 'akar-icons';
import { Popconfirm } from 'antd';
import _get from 'lodash/get';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';
import { userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const router = useRouter();

    const serviceQuery = useQuery({
        queryKey: ['service', id],
        queryFn: () => {
            return userSaleBookingApi.v1GetById(id);
        },
    });

    const deleteService = useMutation({
        mutationKey: ['service', id],
        mutationFn: () => {
            return userMeSaleBookingApi.v1Delete(id);
        },
        onSuccess: () => {
            toast.success('Xoá thành công');
            router.push(NKRouter.freelancer.service.index());
        },
    });

    if (serviceQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex w-full items-center justify-end gap-4">
                <Link
                    href={NKRouter.freelancer.service.edit(id)}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    <PencilIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Chỉnh sửa
                </Link>
                <Popconfirm
                    okButtonProps={{
                        className: 'bg-red-600 hover:bg-red-500',
                    }}
                    title="Are you sure to delete this tutor?"
                    onConfirm={() => deleteService.mutate()}
                >
                    <button className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        Xoá dịch vụ
                    </button>
                </Popconfirm>
            </div>
            <div className="mx-auto mb-16 flex max-w-4xl flex-col gap-4">
                <div className="flex items-end  justify-between gap-4 px-6">
                    <div className="flex w-full flex-col gap-2">
                        <div className="text-3xl font-bold">{serviceQuery.data?.name}</div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 ">
                                <div>
                                    <Clock strokeWidth={2} size={20} className="text-gray-500" />
                                </div>
                                <div className="font-medium text-gray-600">{moment(serviceQuery.data?.createdAt).format('DD/MM/YYYY')}</div>
                            </div>
                            <Link href={NKRouter.service.detail(serviceQuery.data?.user.id || '')} className="flex items-center gap-2">
                                <div>
                                    <PeopleGroup strokeWidth={2} size={20} className="text-gray-500" />
                                </div>
                                <div className="font-medium text-gray-600">{serviceQuery.data?.user.name}</div>
                            </Link>
                            <div className="flex items-center gap-2">
                                <div>
                                    <Tag strokeWidth={2} size={20} className="text-gray-500" />
                                </div>
                                <div className="font-medium text-gray-600">{serviceQuery.data?.serviceCategory.name}</div>
                            </div>
                        </div>
                    </div>

                    <div className="  flex  items-end gap-1 text-gray-400">
                        <div className="text-3xl font-semibold text-indigo-600 ">{formatMoneyVND(serviceQuery.data?.price || 0)}</div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className=" w-[900px] gap-2 rounded-lg border bg-white px-6 py-12 shadow-lg">
                        <div className="flex flex-col gap-4">
                            <div>
                                <Swiper modules={[Autoplay]} autoplay className="h-[450px] overflow-hidden rounded-2xl">
                                    {serviceQuery.data?.imageUrls.map((item) => (
                                        <SwiperSlide key={item} className="h-full w-full">
                                            <img src={item} alt="" className="h-full w-full object-cover" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div
                                className="prose text-base font-normal prose-img:m-0 prose-img:w-full prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: serviceQuery.data?.description || '' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
