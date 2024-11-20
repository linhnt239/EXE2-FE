'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Tab } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { Badge, Rate } from 'antd';
import clsx from 'clsx';
import _get from 'lodash/get';
import moment from 'moment';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { commonReviewApi } from '@/core/api/common-review.api';
import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userApi } from '@/core/api/user.api';
import ReviewCard from '@/core/components/Review/ReviewCard';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { CommonReview } from '@/core/models/commonReview';
import { UserSaleBookingOrder } from '@/core/models/user-sale-booking-order';
import { RootState } from '@/core/store';
import { getColorWithUuId } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userQuery = useQuery({
        queryKey: ['user', id],
        queryFn: () => {
            return userApi.v1GetById(id);
        },
    });

    const userState = useSelector<RootState, RootState['user']>((state) => state.user);

    const commonReviewAverage = useQuery({
        queryKey: ['common-review-average'],
        queryFn: async () => {
            const res = await commonReviewApi.v1Get({
                filters: [`subOwnerId||${FilterComparator.EQUAL}||${id}`],
                // filters: [],
                orderBy: [],
                page: 0,
                pageSize: 9999999,
            });

            const total = res.data.length;

            const rate = res.data.reduce((acc, cur) => acc + cur.rate, 0);

            return {
                total,
                rate: rate / total,
            };
        },
        initialData: {
            total: 0,
            rate: 0,
        },
    });

    if (userQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex justify-center pt-64">
            <div className="absolute left-0 top-0 h-[440px] w-full ">
                <div className="relative h-full w-full">
                    <img src={userQuery.data?.banner} className="fade-b-in relative z-0 h-full w-full object-cover" alt="" />
                    <div className="fade-b-in absolute bottom-0 left-0 z-10 h-20 w-full" />
                </div>
            </div>
            <div className="relative z-10 grid w-full max-w-app grid-cols-6 gap-4">
                <div className="relative col-span-2 h-full w-full">
                    <div className="sticky left-0 top-28 flex flex-col gap-5">
                        <div className="overflow-hidden rounded-lg border border-[#4ade80] bg-green-50 p-4 shadow-[-5px_5px_0px_0px_#4ade80]">
                            <div className="text-center">
                                <div className="mx-auto my-2 h-20 w-20 overflow-hidden rounded-sm">
                                    <img src={userQuery.data?.avatar} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-3 text-center">
                                    <h1 className="text-2xl font-semibold text-gray-900">{userQuery.data?.name}</h1>
                                    <p className="text-sm text-gray-400">{userQuery.data?.email}</p>
                                    <p className="text-sm italic text-gray-400">{userQuery.data?.bio}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-[#4ade80] bg-green-50 p-4 shadow-[-5px_5px_0px_0px_#4ade80]">
                            {commonReviewAverage.data?.rate > 0 ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Rate disabled value={commonReviewAverage.data?.rate} />
                                    <p className="text-base font-semibold text-green-500">{commonReviewAverage.data?.rate.toFixed(1)}</p>
                                </div>
                            ) : (
                                <p className="text-base font-semibold text-green-500">Chưa có đánh giá</p>
                            )}

                            <p className="text-base font-semibold text-green-500">{commonReviewAverage.data?.total} đánh giá</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 flex w-full  rounded-lg border border-[#4ade80] bg-white p-10 ">
                    <Tab.Group>
                        <div className="flex w-full flex-col gap-2">
                            <Tab.List className={'flex gap-2 text-base font-medium text-black'}>
                                <Tab
                                    className={({ selected }) =>
                                        clsx('border-b-2  px-6 py-2 duration-200 focus:outline-none', {
                                            'border-[#4ade80] text-green-500': selected,
                                            'border-transparent text-gray-500': !selected,
                                        })
                                    }
                                >
                                    Dịch Vụ
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        clsx('border-b-2  px-6 py-2 duration-200 focus:outline-none', {
                                            'border-[#4ade80] text-green-500': selected,
                                            'border-transparent text-gray-500': !selected,
                                        })
                                    }
                                >
                                    Đơn đã hoàn thành
                                </Tab>
                                <Tab
                                    className={({ selected }) =>
                                        clsx('border-b-2  px-6 py-2 duration-200 focus:outline-none', {
                                            'border-[#4ade80] text-green-500': selected,
                                            'border-transparent text-gray-500': !selected,
                                        })
                                    }
                                >
                                    Đánh Giá
                                </Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <ScrollInfinityBuilder
                                        sourceKey="service"
                                        queryApi={userSaleBookingApi.v1Get}
                                        filters={[`user.id||${FilterComparator.EQUAL}||${id}`, `group||${FilterComparator.EQUAL}||freelance`]}
                                        className="grid w-full grid-cols-2 gap-4"
                                        render={(data, index) => {
                                            return (
                                                <Badge.Ribbon
                                                    key={data.id}
                                                    text={data?.serviceCategory.name}
                                                    color={getColorWithUuId(data.serviceCategory.id)}
                                                >
                                                    <div
                                                        className={`fade-in flex h-40 items-center justify-between overflow-hidden rounded-2xl border bg-white`}
                                                    >
                                                        <div className="h-full w-auto flex-shrink-0  overflow-hidden  bg-gray-500">
                                                            <img src={data.imageUrls[0]} className="h-full w-full object-cover" />
                                                        </div>
                                                        <div className="mt-2 flex w-full flex-col gap-2 p-4">
                                                            <div className="flex w-full flex-col gap-4">
                                                                <p className="line-clamp-2  text-left text-xl font-semibold leading-8 text-neutral-800">
                                                                    {data.name}
                                                                </p>
                                                            </div>

                                                            <div className="w-full border-t text-[#E2E2E2]" />
                                                            <div className="flex w-full items-center justify-between text-left text-green-500">
                                                                <p className="0 text-base font-semibold leading-6">
                                                                    {formatMoneyVND(data.price || 0)}
                                                                </p>
                                                                <Link
                                                                    href={NKRouter.service.detail(data.id)}
                                                                    className="0 flex items-center justify-between gap-2  rounded-3xl text-xs font-normal leading-4"
                                                                >
                                                                    <div className="h-6 w-6 text-green-500">
                                                                        <ChevronRightIcon className="h-full w-full" />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Badge.Ribbon>
                                            );
                                        }}
                                    />
                                </Tab.Panel>
                                <Tab.Panel className={'w-full'}>
                                    <ScrollInfinityBuilder
                                        sourceKey="previous"
                                        queryApi={userSaleBookingOrderApi.v1Get}
                                        filters={[
                                            `userSaleBooking.user.id||${FilterComparator.EQUAL}||${id}`,
                                            `status||${FilterComparator.EQUAL}||${'PAID'}`,
                                        ]}
                                        className="grid !w-full grid-cols-2 gap-4 p-2"
                                        render={(data: UserSaleBookingOrder, index) => {
                                            return (
                                                <div className="flex w-full flex-col gap-2 overflow-hidden rounded-lg  bg-green-50 p-4 shadow-[-5px_5px_0px_0px_#4ade80]">
                                                    <div className="flex w-full items-center gap-2">
                                                        <div className="h-8 w-8 overflow-hidden rounded-full">
                                                            <img src={data.user.avatar} className="h-full w-full object-cover" />
                                                        </div>
                                                        <p className="text-base font-semibold text-gray-900">{userQuery.data?.name}</p>
                                                    </div>
                                                    <Link
                                                        href={NKRouter.service.detail(data.userSaleBooking.id)}
                                                        className="text-sm text-green-600 duration-200 hover:text-green-400"
                                                    >
                                                        {data.userSaleBooking.name}
                                                    </Link>
                                                </div>
                                            );
                                        }}
                                    />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <ScrollInfinityBuilder
                                        sourceKey="review"
                                        queryApi={commonReviewApi.v1Get}
                                        filters={[`subOwnerId||${FilterComparator.EQUAL}||${id}`].flat()}
                                        className="flex flex-col gap-2"
                                        render={(data: CommonReview, index) => {
                                            return (
                                                <div className="flex h-full w-full gap-4 ">
                                                    <div className="flex min-h-40 w-full flex-col gap-4 rounded border border-[#4ade80] bg-white p-8 shadow">
                                                        <div className="flex w-full justify-between gap-2">
                                                            <Link
                                                                href={NKRouter.service.detail(data.createdBy.id)}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <div className="h-10 w-10 overflow-hidden rounded-full">
                                                                    <img src={data.createdBy.avatar} alt="" className="h-full w-full object-cover" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <p className="text-sm font-medium text-green-950">{data.createdBy.name}</p>
                                                                    <p className="text-xs font-medium text-gray-500">
                                                                        {moment(data.createdAt).utc().fromNow()}
                                                                    </p>
                                                                </div>
                                                            </Link>
                                                            <Rate disabled value={data.rate} />
                                                        </div>
                                                        <div className="flex flex-col justify-start gap-1">
                                                            <div className="flex w-full items-center justify-between"></div>
                                                            <p className="text-sm text-gray-500">{data.content}</p>
                                                        </div>
                                                        {data.imageUrls?.length && (
                                                            <div className="flex flex-col gap-1">
                                                                <p className="text-base font-medium text-black">
                                                                    Ảnh đính kèm:{' '}
                                                                    <span className="text-base font-normal text-gray-500">
                                                                        {data.imageUrls.length}
                                                                    </span>
                                                                </p>
                                                                <div className="flex w-full flex-wrap items-start justify-start gap-2">
                                                                    <PhotoProvider>
                                                                        {data.imageUrls.map((img, index) => (
                                                                            <PhotoView key={img} src={img}>
                                                                                <div className="h-20 w-20 overflow-hidden rounded-md border border-black duration-150 hover:border-[#4ade80]">
                                                                                    <img src={img} alt="" className="h-auto w-full" />
                                                                                </div>
                                                                            </PhotoView>
                                                                        ))}
                                                                    </PhotoProvider>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    />
                                </Tab.Panel>
                            </Tab.Panels>
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
};

export default Page;
