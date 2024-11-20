'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKConstant } from '../NKConstant';
import { AddToCartIV1Post, userMeOrderApi } from '../api/user-me-order.api';
import { Order } from '../models/order';
import { RootState } from '../store';
import { UserState } from '../store/user';

export enum CartActionType {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
}

export interface AddToCartAction extends AddToCartIV1Post {
    type: CartActionType;
}

export interface ICartContext {
    cart: Order | undefined;
    handleAddToCart: (dto: AddToCartIV1Post) => void;
    handleRemoveFromCart: (productVariantId: string) => void;
    refetchCart: () => void;
}

const CartContext = React.createContext<ICartContext>({
    cart: undefined,
    handleAddToCart: () => {},
    handleRemoveFromCart: () => {},
    refetchCart: () => {},
});
export interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const { isAuth, id } = useSelector<RootState, UserState>((state) => state.user);
    const router = useRouter();

    const cartQuery = useQuery(
        ['cart', id],
        () => {
            return userMeOrderApi.v1GetPrice();
        },
        {
            enabled: !!id,
        },
    );

    const addToCartMutation = useMutation(
        (dto: AddToCartAction) => {
            if (!isAuth) {
                toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
                router.push(NKConstant.AUTH_FAILED_FALLBACK_ROUTE);
            }

            if (dto.type === CartActionType.ADD_TO_CART) {
                const item = cartQuery.data?.orderItems.find((item) => item.productVariant.id === dto.productVariantId);
                if (item) {
                    dto.quantity += item.quantity;
                }
            }

            return userMeOrderApi.v1PostAddToCart({
                productVariantId: dto.productVariantId,
                quantity: dto.quantity,
            });
        },
        {
            onSuccess: () => {
                cartQuery.refetch();
            },
        },
    );

    const handleRemoveFromCart = async (productVariantId: string) => {
        return await addToCartMutation.mutateAsync({
            productVariantId,
            quantity: 0,
            type: CartActionType.REMOVE_FROM_CART,
        });
    };

    const handleAddToCart = async (dto: AddToCartIV1Post) => {
        return await addToCartMutation.mutateAsync({
            productVariantId: dto.productVariantId,
            quantity: dto.quantity,
            type: CartActionType.ADD_TO_CART,
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart: cartQuery.data,
                handleAddToCart,
                handleRemoveFromCart,
                refetchCart: () => {
                    cartQuery.refetch();
                },
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = React.useContext(CartContext);

    return { ...context };
};
