'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Tab } from '@headlessui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, Newspaper, ShoppingBag, Star, Tag } from 'akar-icons';
import clsx from 'clsx';
import _get from 'lodash/get';
import _kebabCase from 'lodash/kebabCase';
import moment from 'moment';
import { MdHomeFilled } from 'react-icons/md';
import { PiStarFill } from 'react-icons/pi';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userFollowApi } from '@/core/api/user-follow.api';
import { IV1CreateWithUser, userMeChatApi } from '@/core/api/user-me-chat.api';
import { userMeFollowApi } from '@/core/api/user-me-follow.api';
import { userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userPostApi } from '@/core/api/user-post.api';
import { userReviewApi } from '@/core/api/user-review.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userSaleApi } from '@/core/api/user-sale.api';
import { userApi } from '@/core/api/user.api';
import ButtonC from '@/core/components/Button/Button';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import PostCard from '@/core/components/post/PostCard';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserReview } from '@/core/models/userReview';
import { UserSale } from '@/core/models/userSale';
import { UserSaleBooking } from '@/core/models/userSaleBooking';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface UserProfilePageProps {}

const UserProfilePage: React.FunctionComponent<UserProfilePageProps> = () => {
    const params = useParams();

    const id = _get(params, 'id') as string;
    const router = useRouter();

    const userState = useSelector<RootState, UserState>((state) => state.user);

    const userQuery = useQuery(['user', id], async () => {
        const res = await userApi.v1GetById(id);
        return res;
    });

    const createChatMutation = useMutation(
        async (dto: IV1CreateWithUser) => {
            const res = await userMeChatApi.v1PostCreateWithUser(dto);

            return res;
        },
        {
            onSuccess: (data) => {
                if (!data) return;
                router.push(NKRouter.app.chat.detail(data.id));
            },
        },
    );

    const createFollowMutation = useMutation(
        async () => {
            const res = await userMeFollowApi.createFollow(id);
            return res;
        },
        {
            onSuccess: () => {
                userFollowBy.refetch();
                userFollowTo.refetch();
                isFollowQuery.refetch();
            },
        },
    );

    const userFollowBy = useQuery(['userFollowBy', id], async () => {
        const res = await userFollowApi.countFollowBy(id);
        return res;
    });

    const userFollowTo = useQuery(['userFollowTo', id], async () => {
        const res = await userFollowApi.countFollowTo(id);
        return res;
    });

    const isFollowQuery = useQuery(['isFollow', id], async () => {
        const res = await userMeFollowApi.isFollow(id);
        return res;
    });

    const userSaleBookingOrdersQuery = useQuery(['userSaleBookingOrders', id, userState], async () => {
        const res = await userSaleBookingOrderApi.v1Get({
            filters: [`userSaleBooking.user.id||${FilterComparator.EQUAL}||${id}`, `user.id||${FilterComparator.EQUAL}||${userState.id}`],
            pageSize: 12,
            orderBy: [],
            page: 0,
        });
        return res;
    });

    return (
        <div className="fade-in relative flex h-full w-full flex-shrink-0 flex-col items-start justify-start bg-white">
            <Link className="absolute left-4 top-4 z-10" href={NKRouter.app.post.index()}>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <ArrowLeft className="h-8 w-8 text-black" />
                </button>
            </Link>
            <Link className="absolute right-4 top-4 z-10" href={NKRouter.app.post.index()}>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <MdHomeFilled className="h-8 w-8 text-black" />
                </button>
            </Link>
            <div className="h-44 w-full flex-shrink-0">
                <img className="h-full w-full object-cover" src={userQuery.data?.banner} />
            </div>
            <div className="relative h-full w-full bg-white shadow">
                <div className="m-autoflex w-full flex-1 gap-5 px-4">
                    <div className="absolute top-0 h-36 w-36 -translate-y-1/2 overflow-hidden rounded-lg border-4 border-[#47ea4e] bg-blue-400">
                        <img className="h-full w-full object-cover" src={userQuery.data?.avatar} />
                    </div>
                    <div className="ml-[155px] mt-2 flex h-full flex-1 flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <p className=" text-center text-base font-bold text-black">{userQuery.data?.name}</p>
                            <p className="mb-1 text-center text-sm font-bold  text-black">
                                @{_kebabCase(userQuery.data?.nickname).replaceAll('-', '_')}
                            </p>
                        </div>
                        <div className="mb-2 flex gap-2">
                            <ButtonC className="bg-[#3C91D3] px-4 text-xs text-white shadow-2xl" onClick={() => createFollowMutation.mutate()}>
                                {isFollowQuery.data ? 'Đang theo dõi' : 'Theo dõi'}
                            </ButtonC>
                            <ButtonC
                                className="bg-[#EFEFEF] px-4 text-xs text-black shadow-2xl"
                                onClick={() =>
                                    createChatMutation.mutate({
                                        name: userQuery.data?.id || '',
                                        userId: userQuery.data?.id || '',
                                    })
                                }
                            >
                                Nhắn tin
                            </ButtonC>
                        </div>
                    </div>
                </div>
                <div className="flex h-full w-full flex-col items-center pt-3">
                    <div className="flex w-full flex-1 justify-center">
                        <div className="flex flex-1 flex-col items-center justify-center text-black">
                            <p className="text-base font-bold">{userFollowBy.data}</p>
                            <p className="text-sm font-medium">người theo dõi</p>
                        </div>

                        <div className="flex flex-1 flex-col items-center justify-center text-black">
                            <p className="text-base font-bold">{userFollowTo.data}</p>
                            <p className="text-sm font-medium">theo dõi</p>
                        </div>
                    </div>
                    <p className="mb-3  text-center text-sm  text-gray-500">{userQuery.data?.bio}</p>
                    <div className="h-full w-full border border-y-2 border-[#EFEFEF] bg-inherit py-3">
                        <Tab.Group>
                            <Tab.List className="flex gap-1  px-4 py-1">
                                <Tab
                                    key="post"
                                    className={({ selected }) =>
                                        clsx(
                                            'flex w-full flex-1 flex-col items-center justify-center  gap-1 rounded-lg text-sm font-medium leading-5 duration-300 focus:outline-none',
                                            {
                                                ' text-blue-700 ': selected,
                                                'text-gray-400 ': !selected,
                                            },
                                        )
                                    }
                                >
                                    <Newspaper strokeWidth={2} size={24} />
                                    <span>Bài viết</span>
                                </Tab>
                                <Tab
                                    key="booking"
                                    className={({ selected }) =>
                                        clsx(
                                            'flex w-full flex-1 flex-col items-center justify-center  gap-1 rounded-lg text-sm font-medium leading-5 duration-300 focus:outline-none',
                                            {
                                                ' text-blue-700 ': selected,
                                                'text-gray-400 ': !selected,
                                            },
                                        )
                                    }
                                >
                                    <Tag strokeWidth={2} size={24} />
                                    <span>Booking</span>
                                </Tab>
                                <Tab
                                    key="shop"
                                    className={({ selected }) =>
                                        clsx(
                                            'flex w-full flex-1 flex-col items-center justify-center  gap-1 rounded-lg text-sm font-medium leading-5 duration-300 focus:outline-none',
                                            {
                                                ' text-blue-700 ': selected,
                                                'text-gray-400 ': !selected,
                                            },
                                        )
                                    }
                                >
                                    <ShoppingBag strokeWidth={2} size={24} />
                                    <span>Shop</span>
                                </Tab>
                                <Tab
                                    key="Review"
                                    className={({ selected }) =>
                                        clsx(
                                            'flex w-full flex-1 flex-col items-center justify-center  gap-1 rounded-lg text-sm font-medium leading-5 duration-300 focus:outline-none',
                                            {
                                                ' text-blue-700 ': selected,
                                                'text-gray-400 ': !selected,
                                            },
                                        )
                                    }
                                >
                                    <Star strokeWidth={2} size={24} />
                                    <span>Đánh giá</span>
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-2 h-full">
                                <Tab.Panel key="post" unmount={false}>
                                    <div className=" w-full">
                                        <ScrollInfinityBuilder
                                            className=" fade-in mb-8 flex !w-full flex-col gap-2"
                                            queryApi={userPostApi.v1Get}
                                            filters={[`user.id||${FilterComparator.EQUAL}||${id}`]}
                                            sourceKey="userPostApi.v1Get"
                                            render={(item, index) => <PostCard data={item} key={item.id} className="shadow" />}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel unmount={false} className={'h-full'} key="booking">
                                    <div className="fade-in flex h-full flex-col rounded-t-[48px] bg-white px-6 py-6">
                                        <h2 className="mb-2 text-2xl font-semibold text-black">Dịch vụ</h2>
                                        <ScrollInfinityBuilder
                                            className="fade-in mb-8 flex !w-full flex-col gap-6"
                                            queryApi={userSaleBookingApi.v1Get}
                                            filters={[`user.id||${FilterComparator.EQUAL}||${id}`, `status||${FilterComparator.LIKE}||AVAILABLE`]}
                                            sourceKey="userSaleBookingApi.v1Get"
                                            render={(item: UserSaleBooking, index) => (
                                                <Link href={NKRouter.app.userSaleBooking.detail(item.id)} className="flex h-24 w-full gap-4">
                                                    <div className="h-full w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                                        <img src={item.imageUrls[0]} className="h-full w-full object-cover" alt="" />
                                                    </div>
                                                    <div className="flex h-full w-full flex-col gap-2 py-2">
                                                        <p className="text-sm text-gray-500">{item.serviceCategory.name}</p>
                                                        <p className="text-base font-medium text-black">{item.name}</p>
                                                        <p className="text-base font-semibold text-indigo-600">{formatMoneyVND(item.price)}</p>
                                                    </div>
                                                </Link>
                                            )}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel key="shop" className={'h-full'} unmount={false}>
                                    <div className="fade-in flex h-full flex-col rounded-t-[48px] bg-white px-6 py-6">
                                        <h2 className="mb-2 text-2xl font-semibold text-black">Sản phẩm</h2>
                                        <ScrollInfinityBuilder
                                            className="fade-in mb-8 flex !w-full flex-col gap-6"
                                            queryApi={userSaleApi.v1Get}
                                            filters={[`createdBy.id||${FilterComparator.EQUAL}||${id}`, `status||${FilterComparator.LIKE}||ACCEPTED`]}
                                            sourceKey="userSaleApi.v1Get"
                                            render={(item: UserSale, index) => (
                                                <Link href={NKRouter.app.userSale.detail(item.id)} className="flex h-24 w-full gap-4">
                                                    <div className="h-full w-20 flex-shrink-0 overflow-hidden rounded-lg">
                                                        <img src={item.imageUrls[0]} className="h-full w-full object-cover" alt="" />
                                                    </div>
                                                    <div className="flex h-full w-full flex-col gap-2 py-2">
                                                        <p className="text-sm text-gray-500">{item.productCategory.name}</p>
                                                        <p className="text-base font-medium text-black">{item.name}</p>
                                                        <p className="text-base font-semibold text-indigo-600">{formatMoneyVND(item.price)}</p>
                                                    </div>
                                                </Link>
                                            )}
                                        />
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel key="review" className={'h-full'} unmount={false}>
                                    <div className="fade-in flex h-full flex-col rounded-t-[48px] bg-white px-6 py-6">
                                        <h2 className="mb-2 text-2xl font-semibold text-black">Đánh giá</h2>
                                        {Boolean(userSaleBookingOrdersQuery.data?.count) && (
                                            <ModalBuilder
                                                className=" w-[calc(100%-32px)] max-w-[600px] rounded-lg bg-white p-4 shadow-2xl"
                                                btnLabel={'Đánh giá người dùng'}
                                                modalTitle={<h2 className="text-lg font-normal text-black">Đánh giá người dùng</h2>}
                                            >
                                                <div className="h-10 w-[calc(100%-32px)] "></div>
                                            </ModalBuilder>
                                        )}
                                        <ScrollInfinityBuilder
                                            className="fade-in mb-8 flex !w-full flex-col gap-6"
                                            queryApi={userReviewApi.v1Get}
                                            filters={[`user.id||${FilterComparator.EQUAL}||${id}`]}
                                            sourceKey="userSaleApi.v1Get"
                                            render={(item: UserReview, index) => (
                                                <div className="flex w-full gap-4">
                                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                                                        <img src={''} className="h-full w-full bg-red-400 object-cover" alt="" />
                                                    </div>
                                                    <div className="flex h-full w-full flex-col">
                                                        <div className="flex w-full items-center justify-between">
                                                            <p className="text-sm font-semibold text-black">{item.createdBy.name}</p>
                                                            <p className="text-xs text-gray-500">{moment(item.createdAt).fromNow()}</p>
                                                        </div>
                                                        <div className="flex gap-0.5">
                                                            {Array.from({ length: 5 }).map((_, index) => (
                                                                <PiStarFill
                                                                    key={`id-star-${index}`}
                                                                    className={clsx('h-4 w-4 ', {
                                                                        'text-yellow-400': index <= item.rate,
                                                                        'text:-gray-400': index > item.rate,
                                                                    })}
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="mt-2 text-sm text-black">{item.content}</p>
                                                        <PhotoProvider>
                                                            <div className="mt-2 grid w-full grid-cols-3 gap-2">
                                                                {item.imageUrls.map((image, index) => (
                                                                    <div className="col-span-1" key={image}>
                                                                        <PhotoView height={80} width={80} src={image}>
                                                                            <img src={image} className="h-full w-full rounded object-cover" alt="" />
                                                                        </PhotoView>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </PhotoProvider>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
