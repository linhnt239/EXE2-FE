'use client';

import { FunctionComponent } from 'react';
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

interface ChangePasswordProps {}
interface ChangePasswordForm extends IV1ChangePasswordDto {
    confirmPassword: string;
}
const ChangePassword: FunctionComponent<ChangePasswordProps> = () => {
    return (
        <div className="fade-in relative  flex w-full max-w-[450px] flex-1 flex-col p-5">
            <div className="mb-10 text-start text-2xl font-semibold">Đổi Mật Khẩu</div>
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
    );
};

export default ChangePassword;
