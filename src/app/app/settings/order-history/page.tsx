'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import DataTable from 'react-data-table-component';

import { NKRouter } from '@/core/NKRouter';
import { orderApi } from '@/core/api/order.api';
import { userMeOrderApi } from '@/core/api/user-me-order.api';
import { IV1ChangePasswordDto } from '@/core/api/user-me.api';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import { Order } from '@/core/models/order';
import { formatNumber } from '@/core/utils/number.helper';

interface ChangePasswordForm extends IV1ChangePasswordDto {
    confirmPassword: string;
}

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const router = useRouter();
    const userMeOrderQuery = useQuery(
        ['user-me-order'],
        async () => {
            const order = await userMeOrderApi.v1Get({
                filters: [],
                orderBy: [],
                page: 0,
                pageSize: 9999,
            });

            return order.data.filter((item) => item.type === 'ORDER');
        },
        {
            initialData: [],
        },
    );

    return (
        <div className="m-auto flex w-full max-w-4xl gap-4">
            <DataTable
                columns={[
                    {
                        name: 'Ngày đặt hàng',
                        selector: (row: Order) => moment(row.createdAt).format('DD/MM/YYYY HH:mm'),
                    },
                    {
                        name: 'Tổng tiền',
                        selector: (row: Order) => `${formatNumber(row.afterDiscountTotal)} VNĐ`,
                    },
                    {
                        name: 'Số lượng',
                        selector: (row: Order) => `${formatNumber(row.orderItems.reduce((acc, item) => acc + item.quantity, 0))} sản phẩm`,
                    },
                    {
                        name: 'Trạng Thái',
                        button: true,
                        cell: (row: Order) => <FieldBadgeApi value={row.status} apiAction={orderApi.v1GetEnumStatus} />,
                    },
                    {
                        name: '',
                        button: true,
                        cell: (row: Order) => (
                            <button
                                onClick={() => {
                                    router.push(`/user/order-history/${row.id}`);
                                }}
                            >
                                Xem chi tiết
                            </button>
                        ),
                    },
                ]}
                data={userMeOrderQuery.data}
            />
        </div>
    );
};

export default Page;
