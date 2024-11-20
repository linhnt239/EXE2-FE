import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

type NKSelectFieldTheme = 'DEFAULT' | 'AUTH';

interface NKSelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKSelectFieldTheme;
    icon?: React.ReactNode;
    options: NKSelectFieldOption[];
}

export interface NKSelectFieldOption {
    label: string;
    value: any;
}

const NKSelectField: React.FunctionComponent<NKSelectFieldProps> = ({
    name,
    isShow = true,
    label,
    labelClassName,
    theme = 'DEFAULT',
    icon,
    options,
    ...rest
}) => {
    const formMethods = useFormContext();
    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx([], {
                            'block w-full rounded-xl  bg-[#F3F4F6] px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6':
                                theme === 'AUTH',
                        })}
                    >
                        {icon}
                        <select {...field} {...rest} className={clsx(['w-full bg-inherit focus:outline-none'])}>
                            {options.map((option, index) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKSelectField;
