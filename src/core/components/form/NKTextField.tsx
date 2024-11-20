import * as React from 'react';

import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export type NKTextFieldTheme = 'DEFAULT' | 'AUTH' | 'CONTACT';

interface NKTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKTextFieldTheme;
    icon?: React.ReactNode;
}

const NKTextField: React.FC<NKTextFieldProps> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx(['overflow-hidden'], {
                            'relative mt-2 flex items-center gap-3': theme === 'AUTH',
                            'rounded-md border border-black': theme === 'DEFAULT',
                        })}
                    >
                        {icon}
                        <input
                            {...field}
                            {...rest}
                            className={clsx(['w-full'], {
                                '  peer block  border-0 border-none bg-gray-50 py-1.5 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6':
                                    theme === 'AUTH',
                                'peer block border-0 bg-gray-50 px-2 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6': theme === 'DEFAULT',
                                'mb-3 flex items-start self-stretch border-solid border-black px-2.5 pb-2.5 pt-2 text-left text-[15px] font-medium leading-[normal] tracking-[0px] text-black outline-none duration-200 [border-bottom-width:3px] placeholder:text-black focus:border-[#47EA4F]':
                                    theme === 'CONTACT',
                            })}
                        />
                        {theme === 'AUTH' && (
                            <div
                                className="absolute inset-x-0 bottom-0 border-b border-gray-300 peer-focus:border-b-2 peer-focus:border-[#47EA4F]"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKTextField;
