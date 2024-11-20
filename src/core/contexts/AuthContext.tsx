'use client';

import * as React from 'react';

import { Order } from '../models/order';

export interface IAuthContext {}

const AuthContext = React.createContext<IAuthContext>({});
export interface CartProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<CartProviderProps> = ({ children }) => {
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useCart = () => {
    const context = React.useContext(AuthContext);

    return { ...context };
};
