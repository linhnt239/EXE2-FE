'use client';

import { useParams } from 'next/navigation';

import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { joiResolver } from '@hookform/resolvers/joi';
import { useQuery } from '@tanstack/react-query';
import joi from 'joi';
import _get from 'lodash/get';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { orderApi } from '@/core/api/order.api';
import { IV1MakeOrder } from '@/core/api/user-me-order.api';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import AuthWrapper from '@/core/components/wrapper/AuthWrapper';
import { useCart } from '@/core/contexts/CartContext';
import { formatNumber } from '@/core/utils/number.helper';

const deliveryMethods = [
    {
        id: 1,
        title: 'Giao Hàng Thường',
        turnaround: '2–5 Ngày làm việc',

        price: 20000,
    },
    { id: 2, title: 'Giao Hàng Nhanh', turnaround: '1–2 Ngày làm việc', price: 40000 },
];
const paymentMethods = [
    { id: 'MOMO', title: 'Momo', src: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png' },
    {
        id: 'COD',
        title: 'Thanh toán khi nhận hàng',
        src: 'https://cdn-icons-png.flaticon.com/512/2203/2203124.png',
    },
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const defaultValues: IV1MakeOrder = {
    address: '',
    extraFee: 20000,
    name: '',
    paymentMethod: 'MOMO',
    phone: '',
};

export default function Example() {
    const { cart, handleRemoveFromCart, handleAddToCart } = useCart();
    const formMethods = useForm({
        defaultValues,
        resolver: joiResolver(
            joi.object({
                address: joi.string().required(),
                name: joi.string().required(),
                phone: joi.string().required(),

                paymentMethod: joi.string().required(),
                extraFee: joi.number().required(),
            }),
        ),
    });

    const params = useParams();
    const id = _get(params, 'id') as string;

    const orderQuery = useQuery(
        ['order', id],
        () => {
            return orderApi.v1GetById(id);
        },
        {
            onSuccess: (data) => {
                formMethods.setValue('address', data.address);
                formMethods.setValue('name', data.name);
                formMethods.setValue('phone', data.phone);
                formMethods.setValue('extraFee', data.extraFee);
                formMethods.setValue('paymentMethod', data.paymentMethod);
            },
        },
    );

    return (
        <AuthWrapper>
            <div className="bg-gray-50">
                <main className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <FormProvider {...formMethods}>
                            <form className="gap-12  lg:grid xl:gap-x-16">
                                <div className="mt-10 lg:mt-0">
                                    <h2 className="text-lg font-medium text-gray-900">Thông tin đơn hàng</h2>

                                    <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                                        <h3 className="sr-only">Items in your cart</h3>
                                        <ul role="list" className="divide-y divide-gray-200">
                                            {orderQuery.data?.orderItems
                                                .filter((item) => item.quantity !== 0)
                                                .sort((a, b) => {
                                                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                                                })
                                                .map((orderItem) => (
                                                    <li key={orderItem.id} className="fade-in flex px-4 py-6 sm:px-6">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={_get(orderItem.productVariant, 'imageUrls[0]', '')}
                                                                alt={orderItem.productVariant.name}
                                                                className="h-20 w-20 rounded-md object-cover"
                                                            />
                                                        </div>

                                                        <div className="ml-6 flex flex-1 flex-col">
                                                            <div className="flex">
                                                                <div className="min-w-0 flex-1">
                                                                    <h4 className="text-sm">
                                                                        <div className="font-medium text-gray-700 hover:text-gray-800">
                                                                            {orderItem.productVariant.name}
                                                                        </div>
                                                                    </h4>
                                                                </div>

                                                                <div className="ml-4 flow-root flex-shrink-0"></div>
                                                            </div>

                                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                                <p className="mt-1 text-sm font-medium text-gray-900">
                                                                    {formatNumber(orderItem.productVariant.price)} VNĐ
                                                                </p>

                                                                <div className="ml-4">
                                                                    <div className="flex rounded-sm border border-gray-400">
                                                                        <div className="flex h-6 w-10 items-center justify-center border-l border-r border-gray-400">
                                                                            {orderItem.quantity}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                        <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm">Tạm tính</dt>
                                                <dd className="text-sm font-medium text-gray-900">
                                                    {formatNumber(orderQuery.data?.beforeDiscountTotal || 0)} VNĐ
                                                </dd>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm">Giảm giá</dt>
                                                <dd className="text-sm font-medium text-gray-900">
                                                    {formatNumber(orderQuery.data?.discountAmount || 0)} VNĐ
                                                </dd>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm">Phí giao hàng</dt>
                                                <dd className="text-sm font-medium text-gray-900">
                                                    {formatNumber(orderQuery.data?.extraFee || 0)} VNĐ
                                                </dd>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                                <dt className="text-base font-medium">Thành tiền</dt>
                                                <dd className="text-base font-medium text-gray-900">
                                                    {formatNumber(orderQuery.data?.afterDiscountTotal || 0)} VNĐ
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900">Thông Tin Giao Hàng </h2>

                                        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                            <div className="sm:col-span-2">
                                                <NKTextField readOnly label="Họ và tên" name="name" theme={'AUTH'} />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <NKTextField readOnly label="Số điện thoại" name="phone" theme={'AUTH'} />
                                            </div>

                                            <div className="sm:col-span-2">
                                                <NKTextareaField readOnly label="Địa chỉ" name="address" theme={'AUTH'} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-10 border-t border-gray-200 pt-10">
                                        <Controller
                                            name="extraFee"
                                            control={formMethods.control}
                                            defaultValue={20000}
                                            render={({ field }) => (
                                                <RadioGroup {...field} onChange={() => {}}>
                                                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                                                        Phương thức giao hàng
                                                    </RadioGroup.Label>

                                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                        {deliveryMethods.map((deliveryMethod) => (
                                                            <RadioGroup.Option
                                                                key={deliveryMethod.id}
                                                                value={deliveryMethod.price}
                                                                className={({ checked, active }) =>
                                                                    classNames(
                                                                        checked ? 'border-transparent' : 'border-gray-300',
                                                                        active ? 'ring-2 ring-[#B97953]' : '',
                                                                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                                                                    )
                                                                }
                                                            >
                                                                {({ checked, active }) => (
                                                                    <>
                                                                        <span className="flex flex-1">
                                                                            <span className="flex flex-col">
                                                                                <RadioGroup.Label
                                                                                    as="span"
                                                                                    className="block text-sm font-medium text-gray-900"
                                                                                >
                                                                                    {deliveryMethod.title}
                                                                                </RadioGroup.Label>
                                                                                <RadioGroup.Description
                                                                                    as="span"
                                                                                    className="mt-1 flex items-center text-sm text-gray-500"
                                                                                >
                                                                                    {deliveryMethod.turnaround}
                                                                                </RadioGroup.Description>
                                                                                <RadioGroup.Description
                                                                                    as="span"
                                                                                    className="mt-6 text-sm font-medium text-gray-900"
                                                                                >
                                                                                    {formatNumber(deliveryMethod.price)} VNĐ
                                                                                </RadioGroup.Description>
                                                                            </span>
                                                                        </span>
                                                                        {checked ? (
                                                                            <CheckCircleIcon className="h-5 w-5 text-[#B97953]" aria-hidden="true" />
                                                                        ) : null}
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'border' : 'border-2',
                                                                                checked ? 'border-[#B97953]' : 'border-transparent',
                                                                                'pointer-events-none absolute -inset-px rounded-lg',
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                    </>
                                                                )}
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            )}
                                        />
                                    </div>

                                    {/* Payment */}
                                    <div className="mt-10 border-t border-gray-200 pt-10">
                                        <Controller
                                            name="paymentMethod"
                                            control={formMethods.control}
                                            defaultValue="momo"
                                            render={({ field }) => (
                                                <RadioGroup {...field} onChange={() => {}}>
                                                    <RadioGroup.Label className="text-lg font-medium text-gray-900">
                                                        Phương thức thanh toán
                                                    </RadioGroup.Label>

                                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                        {paymentMethods.map((deliveryMethod) => (
                                                            <RadioGroup.Option
                                                                key={deliveryMethod.id}
                                                                value={String(deliveryMethod.id)}
                                                                className={({ checked, active }) =>
                                                                    classNames(
                                                                        checked ? 'border-transparent' : 'border-gray-300',
                                                                        active ? 'ring-2 ring-[#B97953]' : '',
                                                                        'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
                                                                    )
                                                                }
                                                            >
                                                                {({ checked, active }) => (
                                                                    <>
                                                                        <span className="flex flex-1">
                                                                            <span className="flex flex-col">
                                                                                <RadioGroup.Label
                                                                                    as="span"
                                                                                    className="block text-sm font-medium text-gray-900"
                                                                                >
                                                                                    {deliveryMethod.title}
                                                                                </RadioGroup.Label>

                                                                                <RadioGroup.Description
                                                                                    as="span"
                                                                                    className="mt-6 text-sm font-medium text-gray-900"
                                                                                >
                                                                                    <img src={deliveryMethod.src} className="h-16 w-16" />
                                                                                </RadioGroup.Description>
                                                                            </span>
                                                                        </span>
                                                                        {checked ? (
                                                                            <CheckCircleIcon className="h-5 w-5 text-[#B97953]" aria-hidden="true" />
                                                                        ) : null}
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'border' : 'border-2',
                                                                                checked ? 'border-[#B97953]' : 'border-transparent',
                                                                                'pointer-events-none absolute -inset-px rounded-lg',
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                    </>
                                                                )}
                                                            </RadioGroup.Option>
                                                        ))}
                                                    </div>
                                                </RadioGroup>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </main>
            </div>
        </AuthWrapper>
    );
}
