'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { Badge, Tag } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NKRouter } from '@/core/NKRouter';
import { commonReviewApi } from '@/core/api/common-review.api';
import { UserMeSaleBookingOrderIV1CreateDto, userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import ButtonC from '@/core/components/Button/Button';
import ReviewCard from '@/core/components/Review/ReviewCard';
import NKDateField from '@/core/components/form/NKDateField';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { getColorWithUuId } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const router = useRouter();

    const dataQuery = useQuery({
        queryKey: ['my-tutor', id],
        queryFn: () => {
            return userSaleBookingApi.v1GetById(id);
        },
    });

    if (dataQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fade-in flex justify-center">
            <div className="flex h-full w-full max-w-[1440px] flex-col">
                <section className="relative grid w-full grid-cols-4 gap-10  ">
                    <div className="col-span-1">
                        <div className="sticky left-0 top-32 flex w-full  flex-col items-center justify-center gap-4 rounded-lg  border border-[#4ade80] bg-green-50 px-2 py-6 shadow-lg">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                                    <img src={dataQuery.data?.user.avatar} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div className="font-medium text-gray-600">{dataQuery.data?.user.name}</div>
                            </div>
                            <ModalBuilder
                                modalTitle={<p className="mb-5 text-2xl font-semibold">Liên hệ với client</p>}
                                className="w-[500px] rounded-lg bg-white px-5 py-8 shadow-xl"
                                btnLabel={`Liên hệ ngay`}
                                btnProps={{
                                    className: 'rounded bg-green-600 px-8 py-2 text-base font-semibold text-white shadow ',
                                }}
                            >
                                {(close) => (
                                    <NKFormWrapper<UserMeSaleBookingOrderIV1CreateDto>
                                        apiAction={async (value) => {
                                            console.log(value.startDate, moment(value.startDate).add(1, 'month').format('YYYY-MM-DD'));
                                            return await userMeSaleBookingOrderApi.v1Post({
                                                ...value,
                                                endDate: moment(value.startDate).add(1, 'month').format('YYYY-MM-DD'),
                                            });
                                        }}
                                        defaultValues={{
                                            clientNote: '',
                                            endDate: moment().add(1, 'month').format('YYYY-MM-DD'),
                                            startDate: moment().format('YYYY-MM-DD'),
                                            extraFee: 0,
                                            price: dataQuery.data?.price || 0,
                                            userSaleBookingId: id || '',
                                        }}
                                        schema={{
                                            clientNote: joi.string().optional(),
                                            startDate: joi.string().required(),
                                            endDate: joi.string().optional(),
                                            extraFee: joi.number().optional(),
                                            price: joi.number().required(),
                                            userSaleBookingId: joi.string().required(),
                                        }}
                                        onExtraSuccessAction={(data) => {
                                            toast.success('Gửi liên hệ thành công');
                                            router.push(NKRouter.freelancer.contact.detail(data.id));
                                            close();
                                        }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <p className="text-base font-medium text-gray-900">Client: {dataQuery.data?.user.name}</p>
                                            <p className="text-base font-medium text-gray-900">
                                                Kiểu thiết kế: {dataQuery.data?.serviceCategory.name}
                                            </p>
                                            <p className="text-base font-medium text-gray-900">
                                                Giá thuê: {`${formatMoneyVND(dataQuery.data?.price || 0)}`}
                                            </p>
                                            <NKDateField name="startDate" label="Ngày bắt đầu" />
                                            <NKTextareaField name="clientNote" label="Note" />
                                            <ButtonC type="submit">Liên hệ ngay</ButtonC>
                                        </div>
                                    </NKFormWrapper>
                                )}
                            </ModalBuilder>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-5">
                        <Badge.Ribbon text={dataQuery.data?.serviceCategory.name} color={getColorWithUuId(dataQuery.data?.serviceCategory.id || '')}>
                            <div className="flex  flex-col gap-4 rounded-lg border bg-white shadow-[-5px_5px_0px_0px_#4ade80]">
                                <div className="flex items-end  justify-between gap-4 p-6">
                                    <div className="flex w-full flex-col gap-2">
                                        <div className="text-3xl font-bold">{dataQuery.data?.name}</div>
                                    </div>

                                    <div className=" flex items-end gap-1 text-gray-400"></div>
                                </div>
                                <div className="flex gap-4">
                                    <div className=" w-[900px] gap-2  p-6 ">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <Swiper modules={[Autoplay]} autoplay className="h-[450px] overflow-hidden rounded-2xl">
                                                    {dataQuery.data?.imageUrls.map((item) => (
                                                        <SwiperSlide key={item} className="h-full w-full">
                                                            <img src={item} alt="" className="h-full w-full object-cover" />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </div>
                                            <div
                                                className="prose text-base font-normal prose-img:m-0 prose-img:h-full prose-img:w-full prose-img:rounded-xl"
                                                dangerouslySetInnerHTML={{ __html: dataQuery.data?.description || '' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Badge.Ribbon>
                        {/* <div className="flex w-full flex-col rounded-sm">
                            <h2 className="mb-10 text-2xl font-semibold text-black">Nhận xét</h2>
                            <div className="flex w-full flex-col gap-2">
                                <ScrollInfinityBuilder
                                    sourceKey={'common-review'}
                                    filters={[`ownerId||${FilterComparator.EQUAL}||${id}`]}
                                    queryApi={commonReviewApi.v1Get}
                                    render={(item, index) => <ReviewCard key={item.id} data={item} />}
                                />
                            </div>
                        </div> */}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Page;
