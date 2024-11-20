import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export type NKDateFieldTheme = 'DEFAULT' | 'AUTH';

interface NKDatetimeFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKDateFieldTheme;
    icon?: React.ReactNode;
}

const NKDatetimeField: React.FC<NKDatetimeFieldProps> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx([], {
                            '': theme === 'AUTH',
                        })}
                    >
                        {icon}
                        <input
                            {...field}
                            {...rest}
                            type="datetime-local"
                            className={clsx(['w-full focus:outline-none'], {
                                'block w-full rounded-xl border border-gray-100  bg-[#F3F4F6] px-4 py-3 text-sm text-gray-900 shadow-sm  placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6':
                                    theme === 'AUTH',
                            })}
                        />
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKDatetimeField;
