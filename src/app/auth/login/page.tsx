'use client';

import * as React from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import joi from 'joi';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { NKConfig } from '@/core/NKConfig';
import { NKConstant } from '@/core/NKConstant';
import { NKRouter } from '@/core/NKRouter';
import { authApi } from '@/core/api/auth.api';
import ButtonC from '@/core/components/Button/Button';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKTextField from '@/core/components/form/NKTextField';
import { store } from '@/core/store';
import { userActions } from '@/core/store/user';

interface AuthLoginProps {}

const AuthLogin: React.FC<AuthLoginProps> = () => {
    const searchParam = useSearchParams();

    React.useEffect(() => {
        const token = searchParam.get('token');

        if (token) {
            toast.success('Đăng nhập thành công');
            const cookies = new Cookies();
            cookies.set(NKConstant.TOKEN_COOKIE_KEY, token, {
                path: '/',
            });
            store.dispatch(userActions.setToken(token));
        }
    }, [searchParam]);

    return (
        <main className="fade-in flex min-h-screen w-full bg-black">
            <div className="flex flex-1 justify-center px-6 pt-12">
                <NKFormWrapper
                    apiAction={authApi.v1LoginEmail}
                    defaultValues={{
                        email: '',
                        password: '',
                    }}
                    schema={{
                        email: joi
                            .string()
                            .trim()
                            .lowercase()
                            .email({
                                tlds: {
                                    allow: false,
                                },
                            })
                            .required(),
                        password: joi.string().trim().required(),
                    }}
                    onExtraSuccessAction={(data) => {
                        toast.success('Đăng nhập thành công');
                        const cookies = new Cookies();
                        cookies.set(NKConstant.TOKEN_COOKIE_KEY, data.token, {
                            path: '/',
                        });
                        localStorage.setItem('isAds', '1');
                        store.dispatch(userActions.setToken(data.token));
                    }}
                >
                    <div className="w-full">
                        <div className="mb-5 flex flex-col items-center justify-center">
                            <img className="h-16" src="/assets/images/logo.png " alt="banner" />
                        </div>

                        <div className="mx-auto flex w-full max-w-[400px] flex-col gap-5 rounded-lg bg-white p-5 ">
                            <NKTextField
                                icon={
                                    <div className="text-xl">
                                        <MdOutlineEmail />
                                    </div>
                                }
                                name="email"
                                label="Email"
                                placeholder="name@email.com"
                                theme={'AUTH'}
                                className="text-white"
                                autoComplete="off"
                            />
                            <NKTextField
                                icon={
                                    <div className="text-xl">
                                        <MdLockOutline />
                                    </div>
                                }
                                name="password"
                                type="password"
                                label="Mật Khẩu"
                                placeholder="********"
                                theme={'AUTH'}
                                className="text-white"
                                autoComplete="off"
                            />
                            <ButtonC type="submit">ĐĂNG NHẬP</ButtonC>
                            <div className="flex flex-col  gap-4">
                                <div className="flex w-full justify-end">
                                    <Link href={NKRouter.auth.forgotPassword()} className="font-medium text-[#47ea4e]">
                                        Quên mật khẩu?
                                    </Link>
                                </div>
                                <div className="relative flex h-5">
                                    <div className="inset-0 flex flex-1 items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="z-20 px-2 text-sm text-gray-500">HOẶC ĐĂNG NHẬP BẰNG</span>
                                    </div>
                                    <div className="inset-0 flex flex-1 items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-4">
                                    <Link href={NKConfig.LOGIN_GOOGLE_URL}>
                                        <ButtonC className="w-full items-center justify-start gap-4 bg-black pl-16 shadow-2xl">
                                            <img
                                                className="h-6 w-6"
                                                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                            <div className="text-white">Đăng nhập với Google</div>
                                        </ButtonC>
                                    </Link>
                                    <Link href={NKConfig.LOGIN_FACEBOOK_URL}>
                                        <ButtonC className="w-full items-center justify-start gap-4 bg-white pl-16 shadow-2xl">
                                            <img
                                                className="h-6 w-6"
                                                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png "
                                                loading="lazy"
                                                alt="google logo"
                                            />
                                            <div className="text-black">Đăng nhập với Facebook</div>
                                        </ButtonC>
                                    </Link>
                                </div>
                                <div className="flex justify-center gap-1  leading-6">
                                    <div className="text-gray-500">Chưa có tài khoản?</div>
                                    <Link href={NKRouter.auth.register()} className="font-semibold text-[#47ea4e] ">
                                        Đăng ký
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </NKFormWrapper>
            </div>
        </main>
    );
};

export default AuthLogin;
