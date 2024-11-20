'use client';

import { FunctionComponent } from 'react';

import Link from 'next/link';

import { PlusOutlined } from '@ant-design/icons';
import { EyeIcon, PlusCircleIcon } from '@heroicons/react/20/solid';
import { Button } from 'antd';
import _get from 'lodash/get';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userMeSaleBookingApi } from '@/core/api/user-me-sale-booking.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import TableBuilder from '@/core/components/table/TableBuilder';
import { FilterComparator } from '@/core/models/common';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { mapListToOptions } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface ProfilePageProps {}

const MePage: FunctionComponent<ProfilePageProps> = () => {
    const { id } = useSelector<RootState, UserState>((state) => state.user);

    return (
        <div className="bg-white">
            <TableBuilder
                extraButtons={[
                    <div className="flex items-center gap-4" key="data">
                        <Link href={NKRouter.freelancer.service.create()}>
                            <Button icon={<PlusOutlined />} type="primary" className="!bg-green-600">
                                Tạo mới dịch vụ
                            </Button>
                        </Link>
                    </div>,
                ]}
                columns={[
                    {
                        title: 'Tên dịch vụ',
                        key: 'name',
                        render: (record) => {
                            return (
                                <Link href={NKRouter.service.detail(record.id)} className="text-blue-600 hover:text-blue-800">
                                    {record.name}
                                </Link>
                            );
                        },
                    },
                    {
                        title: 'Giá',
                        key: 'price',
                        render: (record) => {
                            const price = _get(record, 'price', 0);
                            const format = formatMoneyVND(price);

                            return <div>{format}</div>;
                        },
                    },
                    {
                        title: 'Danh mục dịch vụ',
                        key: 'serviceCategory.id',
                        render: (record) => {
                            const categoryId = _get(record, 'serviceCategory.id', '');

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

                            return <FieldBadgeApi apiAction={userSaleBookingApi.v1SelectStatus} value={status} />;
                        },
                    },
                    {
                        title: 'Cập nhật lần cuối',
                        key: 'updatedAt',
                        render: (record) => {
                            const status = _get(record, 'updatedAt', '');

                            return <div>{moment(status).format('DD/MM/YYYY HH:mm')}</div>;
                        },
                    },
                    {
                        title: '',
                        width: 50,
                        render: (record) => {
                            return (
                                <Link href={NKRouter.freelancer.service.detail(record.id)}>
                                    <EyeIcon className="h-6 w-6 " />
                                </Link>
                            );
                        },
                        sorter: false,
                    },
                ]}
                queryApi={userMeSaleBookingApi.v1Get}
                extraFilter={[`user.id||${FilterComparator.EQUAL}||${id}`, `group||${FilterComparator.EQUAL}||freelance`]}
                sourceKey="userMeSaleBooking"
                title=""
            />
        </div>
    );
};

export default MePage;
