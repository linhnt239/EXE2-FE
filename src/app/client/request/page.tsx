'use client';

import * as React from 'react';

import Link from 'next/link';

import { EyeIcon } from '@heroicons/react/20/solid';
import _get from 'lodash/get';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserSaleBookingOrder } from '@/core/models/user-sale-booking-order';
import { RootState } from '@/core/store';
import { mapListToOptions } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FunctionComponent<PageProps> = () => {
    const userState = useSelector<RootState, RootState['user']>((state) => state.user);

    return (
        <div className="bg-white">
            <TableBuilder
                columns={[
                    {
                        title: 'Freelancer',
                        key: 'name',
                        render: (record: UserSaleBookingOrder) => {
                            return (
                                <Link href={NKRouter.designer.detail(record.user.id)} className="text-blue-600 hover:text-blue-800">
                                    {record.user.name}
                                </Link>
                            );
                        },
                    },

                    {
                        title: 'Tên Dự án',
                        key: 'name',
                        render: (record: UserSaleBookingOrder) => {
                            const name = _get(record, 'userSaleBooking.name', '');

                            return (
                                <Link href={NKRouter.project.detail(record.id)} className=" text-blue-600 hover:text-blue-800">
                                    {name}
                                </Link>
                            );
                        },
                    },
                    {
                        title: 'Ngân sách',
                        key: 'price',
                        render: (record) => {
                            const price = _get(record, 'price', 0);
                            const format = formatMoneyVND(price);

                            return <div>{format}</div>;
                        },
                    },
                    {
                        title: 'Danh mục design',
                        key: 'serviceCategory.id',
                        render: (record: UserSaleBookingOrder) => {
                            const categoryId = _get(record, 'userSaleBooking.serviceCategory.id', '');

                            return (
                                <FieldBadgeApi
                                    apiAction={async () => mapListToOptions(await serviceCategoryApi.v1Select('', true))}
                                    value={categoryId}
                                />
                            );
                        },
                    },
                    {
                        title: 'Trạng thái',
                        key: 'status',
                        render: (record) => {
                            const status = _get(record, 'status', '');
                            return <FieldBadgeApi apiAction={userSaleBookingOrderApi.v1GetEnumStatus} value={status} />;
                        },
                    },

                    {
                        title: '',
                        width: 50,
                        render: (record) => {
                            return (
                                <Link href={NKRouter.client.request.detail(record.id)}>
                                    <EyeIcon className="h-6 w-6 " />
                                </Link>
                            );
                        },
                        sorter: false,
                    },
                ]}
                queryApi={userSaleBookingOrderApi.v1Get}
                extraFilter={[
                    `userSaleBooking.user.id||${FilterComparator.EQUAL}||${userState.id}`,
                    `userSaleBooking.group||${FilterComparator.EQUAL}||find-client`,
                ]}
                sourceKey="userMeSaleBooking"
                title=""
            />
        </div>
    );
};

export default Page;
