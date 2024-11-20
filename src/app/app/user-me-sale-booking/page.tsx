'use client';

import * as React from 'react';

import Link from 'next/link';

import { Plus } from 'akar-icons';
import { BsHeartFill } from 'react-icons/bs';

import { NKRouter } from '@/core/NKRouter';
import { userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { UserSaleBooking } from '@/core/models/userSaleBooking';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    return (
        <div className="flex h-full w-full flex-col items-start justify-start pt-4">
            <div className="flex h-10 w-full flex-shrink-0 px-4 text-base font-medium text-black">
                <Link
                    href={NKRouter.app.userMeSaleBooking.index()}
                    className="flex h-full w-full items-center justify-center border-b-2 border-indigo-600  bg-white"
                >
                    Dịch vụ
                </Link>
                <Link
                    href={NKRouter.app.userMeSaleBookingHistory.index()}
                    className="flex h-full w-full items-center justify-center border-b-2  border-white bg-white"
                >
                    Yêu cầu dịch vụ
                </Link>
            </div>
            <div className="relative flex h-full w-full p-4 [&>div]:h-full [&>div]:w-full">
                <ScrollInfinityBuilder
                    className="grid h-full !w-full grid-cols-2 grid-rows-[208px] gap-4"
                    sourceKey="products"
                    queryApi={userMeSaleBookingApi.v1Get}
                    render={(item: UserSaleBooking, index) => (
                        <Link
                            key={item.id}
                            href={NKRouter.app.userMeSaleBooking.detail(item.id)}
                            className="relative col-span-1 h-full w-full overflow-hidden rounded-3xl"
                        >
                            <div className="absolute left-0 top-0 z-0 h-full w-full">
                                <img src={item.imageUrls[0]} className="h-full w-full object-cover" alt="" />
                            </div>
                            <button className="absolute left-4 top-4 z-10 text-lg text-rose-700">
                                <BsHeartFill />
                            </button>
                            <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
                                <p className="text-xl font-medium text-white">{item.name}</p>
                                <p className="text-sm font-semibold text-white">{formatMoneyVND(item.price)}</p>
                            </div>
                        </Link>
                    )}
                />
                <Link href={NKRouter.app.userMeSaleBooking.create()}>
                    <button className="fixed bottom-24 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                        <Plus className="text-white" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Page;
