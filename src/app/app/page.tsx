'use client';

import * as React from 'react';

import Link from 'next/link';

import { ArrowRight, Heart } from 'akar-icons';
import { BsHeartFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    return (
        <div className="flex h-full w-full flex-col justify-start">
            <div className="flex flex-col gap-2 p-4">
                <div className="h-24 w-full gap-4 overflow-hidden rounded-3xl">
                    <img src="https://dummyimage.com/358x96/67729D/fff" className="h-full w-full" alt="" />
                </div>
                <p className="text-center text-base font-semibold uppercase leading-5 text-black">
                    Khám phá cùng cộng đồng <br /> nhiếp ảnh gia tại đây!!
                </p>
            </div>
            <div className="flex w-full flex-col gap-10 p-4">
                <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center justify-between text-black">
                        <p className="text-lg font-semibold">Nhiếp ảnh gia nổi bật</p>
                        <Link className=" text-lg" href={NKRouter.app.photographers.index()}>
                            <ArrowRight />
                        </Link>
                    </div>
                    <Swiper className="h-52 w-[calc(100vw-32px)]" slidesPerView={2} spaceBetween={20}>
                        {['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p'].map((item, index) => (
                            <SwiperSlide key={item} className="h-full w-full">
                                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                                    <Link href={NKRouter.app.photographers.detail('test')} className="absolute left-0 top-0 z-0 h-full w-full">
                                        <img src="https://dummyimage.com/168x208/67729D/fff" className="h-full w-full" alt="" />
                                    </Link>
                                    <button className="absolute left-4 top-4 z-10 text-lg text-rose-700">
                                        <BsHeartFill />
                                    </button>
                                    <p className="absolute bottom-8 left-4 z-10 text-xl font-medium text-white">Đức</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center justify-between text-black">
                        <p className="text-lg font-semibold">Mẫu ảnh nổi bật</p>
                        <Link className=" text-lg" href={NKRouter.app.photographers.index()}>
                            <ArrowRight />
                        </Link>
                    </div>
                    <Swiper className="h-52 w-[calc(100vw-32px)]" slidesPerView={2} spaceBetween={20}>
                        {['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p'].map((item, index) => (
                            <SwiperSlide key={item} className="h-full w-full">
                                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                                    <Link href={NKRouter.app.photographers.detail('test')} className="w-fulltop-0 absolute left-0 z-0 h-full">
                                        <img src="https://dummyimage.com/168x208/67729D/fff" className="h-full w-full" alt="" />
                                    </Link>
                                    <button className="absolute left-4 top-4 z-10 text-lg text-rose-700">
                                        <BsHeartFill />
                                    </button>
                                    <p className="absolute bottom-8 left-4 z-10 text-xl font-medium text-white">Đức</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full items-center justify-between text-black">
                        <p className="text-lg font-semibold">Sản phẩm nổi bật</p>
                        <Link className=" text-lg" href={NKRouter.app.photographers.index()}>
                            <ArrowRight />
                        </Link>
                    </div>
                    <Swiper className="h-52 w-[calc(100vw-32px)]" slidesPerView={2} spaceBetween={20}>
                        {['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p'].map((item, index) => (
                            <SwiperSlide key={item} className="h-full w-full">
                                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                                    <Link href={NKRouter.app.photographers.detail('test')} className="w-fulltop-0 absolute left-0 z-0 h-full">
                                        <img src="https://dummyimage.com/168x208/67729D/fff" className="h-full w-full" alt="" />
                                    </Link>
                                    <button className="absolute left-4 top-4 z-10 text-lg text-rose-700">
                                        <BsHeartFill />
                                    </button>
                                    <p className="absolute bottom-8 left-4 z-10 text-xl font-medium text-white">Đức</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Page;
