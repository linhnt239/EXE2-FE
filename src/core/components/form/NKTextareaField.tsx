import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export type NKTextareaFieldTheme = 'DEFAULT' | 'AUTH' | 'TAILWIND' | 'CONTACT';

interface NKTextareaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    rows?: number;
    theme?: NKTextareaFieldTheme;
    icon?: React.ReactNode;
}

const NKTextareaField: React.FC<NKTextareaFieldProps> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx({
                            'flex items-center justify-center gap-2  rounded-lg border  border-gray-400 bg-white p-3 text-gray-400 shadow-sm duration-300 placeholder:text-gray-400 focus-within:text-gray-900':
                                theme === 'AUTH' || theme === 'DEFAULT',
                        })}
                    >
                        {icon}
                        <textarea
                            {...field}
                            {...rest}
                            className={clsx([
                                'w-full bg-transparent outline-none placeholder:text-gray-700 focus:outline-none',
                                rest.className,
                                {
                                    'rounded-md focus:border-[#47EA4F] focus:ring-[#47EA4F]': theme === 'TAILWIND',
                                    'mb-3 flex flex-shrink-0 items-start self-stretch border-solid border-black px-2.5 pb-2.5 pt-2 text-left text-[15px] font-medium leading-[normal] tracking-[0px] text-black outline-none [border-bottom-width:3px] placeholder:text-black':
                                        theme === 'CONTACT',
                                },
                            ])}
                        ></textarea>
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKTextareaField;
