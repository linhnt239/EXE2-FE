'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Tab } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'akar-icons';
import clsx from 'clsx';
import _get from 'lodash/get';
import moment from 'moment';
import { PiHeartFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';
import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;

    const userSaleBookingOrderQuery = useQuery(
        ['userSaleBookingOrder', id],
        async () => {
            const res = await userSaleBookingOrderApi.v1GetById(id);

            return res;
        },
        {
            enabled: !!id,
        },
    );
    const router = useRouter();

    const cancelMutation = useMutation(userMeSaleBookingOrderApi.v1Cancel, {
        onSuccess: () => {
            toast.success('Huỷ lịch thành công');
            router.push(NKRouter.app.userSaleBookingHistory.index());
        },
    });

    return (
        <div className="relative flex h-full w-full flex-col">
            <div className="relative flex h-full w-full flex-col">
                <Link className="absolute left-4 top-4 z-10" href={NKRouter.app.userSaleBookingHistory.index()}>
                    <ArrowLeft className=" h-6 w-6 text-white" />
                </Link>

                <div className="absolute right-4 top-4 z-10 flex gap-2">
                    <ModalBuilder
                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        btnProps={{
                            className: 'rounded bg-red-600 px-4 py-1 text-white',
                        }}
                        btnLabel="Huỷ lịch"
                        modalTitle={<h2 className="mb-2 text-xl font-medium text-black">Huỷ lịch</h2>}
                    >
                        {(closeModal) => (
                            <div className="flex w-full flex-col">
                                <p className="mb-4 text-gray-900">Bạn có chắc chắn muốn huỷ lịch đặt dịch vụ này không?</p>
                                <div className="flex w-full justify-end gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Đóng
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                        onClick={() => cancelMutation.mutate(id)}
                                    >
                                        Huỷ
                                    </button>
                                </div>
                            </div>
                        )}
                    </ModalBuilder>
                    {userSaleBookingOrderQuery.data?.status === 'PENDING' && (
                        <Link href={NKRouter.app.userMeSaleBookingHistory.accept(id)}>
                            <button className="rounded bg-green-600 px-4 py-1 text-white">Chấp nhận</button>
                        </Link>
                    )}
                </div>

                {userSaleBookingOrderQuery.isSuccess ? (
                    <>
                        <Swiper className="relative z-0 h-56 w-screen flex-shrink-0  overflow-hidden" slidesPerView={1}>
                            {userSaleBookingOrderQuery.data.userSaleBooking.imageUrls.map((image) => (
                                <SwiperSlide key={image}>
                                    <img src={image} className="h-full w-full object-cover" alt="" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="relative z-10 flex  h-full w-full flex-col bg-white px-6 shadow-none">
                            <div className="absolute -top-[14px] left-0 h-4 w-full rounded-t-2xl bg-white"></div>
                            <p className="text-sm font-semibold text-gray-900">
                                {userSaleBookingOrderQuery.data.userSaleBooking.serviceCategory.name}
                            </p>
                            <p className="text-xl font-semibold text-gray-900">{userSaleBookingOrderQuery.data.userSaleBooking.name}</p>
                            <div className="mt-2 flex w-full justify-between gap-2">
                                <p className="text-2xl font-semibold text-purple-600">
                                    {formatMoneyVND(userSaleBookingOrderQuery.data.userSaleBooking.price ?? 0)}
                                </p>
                            </div>

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
                                            Chi tiết
                                        </Tab>
                                        <Tab
                                            className={(props) =>
                                                clsx('h-10 w-full border-b-2 text-lg font-semibold outline-none', {
                                                    'border-purple-600 text-black': props.selected,
                                                    'border-white  text-gray-400': !props.selected,
                                                })
                                            }
                                        >
                                            Mô tả dịch vụ
                                        </Tab>
                                    </Tab.List>
                                    <Tab.Panels className={'h-full w-full pb-28  pt-5'}>
                                        <Tab.Panel className={'flex w-full flex-col gap-2'}>
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
                                            <div className="sm:col-span-2">
                                                <p className="text-base font-semibold text-gray-900">Mô tả của người đặt:</p>
                                                <p className="text-base text-gray-900">
                                                    {userSaleBookingOrderQuery.data?.description || 'Không có mô tả'}
                                                </p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-base font-semibold text-gray-900">Phản hồi từ bạn: </p>
                                                <p className="text-base text-gray-900">
                                                    {userSaleBookingOrderQuery.data?.note || 'Không có phản hồi'}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 sm:col-span-2">
                                                <p className="text-base font-semibold text-gray-900">Trạng thái:</p>
                                                <FieldBadgeApi
                                                    apiAction={userSaleBookingOrderApi.v1GetEnumStatus}
                                                    value={userSaleBookingOrderQuery.data?.status}
                                                />
                                            </div>
                                            <div className="mt-10 flex w-full flex-col gap-2">
                                                <div className="flex w-full justify-between text-base font-semibold">
                                                    <p className=" text-gray-900">Giá dịch vụ:</p>
                                                    <p className="text-indigo-600">{formatMoneyVND(userSaleBookingOrderQuery.data?.price || 0)}</p>
                                                </div>
                                                <div className="flex w-full justify-between text-base font-semibold">
                                                    <p className=" text-gray-900">Chi phí phát sinh:</p>
                                                    <p className="text-indigo-600">{formatMoneyVND(userSaleBookingOrderQuery.data?.extraFee || 0)}</p>
                                                </div>

                                                <div className="flex w-full justify-between border-t border-solid border-black text-base font-semibold">
                                                    <p className=" text-gray-900">Tổng tiền: </p>
                                                    <p className="text-indigo-600">
                                                        {formatMoneyVND(
                                                            Number(userSaleBookingOrderQuery.data?.price || 0) +
                                                                Number(userSaleBookingOrderQuery.data.extraFee || 0),
                                                        )}
                                                    </p>
                                                </div>

                                                <p className="text-xs italic text-gray-700">
                                                    *Sẽ cập nhật lại sau khi người cung cấp dịch vụ xem mô tả
                                                </p>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel className={'relative h-full w-full'}>
                                            <div
                                                className="w-full  overflow-y-auto whitespace-pre-line text-sm font-medium text-black"
                                                dangerouslySetInnerHTML={{ __html: userSaleBookingOrderQuery.data.userSaleBooking.description }}
                                            />
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
        </div>
    );
};

export default Page;
