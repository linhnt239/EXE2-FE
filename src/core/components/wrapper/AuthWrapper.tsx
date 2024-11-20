'use client';

import * as React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { userMeSubscriptionApi } from '@/core/api/user-me-subscription.api';
import { RootState, store } from '@/core/store';
import { UserState, userActions } from '@/core/store/user';

interface AuthWrapperProps {
    children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
    const { isAuth, isLogin } = useSelector<RootState, UserState>((state) => state.user);
    const router = useRouter();
    const pathName = usePathname();
    const [isShowVideo, setIsShowVideo] = React.useState(false);
    const [ads, setAds] = React.useState('https://cdn.shopify.com/videos/c/o/v/87be856eb83142f19ed3dcca8b589401.mp4');

    React.useEffect(() => {
        if (isAuth && pathName === NKConstant.AUTH_FAILED_FALLBACK_ROUTE) {
            router.push(NKConstant.AUTH_SUCCESS_FALLBACK_ROUTE);
        }

        if (isLogin && !isAuth) {
            router.push(NKConstant.AUTH_FAILED_FALLBACK_ROUTE);
        }
    }, [isAuth, pathName, isLogin]);

    const userSubscription = useQuery(
        ['subscription', 'me'],
        () => {
            return userMeSubscriptionApi.v1Get();
        },
        {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            onSuccess: (data: any) => {
                const isAds = localStorage.getItem('isAds') ?? '1';
                if (isAds === '1' && !data.id) {
                    //random 1 to 3 ads
                    const random = Math.floor(Math.random() * 3) + 1;
                    if (random === 1) {
                        setAds('https://cdn.shopify.com/videos/c/o/v/87be856eb83142f19ed3dcca8b589401.mp4');
                    } else if (random === 2) {
                        setAds('/ad1.mp4');
                    } else {
                        setAds('/ad2.mp4');
                    }

                    setIsShowVideo(true);
                }
                localStorage.setItem('isAds', '0');
            },
        },
    );

    return (
        <>
            {/* <Transition show={isShowVideo} className="fixed !inset-0 z-50 ">
                <video className="w-full h-full object-cover bg-white" autoPlay>
                    <source src={ads} type="video/mp4" />
                </video>
                <button
                    className="absolute bottom-10 right-10 bg-white border p-2 rounded-md"
                    onClick={() => {
                        setIsShowVideo(false);
                    }}
                >
                    Skip Ads
                </button>
            </Transition> */}
            {children}
        </>
    );
};

export default AuthWrapper;
