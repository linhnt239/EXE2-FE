'use client';

import React from 'react';

import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { CartProvider } from '@/core/contexts/CartContext';
import { store } from '@/core/store';

import ChatPopup from '../Chat/ChatPopup';
import TryAuthWrapper from '../wrapper/TryAuthWrapper';
import TanQueryClient from './TanQueryClient';

interface RootProviderProps {}

const RootProvider: React.FunctionComponent<RootProviderProps & React.PropsWithChildren> = ({ children }) => {
    return (
        <Provider store={store}>
            <TanQueryClient>
                <TryAuthWrapper>
                    <CartProvider>
                        <div className="flex flex-1 flex-col">{children}</div>
                        <ChatPopup />
                    </CartProvider>
                    <ToastContainer closeButton={false} autoClose={4000} limit={2} />
                    {/* <div className="fixed bottom-10 right-10 bg-gray-200 py-2 px-4 z-50 rounded font-semibold">
                    <PWAButton />
                </div> */}
                </TryAuthWrapper>
            </TanQueryClient>
        </Provider>
    );
};

export default RootProvider;
