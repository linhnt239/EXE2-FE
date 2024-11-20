'use client';

import * as React from 'react';

import Link from 'next/link';

import { ChevronRightIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { Clock, PeopleGroup, Tag } from 'akar-icons';
import { Badge } from 'antd';
import _get from 'lodash/get';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import NKSelectApiOption from '@/core/components/form/NKSelectApiOption';
import NKTextField from '@/core/components/form/NKTextField';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { getColorWithUuId, mapListToOptions } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface TutorFilter {
    name: string;
    serviceCategoryId: string;
}

const defaultValues: TutorFilter = {
    name: '',
    serviceCategoryId: '',
};

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const formMethods = useForm<any>({
        defaultValues,
    });
    const [filter, setFilter] = React.useState<TutorFilter>(defaultValues);

    return (
        <div className="relative flex w-full justify-center">
            <div className="flex max-w-7xl flex-col items-start justify-start">
                <div className=" mb-4  flex flex-col gap-4">
                    <div className="text-left text-4xl font-bold text-green-600">Tìm kiếm Freelancer</div>
                    <div className="text-left text-lg text-gray-500">
                        Khám phá các Freelancer của chúng tôi và tìm người phù hợp với bạn. Chúng tôi có Freelancer có sẵn trong tất cả các lĩnh vực
                        thiết kế và cho mọi nhu cầu.
                    </div>
                </div>

                <FormProvider {...formMethods}>
                    <form
                        onSubmit={formMethods.handleSubmit((data) => {
                            setFilter(data);
                        })}
                        className="flex w-full max-w-2xl items-center gap-4"
                    >
                        <NKTextField isShow={false} name="name" label="Name" placeholder="Tìm kiếm theo tên" />
                        <NKSelectApiOption
                            isShow={false}
                            fieldProps={{
                                isAllOption: true,
                            }}
                            apiAction={async () => mapListToOptions(await serviceCategoryApi.v1Select('', false))}
                            name="serviceCategoryId"
                            label="Danh mục design"
                        />
                        <button
                            className="inline-flex items-center gap-x-1.5 whitespace-nowrap rounded-md bg-[#4ade80] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                        >
                            <FunnelIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                            Tìm kiếm
                        </button>
                    </form>
                </FormProvider>

                <div className="mx-auto mt-8  grid-cols-3">
                    <ScrollInfinityBuilder
                        sourceKey="tutorial-list"
                        queryApi={userSaleBookingApi.v1Get}
                        filters={[
                            `name||${FilterComparator.LIKE}||${_get(filter, 'name') || ''}`,
                            `group||${FilterComparator.EQUAL}||freelance`,
                            ...(Boolean(_get(filter, 'serviceCategoryId'))
                                ? [`serviceCategory.id||${FilterComparator.EQUAL}||${_get(filter, 'serviceCategoryId') || ''}`]
                                : []),
                        ].flat()}
                        className="grid grid-cols-4 gap-10 !overflow-x-hidden px-4"
                        render={(data, index) => {
                            return (
                                <Badge.Ribbon key={data.id} text={data?.serviceCategory.name} color={getColorWithUuId(data.serviceCategory.id || '')}>
                                    <div className={`fade-in  flex-col items-center justify-between overflow-hidden rounded-2xl border bg-white `}>
                                        <div className="h-64  overflow-hidden  bg-gray-500">
                                            <img src={data.imageUrls[0]} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="mt-2 flex w-full flex-col gap-2 p-4">
                                            <div className="flex w-full flex-col gap-4">
                                                <p className="line-clamp-2  text-left text-xl font-semibold leading-8 text-neutral-800">
                                                    {data.name}
                                                </p>
                                            </div>
                                            <div className="flex w-full items-center gap-6">
                                                <Link href={NKRouter.designer.detail(data.user.id)} className="flex items-center gap-2">
                                                    <div className="h-8 w-8 flex-shrink-0 rounded-full">
                                                        <img src={data?.user.avatar} className="h-full w-full rounded-full object-cover" />
                                                    </div>
                                                    <div className="text-xs font-medium text-gray-600">{data?.user.name}</div>
                                                </Link>
                                            </div>

                                            <div className="w-full border-t text-[#E2E2E2]" />
                                            <div className="flex w-full items-center justify-between text-left text-green-500">
                                                <p className="0 text-base font-semibold leading-6">{formatMoneyVND(data.price || 0)}</p>
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
                </div>
            </div>
        </div>
    );
};

export default Page;
