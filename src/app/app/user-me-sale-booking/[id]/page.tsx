'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Tab } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'akar-icons';
import clsx from 'clsx';
import _get from 'lodash/get';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';
import { userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSaleBooking = useQuery(
        ['userSaleBooking', id],
        async () => {
            const res = await userSaleBookingApi.v1GetById(id);

            return res;
        },
        {
            enabled: !!id,
        },
    );

    const router = useRouter();

    const deleteMutation = useMutation((id: string) => userMeSaleBookingApi.v1Delete(id), {
        onSuccess: () => {
            toast.success('Xoá thành công');
            router.push(NKRouter.app.userMeSaleBooking.index());
        },
    });

    return (
        <div className="relative flex h-full w-full flex-col">
            <Link className="absolute left-4 top-4 z-10" href={NKRouter.app.userMeSaleBooking.index()}>
                <ArrowLeft className=" h-6 w-6 text-white" />
            </Link>

            <div className="absolute right-4 top-4 z-10 flex gap-2">
                <ModalBuilder
                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                    btnProps={{
                        className: 'rounded bg-red-600 px-4 py-1 text-white',
                    }}
                    btnLabel="Xoá"
                    modalTitle={<h2 className="mb-2 text-xl font-medium text-black">Xoá dịch vụ</h2>}
                >
                    {(closeModal) => (
                        <div className="flex w-full flex-col">
                            <p className="mb-4 text-gray-900">Dịch vụ sẽ bị xoá vĩnh viễn sau khi bấm &quot;xoá&quot;</p>
                            <div className="flex w-full justify-end gap-2">
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                >
                                    Huỷ
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    onClick={() => deleteMutation.mutate(id)}
                                >
                                    Xoá
                                </button>
                            </div>
                        </div>
                    )}
                </ModalBuilder>
                <Link href={NKRouter.app.userMeSaleBooking.edit(id)}>
                    <button className="rounded bg-blue-600 px-4 py-1 text-white">Chỉnh sửa</button>
                </Link>
            </div>

            {userSaleBooking.isSuccess ? (
                <>
                    <Swiper className="relative z-0 h-56 w-screen flex-shrink-0  overflow-hidden" slidesPerView={1}>
                        {userSaleBooking.data?.imageUrls.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} className="h-full w-full object-cover" alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="relative z-10 flex  h-full w-full flex-col bg-white px-6 shadow-none">
                        <div className="absolute -top-[14px] left-0 h-4 w-full rounded-t-2xl bg-white"></div>
                        <p className="text-sm font-semibold text-gray-900">{userSaleBooking.data?.serviceCategory.name}</p>
                        <p className="text-xl font-semibold text-gray-900">{userSaleBooking.data?.name}</p>
                        <div className="mt-2 flex w-full justify-between gap-2">
                            <p className="text-2xl font-semibold text-purple-600">{formatMoneyVND(userSaleBooking.data?.price ?? 0)}</p>
                        </div>
                        {/* {userSale.data.length > 0 ? (
                            <div className="my-4 flex w-full justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 text-yellow-400">
                                        <PiStarFill strokeWidth={2} className="h-full w-full" />
                                    </div>
                                    <p className="text-base font-semibold text-black">
                                        {productQuery.data.productReviews.reduce((total, a) => total + a.rate, 0) /
                                            productQuery.data.productReviews.length || 1}
                                        <span className="text-sm font-normal text-gray-400">{productQuery.data.productReviews.length || 0}</span>
                                    </p>
                                </div>

                                <div className="flex">
                                    <div className="relative z-0  h-10 w-10 translate-x-4 overflow-hidden rounded-full border border-white ">
                                        <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className="z-10 h-10  w-10 translate-x-2 overflow-hidden rounded-full border border-white">
                                        <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                    </div>
                                    <div className="z-20 h-10  w-10 overflow-hidden rounded-full border border-white">
                                        <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>
                                <span className="text-sm font-semibold italic text-gray-600">No review</span>
                            </p>
                        )} */}
                        <div className="">
                            <Tab.Group>
                                <Tab.List className={'flex w-full'}>
                                    <Tab
                                        className={(props) =>
                                            clsx('h-10 w-full border-b-2 text-lg font-semibold outline-none', {
                                                'border-purple-600 text-black': props.selected,
                                                'border-white  text-gray-400': !props.selected,
                                            })
                                        }
                                    >
                                        Description
                                    </Tab>
                                    <Tab
                                        className={(props) =>
                                            clsx('h-10 w-full border-b-2 text-lg font-semibold outline-none', {
                                                'border-purple-600 text-black': props.selected,
                                                'border-white  text-gray-400': !props.selected,
                                            })
                                        }
                                    >
                                        Review
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className={'h-full w-full pb-28  pt-5'}>
                                    <Tab.Panel className={'relative h-full w-full'}>
                                        <div
                                            className="w-full  overflow-y-auto whitespace-pre-line text-sm font-medium text-black"
                                            dangerouslySetInnerHTML={{ __html: userSaleBooking.data?.description }}
                                        />
                                    </Tab.Panel>
                                    <Tab.Panel className={'flex w-full flex-col gap-2'}>
                                        {/* {userSale.data.productReviews.length > 0 ? (
                                            <>
                                                {productQuery.data.productReviews.map((review) => (
                                                    <div key={review.id} className="flex gap-4 border-b border-gray-200  pb-2">
                                                        <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full border border-black">
                                                            <img src="https://i.pravatar.cc/40" className="h-full w-full object-cover" alt="" />
                                                        </div>
                                                        <div className="flex flex-col gap-2">
                                                            <p className="text-xs font-semibold text-black">Pham Vinh Tai</p>
                                                            <div className="flex gap-2">
                                                                {Array.from({ length: review.rate }).map((_, index) => (
                                                                    <div key={`${review.id}-${index}`} className="h-3 w-3 text-yellow-400">
                                                                        <PiStarFill strokeWidth={2} className="h-full w-full" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="text-sm font-medium text-black ">{review.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <p>
                                                <span className="text-sm font-semibold italic text-gray-600">No review</span>
                                            </p>
                                        )} */}
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Page;
