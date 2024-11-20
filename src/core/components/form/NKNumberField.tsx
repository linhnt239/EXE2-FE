import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export type NKNumberFieldTheme = 'DEFAULT' | 'AUTH';

interface NKTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKNumberFieldTheme;
    icon?: React.ReactNode;
}

const NKNumberField: React.FC<NKTextFieldProps> = ({ name, isShow = true, label, labelClassName, theme = 'AUTH', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx([], {
                            'flex items-center justify-center gap-2  rounded-lg border  border-gray-400 p-3 text-gray-400 shadow-sm duration-300 placeholder:text-gray-400 focus-within:text-gray-900':
                                theme === 'AUTH',
                        })}
                    >
                        {icon}
                        <input
                            {...field}
                            {...rest}
                            type="number"
                            onChange={(e) => {
                                field.onChange(Number(e.target.value));
                            }}
                            className={clsx(['w-full focus:outline-none'], {
                                ' w-full border-none focus:outline-none ': theme === 'AUTH',
                            })}
                        />
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKNumberField;
