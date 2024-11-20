import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export type NKDateFieldTheme = 'DEFAULT' | 'AUTH';

interface NKDateFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKDateFieldTheme;
    icon?: React.ReactNode;
}

const NKDateField: React.FC<NKDateFieldProps> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx([], {
                            'relative mt-2 flex items-center gap-3': theme === 'AUTH',
                        })}
                    >
                        {icon}
                        <input
                            {...field}
                            {...rest}
                            type="date"
                            className={clsx(['peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6'], {
                                ' w-full border-none focus:outline-none ': theme === 'AUTH',
                            })}
                        />
                        <div
                            className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-[#47EA4F]"
                            aria-hidden="true"
                        />
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKDateField;
