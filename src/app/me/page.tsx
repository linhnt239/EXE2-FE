'use client';

import { FunctionComponent } from 'react';

import Link from 'next/link';

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Badge } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { NKRouter } from '@/core/NKRouter';
import { IV1UpdateProfileDto, userMeApi } from '@/core/api/user-me.api';
import { userSaleBookingApi } from '@/core/api/user-sale-booking.api';
import { userApi } from '@/core/api/user.api';
import ButtonC from '@/core/components/Button/Button';
import CTAUploadFile from '@/core/components/CTA/CTAUploadFile';
import NKImageUpload from '@/core/components/form/NKImageUpload';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { UserSaleBooking } from '@/core/models/userSaleBooking';
import { RootState } from '@/core/store';
import { getColorWithUuId } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface ProfilePageProps {}

const MePage: FunctionComponent<ProfilePageProps> = () => {
    const userState = useSelector<RootState, RootState['user']>((state) => state.user);

    const userQuery = useQuery({
        queryKey: ['user', userState.id],
        queryFn: () => {
            return userApi.v1GetById(userState.id);
        },
    });

    const updateProfileMutation = useMutation(
        async (data: IV1UpdateProfileDto) => {
            return await userMeApi.v1Put(data);
        },
        {
            onSuccess: () => {
                userQuery.refetch();
            },
        },
    );

    const methods = useForm<IV1UpdateProfileDto>({});

    if (userQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative flex flex-col justify-center">
            <div className="relative h-[440px] w-full">
                <div className="relative h-full w-full">
                    <img src={userQuery.data?.banner} className="fade-b-in relative z-0 h-full w-full object-cover" alt="" />
                    <div className="fade-b-in absolute bottom-0 left-0 z-10 h-20 w-full" />
                </div>
                <CTAUploadFile
                    onUpload={(url) => {
                        updateProfileMutation.mutate({
                            address: userQuery.data?.address || '',
                            bio: userQuery.data?.bio || '',
                            avatar: userQuery.data?.avatar || '',
                            dob: userQuery.data?.dob || '',
                            name: userQuery.data?.name || '',
                            nickname: userQuery.data?.nickname || '',
                            phone: userQuery.data?.phone || '',
                            banner: url,
                            facebookUrl: userQuery.data?.facebookUrl || '',
                            major: userQuery.data?.major || '',
                            studentId: userQuery.data?.studentId || '',
                        });
                    }}
                >
                    <label htmlFor="banner" className="absolute right-2 top-2 ">
                        <ButtonC>Đổi ảnh nền</ButtonC>
                    </label>
                </CTAUploadFile>
            </div>
            <div className="relative z-10 grid w-full max-w-app grid-cols-4 gap-4">
                <div className="relative col-span-1 h-full w-full">
                    <div className="sticky left-0 top-28 overflow-hidden rounded-lg border border-[#4ade80] bg-green-50 p-4 shadow-[-5px_5px_0px_0px_#4ade80]">
                        <div className="text-center">
                            <div className="mx-auto my-2 h-20 w-20 overflow-hidden rounded-sm">
                                <img src={userQuery.data?.avatar} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-col items-center justify-center gap-3 text-center">
                                <h1 className="text-2xl font-semibold text-gray-900">{userQuery.data?.name}</h1>
                                <p className="text-sm text-gray-400">{userQuery.data?.email}</p>
                                <p className="text-sm italic text-gray-400">{userQuery.data?.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-3 flex w-full flex-col rounded-lg border border-[#4ade80] bg-white p-10 ">
                    <h2 className="mb-6 text-2xl font-semibold text-black">Dịch vụ</h2>
                    <ScrollInfinityBuilder
                        sourceKey="tutorial-list"
                        queryApi={userSaleBookingApi.v1Get}
                        filters={[`user.id||${FilterComparator.EQUAL}||${userState.id}`]}
                        className="grid w-full grid-cols-2 gap-4 overflow-x-hidden"
                        render={(data: UserSaleBooking, index) => {
                            return (
                                <Badge.Ribbon key={data.id} text={data?.serviceCategory.name} color={getColorWithUuId(data.serviceCategory.id)}>
                                    <div className={`fade-in flex h-40 items-center justify-between overflow-hidden rounded-2xl border bg-white`}>
                                        <div className="h-full w-auto flex-shrink-0  overflow-hidden  bg-gray-500">
                                            <img src={data.imageUrls[0]} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="mt-2 flex w-full flex-col gap-2 p-4">
                                            <div className="flex w-full flex-col gap-4">
                                                <p className="line-clamp-2  text-left text-xl font-semibold leading-8 text-neutral-800">
                                                    {data.name}
                                                </p>
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

export default MePage;
