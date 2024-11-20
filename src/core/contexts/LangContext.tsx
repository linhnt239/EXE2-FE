'use client';

import * as React from 'react';

import { Order } from '../models/order';

export enum SupportLanguage {
    EN = 'en',
    VI = 'vi',
}

export interface IAuthContext {
    locale: SupportLanguage;
}

const LangContext = React.createContext<IAuthContext>({
    locale: SupportLanguage.EN,
});
export interface CartProviderProps {
    children: React.ReactNode;
}

export const LangProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [locale, setLocale] = React.useState<SupportLanguage>(SupportLanguage.VI);

    return (
        <LangContext.Provider
            value={{
                locale,
            }}
        >
            {children}
        </LangContext.Provider>
    );
};

export const useLangContext = () => {
    const context = React.useContext(LangContext);

    return { ...context };
};
