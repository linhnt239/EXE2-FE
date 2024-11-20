'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Tab } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'akar-icons';
import clsx from 'clsx';
import _get from 'lodash/get';
import { PiHeartFill, PiStarFill } from 'react-icons/pi';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';
import { productApi } from '@/core/api/product.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { useCart } from '@/core/contexts/CartContext';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const [quantity, setQuantity] = React.useState(1);

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
        },
    );

    // const handleIncrease = () => {
    //     setQuantity(quantity + 1);
    // };

    // const handleDecrease = () => {
    //     if (quantity <= 1) return;
    //     setQuantity(quantity - 1);
    // };

    const router = useRouter();

    // const { handleAddToCart } = useCart();

    // const clickAddToCart = () => {
    //     if (!productQuery.data) return;

    //     handleAddToCart({
    //         productVariantId: productQuery.data?.productVariants[0].id,
    //         quantity: quantity,
    //     });
    //     setQuantity(1);

    //     toast.success('Thêm vào giỏ hàng thành công');
    // };

    return (
        <div className="relative flex h-full w-full flex-col">
            {/* <Link href={NKRouter.app.product.index()}> */}
            <button className="absolute left-4 top-4 z-10" onClick={() => router.back()}>
                <ArrowLeft className=" h-6 w-6 text-white" />
            </button>
            {/* </Link> */}

            {userSaleBookingQuery.isSuccess ? (
                <>
                    <div className="fixed bottom-0 left-0 z-30 flex w-full  justify-center gap-4 bg-white px-4 py-10 pt-2 shadow">
                        <button className="flex h-10 w-20 flex-shrink-0 items-center justify-center rounded-full bg-blue-600">
                            <PiHeartFill className="h-6 w-6 text-white" />
                        </button>
                        <Link href={NKRouter.app.userSaleBooking.form(id)} className="w-full">
                            <button className="flex h-10 w-full items-center justify-center rounded-full bg-purple-600 text-sm font-semibold uppercase text-white">
                                Đặt lịch
                            </button>
                        </Link>
                    </div>
                    <Swiper className="relative z-0 h-56 w-screen  overflow-hidden" slidesPerView={1}>
                        {userSaleBookingQuery.data?.imageUrls.map((image) => (
                            <SwiperSlide key={image}>
                                <img src={image} className="h-full w-full object-cover" alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="relative z-10 flex  h-full w-full flex-col bg-white px-6 shadow-none">
                        <div className="absolute -top-[14px] left-0 h-4 w-full rounded-t-2xl bg-white"></div>
                        <p className="text-sm font-semibold text-gray-900">{userSaleBookingQuery.data?.serviceCategory.name}</p>
                        <p className="text-xl font-semibold text-gray-900">{userSaleBookingQuery.data?.name}</p>
                        <p className="text-base font-bold text-indigo-700">{formatMoneyVND(userSaleBookingQuery.data?.price ?? 0)}</p>
                        {/* <div className="mt-2 flex w-full justify-between gap-2">
                            <p className="text-2xl font-semibold text-purple-600">{formatMoneyVND(userSaleQuery.data?.price ?? 0)}</p>
                            <div className="flex items-center justify-center overflow-hidden  rounded-full bg-gray-200 text-center font-semibold">
                                <button className="w-10 flex-shrink-0 text-4xl text-purple-600" onClick={() => handleDecrease()}>
                                    -
                                </button>
                                <span className="w-10 flex-shrink-0 text-xl">{quantity}</span>
                                <button className="w-10 flex-shrink-0 text-2xl text-purple-600" onClick={() => handleIncrease()}>
                                    +
                                </button>
                            </div>
                        </div> */}
                        {/* {userSaleQuery.data.productReviews.length > 0 ? (
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
                                        Mô tả
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className={'h-full w-full pb-28  pt-5'}>
                                    <Tab.Panel className={'relative h-full w-full'}>
                                        <div
                                            className="w-full overflow-y-auto whitespace-pre-line text-sm font-medium text-black"
                                            dangerouslySetInnerHTML={{
                                                __html: userSaleBookingQuery.data?.description,
                                            }}
                                        />
                                    </Tab.Panel>
                                    <Tab.Panel className={'flex w-full flex-col gap-2'}>
                                        {/* {userSaleQuery.data.productReviews.length > 0 ? (
                                            <>
                                                {userSaleQuery.data.productReviews.map((review) => (
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
