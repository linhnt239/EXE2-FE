import * as React from 'react';

import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import joi from 'joi';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';

import { toastError } from '@/core/utils/api.helper';

interface NKFormWrapperProps<T> {
    children: React.ReactNode | ((methods: UseFormReturn) => React.ReactNode);
    schema: Record<keyof T, joi.AnySchema>;
    locale?: string;
    defaultValues: T;
    apiAction: (value: T) => Promise<any>;
    isResetFormAfterSubmit?: boolean;
    formProps?: React.ReactHTMLElement<HTMLFormElement>;
    onExtraSuccessAction?: (data: any, methods: UseFormReturn) => void;
    onExtraErrorAction?: (data: any, methods: UseFormReturn) => void;
}

const NKFormWrapper = <T extends Object>({
    children,
    schema,
    locale = 'en',
    apiAction,
    defaultValues,
    formProps,
    onExtraSuccessAction,
    onExtraErrorAction,
}: NKFormWrapperProps<T>) => {
    const formMethods = useForm<any>({
        defaultValues,
        resolver: joiResolver(joi.object(schema)),
    });

    const mutate = useMutation(apiAction, {
        onSuccess: (data) => {
            onExtraSuccessAction?.(data, formMethods);
        },
        onError: (error) => {
            onExtraErrorAction?.(error, formMethods);
            toastError(error);
        },
    });

    return (
        <FormProvider {...formMethods}>
            {}
            <form
                {...formProps}
                className="w-full"
                onSubmit={formMethods.handleSubmit((data) => {
                    mutate.mutate(data);
                })}
            >
                {typeof children === 'function' ? children(formMethods) : children}
            </form>
        </FormProvider>
    );
};

export default NKFormWrapper;
