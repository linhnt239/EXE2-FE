'use client';

import { useRouter } from 'next/navigation';

import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, TrashIcon } from '@heroicons/react/20/solid';
import { joiResolver } from '@hookform/resolvers/joi';
import joi from 'joi';
import _get from 'lodash/get';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { IV1MakeOrder, userMeOrderApi } from '@/core/api/user-me-order.api';
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
    const { cart, handleRemoveFromCart, handleAddToCart, refetchCart } = useCart();
    const router = useRouter();

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

    const extraFee = formMethods.watch('extraFee');

    return (
        <AuthWrapper>
            {cart && cart?.orderItems.length > 0 ? (
                <div className="w-full bg-gray-50 p-4">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                        <FormProvider {...formMethods}>
                            <form
                                id="cart"
                                onSubmit={formMethods.handleSubmit(async (data) => {
                                    const makeOrder = await userMeOrderApi.v1PostMakeOrder({
                                        ...data,
                                    });
                                    if (makeOrder) {
                                        if (data.paymentMethod === 'COD') {
                                            toast.success('Đặt hàng thành công');
                                            return router.push(NKRouter.app.settings.orderHistory());
                                        } else {
                                            const host = window.location.origin;
                                            const checkoutObj = await userMeOrderApi.v1PostCheckout({
                                                orderId: makeOrder.id,
                                                redirectUrl: `${host}${NKRouter.app.settings.orderHistory()}`,
                                            });
                                            const checkoutUrl = _get(checkoutObj, 'checkoutUrl', '');
                                            if (checkoutUrl) {
                                                window.location.href = checkoutUrl;
                                            }
                                        }
                                    }
                                })}
                            >
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">Thông Tin Giao Hàng </h2>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        <div className="sm:col-span-2">
                                            <NKTextField label="Họ và tên" name="name" theme={'AUTH'} />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <NKTextField label="Số điện thoại" name="phone" theme={'AUTH'} />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <NKTextareaField label="Địa chỉ" name="address" theme={'AUTH'} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 border-t border-gray-200 pt-10">
                                    <Controller
                                        name="extraFee"
                                        control={formMethods.control}
                                        defaultValue={20000}
                                        render={({ field }) => (
                                            <RadioGroup {...field}>
                                                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                                                    Phương thức giao hàng
                                                </RadioGroup.Label>

                                                <div className="mt-4 grid grid-cols-2 gap-2 gap-y-6">
                                                    {deliveryMethods.map((deliveryMethod) => (
                                                        <RadioGroup.Option
                                                            key={deliveryMethod.id}
                                                            value={deliveryMethod.price}
                                                            className={({ checked, active }) =>
                                                                classNames(
                                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                                    active ? 'ring-2 ring-indigo-600' : '',
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
                                                                        <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                                    ) : null}
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'border' : 'border-2',
                                                                            checked ? 'border-indigo-600' : 'border-transparent',
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
                                <div className="mt-2 border-t border-gray-200 pt-10">
                                    <Controller
                                        name="paymentMethod"
                                        control={formMethods.control}
                                        defaultValue="momo"
                                        render={({ field }) => (
                                            <RadioGroup {...field}>
                                                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                                                    Phương thức thanh toán
                                                </RadioGroup.Label>

                                                <div className="mt-4 grid grid-cols-2 gap-2  gap-y-6">
                                                    {paymentMethods.map((deliveryMethod) => (
                                                        <RadioGroup.Option
                                                            key={deliveryMethod.id}
                                                            value={String(deliveryMethod.id)}
                                                            className={({ checked, active }) =>
                                                                classNames(
                                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                                    active ? 'ring-2 ring-indigo-600' : '',
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
                                                                        <CheckCircleIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                                                                    ) : null}
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'border' : 'border-2',
                                                                            checked ? 'border-indigo-600' : 'border-transparent',
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
                            </form>
                        </FormProvider>

                        <div className="mt-10 lg:mt-0">
                            <h2 className="text-lg font-medium text-gray-900">Thông tin đơn hàng</h2>

                            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                                <h3 className="sr-only">Items in your cart</h3>
                                <ul role="list" className="divide-y divide-gray-200">
                                    {cart?.orderItems
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
                                                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                            <p className="mt-1 text-sm text-gray-500">{product.size}</p> */}
                                                        </div>

                                                        <div className="ml-4 flow-root flex-shrink-0">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveFromCart(orderItem.productVariant.id)}
                                                                className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="sr-only">Remove</span>
                                                                <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-1 items-end justify-between pt-2">
                                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                                            {formatNumber(orderItem.productVariant.price)} VNĐ
                                                        </p>

                                                        <div className="ml-4">
                                                            <div className="flex rounded-sm border border-gray-400">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleAddToCart({
                                                                            productVariantId: orderItem.productVariant.id,
                                                                            quantity: 1,
                                                                        })
                                                                    }
                                                                    className="flex h-6 w-6 items-center justify-center text-gray-800"
                                                                >
                                                                    <AiOutlinePlus />
                                                                </button>
                                                                <div className="flex h-6 w-10 items-center justify-center border-l border-r border-gray-400">
                                                                    {orderItem.quantity}
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (orderItem.quantity === 1) {
                                                                            return handleRemoveFromCart(orderItem.productVariant.id);
                                                                        }

                                                                        return handleAddToCart({
                                                                            productVariantId: orderItem.productVariant.id,
                                                                            quantity: -1,
                                                                        });
                                                                    }}
                                                                    className="flex h-6 w-6 items-center justify-center text-gray-800"
                                                                >
                                                                    <AiOutlineMinus />
                                                                </button>
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
                                        <dd className="text-sm font-medium text-gray-900">{formatNumber(cart?.beforeDiscountTotal || 0)} VNĐ</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Phí giao hàng</dt>
                                        <dd className="text-sm font-medium text-gray-900">{formatNumber(extraFee)} VNĐ</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm">Giảm giá</dt>
                                        <dd className="text-sm font-medium text-gray-900">{formatNumber(cart?.discountAmount || 0)} VNĐ</dd>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt className="text-base font-medium">Thành tiền</dt>
                                        <dd className="text-base font-medium text-gray-900">
                                            {formatNumber((cart?.afterDiscountTotal || 0) + extraFee)} VNĐ
                                        </dd>
                                    </div>
                                </dl>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <button
                                        type="submit"
                                        form="cart"
                                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#B97953] focus:outline-none focus:ring-2 focus:ring-[#B97953] focus:ring-offset-2 focus:ring-offset-gray-50"
                                    >
                                        Thanh Toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex h-full w-full items-start justify-start p-4">
                    <p className="text-base font-normal italic text-gray-500">The cart is empty.</p>
                </div>
            )}
        </AuthWrapper>
    );
}
