'use client';

import * as React from 'react';

import Link from 'next/link';

import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, Image } from 'akar-icons';
import joi from 'joi';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { uploadFileApi } from '@/core/api/upload-file.api';
import { IV1UpdateProfileDto, userMeApi } from '@/core/api/user-me.api';
import ButtonC from '@/core/components/Button/Button';
import NKDateField from '@/core/components/form/NKDateField';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface UpdateProfilePageProps {}

const UpdateProfilePage: React.FunctionComponent<UpdateProfilePageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const userMeQuery = useQuery(
        ['user-me', userState.id],
        () => {
            return userMeApi.v1Get();
        },
        {
            enabled: !!userState.id,
        },
    );

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    return (
        <div className="fade-in flex h-full w-full flex-col rounded-t-xl bg-white">
            {Boolean(userMeQuery.data?.id) && (
                <div className="relative flex w-full flex-1 flex-col bg-cover bg-center">
                    <div className="relative w-full">
                        <div className=" rounded-full border-[5px] border-white">
                            <div
                                className="relative"
                                onClick={() => {
                                    // create a new input element
                                    const input = document.createElement('input');
                                    // set its type to file
                                    input.type = 'file';
                                    // set how many files it can accept
                                    input.accept = 'image/*';
                                    // set onchange event to call callback when user has selected file

                                    input.onchange = async (e: any) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const fileLocation = await uploadImageMutation.mutateAsync(file);

                                            await userMeApi.v1Put({
                                                address: userMeQuery.data?.address ?? '',
                                                name: userMeQuery.data?.name ?? '',
                                                phone: userMeQuery.data?.phone ?? '',
                                                avatar: fileLocation,
                                                banner: userMeQuery.data?.banner ?? '',
                                                dob: moment(userMeQuery.data?.dob).format('YYYY-MM-DD'),
                                                facebookUrl: '',
                                                major: '',
                                                studentId: '',
                                                bio: userMeQuery.data?.bio ?? '',
                                                nickname: userMeQuery.data?.nickname ?? '',
                                            });
                                            userMeQuery.refetch();
                                        }
                                    };
                                    // click the input element to show file browser dialog
                                    input.click();
                                }}
                            >
                                <img src={userMeQuery.data?.avatar} alt={userMeQuery.data?.name} className="h-32 w-32 rounded-full" />
                            </div>
                        </div>
                    </div>

                    <div className="relative h-full flex-1 gap-2 rounded-lg bg-white p-5 px-4">
                        <NKFormWrapper<IV1UpdateProfileDto>
                            apiAction={userMeApi.v1Put}
                            defaultValues={{
                                address: userMeQuery.data?.address ?? '',
                                name: userMeQuery.data?.name ?? '',
                                phone: userMeQuery.data?.phone ?? '',
                                avatar: userMeQuery.data?.avatar ?? '',
                                banner: userMeQuery.data?.banner ?? '',
                                facebookUrl: '',
                                major: '',
                                studentId: '',
                                dob: moment(userMeQuery.data?.dob).format('YYYY-MM-DD'),
                                bio: userMeQuery.data?.bio ?? '',
                                nickname: userMeQuery.data?.nickname ?? '',
                            }}
                            schema={{
                                address: joi.string().required(),
                                name: joi.string().required(),
                                phone: joi.string().required(),
                                avatar: joi.string().required(),
                                banner: joi.string().required(),
                                facebookUrl: joi.any().optional(),
                                major: joi.any().optional(),
                                studentId: joi.any().optional(),
                                dob: joi.date().required(),
                                bio: joi.string().optional(),
                                nickname: joi.string().allow('').optional(),
                            }}
                            onExtraSuccessAction={(data) => {
                                toast.success('Cập nhật thông tin thành công');
                            }}
                        >
                            <div className="mt-8 flex flex-col gap-5">
                                <div className="flex gap-5">
                                    <NKTextField name="name" label="Họ và tên" placeholder="Name" theme={'AUTH'} className="text-white" />
                                    <NKTextField
                                        name="nickname"
                                        label="Nickname"
                                        placeholder={userMeQuery.data?.name ?? 'Nickname'}
                                        theme={'AUTH'}
                                        className="text-white"
                                    />
                                </div>

                                <NKTextField
                                    name="phone"
                                    type="text"
                                    label="Số điện thoại"
                                    placeholder="0987654321"
                                    theme={'AUTH'}
                                    className="text-white"
                                />
                                <NKTextField name="address" label="Địa chỉ" placeholder="Address" theme={'AUTH'} className="text-white" />
                                <div className="sm:col-span-2">
                                    <NKDateField label="Ngày sinh" name="dob" theme={'AUTH'} />
                                </div>
                                <NKTextareaField
                                    name="bio"
                                    label="Tiểu sử"
                                    placeholder="Bio"
                                    // theme={'AUTH'}
                                    className="text-white"
                                />

                                <div className=" w-full">
                                    <ButtonC type="submit" className="w-full">
                                        CẬP NHẬT
                                    </ButtonC>
                                </div>
                            </div>
                        </NKFormWrapper>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfilePage;
