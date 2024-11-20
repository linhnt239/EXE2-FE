'use client';

import * as React from 'react';

import Link from 'next/link';

import { ChevronLeft } from 'akar-icons';
import joi from 'joi';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { IV1ChangePasswordDto, userMeApi } from '@/core/api/user-me.api';
import ButtonC from '@/core/components/Button/Button';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';

interface PageProps {}

interface ChangePasswordForm extends IV1ChangePasswordDto {
    confirmPassword: string;
}

const Page: React.FC<PageProps> = () => {
    return (
        <div className="fade-in relative flex w-full flex-1 items-center justify-center bg-black">
            <div className="h-full w-full max-w-[500px] rounded-lg bg-white p-7">
                <div className=" absolute left-4 top-4 rounded-full bg-white p-2">
                    <Link href={NKRouter.app.settings.index()}>
                        <div>
                            <ChevronLeft strokeWidth={3} size={24} />
                        </div>
                    </Link>
                </div>
                <div className="mb-4 text-center text-2xl font-semibold">Đổi Mật Khẩu</div>
                <NKFormWrapper<ChangePasswordForm>
                    apiAction={(data) => {
                        return userMeApi.v1PutChangePassword({
                            newPassword: data.newPassword,
                            password: data.password,
                        });
                    }}
                    defaultValues={{
                        newPassword: '',
                        confirmPassword: '',
                        password: '',
                    }}
                    schema={{
                        newPassword: joi.string().required(),
                        confirmPassword: joi.string().required().valid(joi.ref('newPassword')),
                        password: joi.string().required(),
                    }}
                    onExtraSuccessAction={(data) => {
                        toast.success('Cập nhật thông tin thành công');
                    }}
                >
                    <div className="flex flex-col gap-5">
                        <NKTextField
                            name="password"
                            label="Mật khẩu cũ"
                            type="password"
                            placeholder="Mật khẩu cũ"
                            theme={'AUTH'}
                            className="text-white"
                        />
                        <NKTextField
                            name="newPassword"
                            label="Mật khẩu mới"
                            type="password"
                            placeholder="Mật khẩu mới"
                            theme={'AUTH'}
                            className="text-white"
                        />
                        <NKTextField
                            name="confirmPassword"
                            type="password"
                            label="Xác nhận mật khẩu"
                            placeholder="Xác nhận mật khẩu"
                            theme={'AUTH'}
                            className="text-white"
                        />
                        <ButtonC type="submit" className="mt-5">
                            CẬP NHẬT
                        </ButtonC>
                    </div>
                </NKFormWrapper>
            </div>
        </div>
    );
};

export default Page;
