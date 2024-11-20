import * as React from 'react';

import { Rate, RateProps } from 'antd';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

export type NKTextFieldTheme = 'DEFAULT' | 'AUTH' | 'CONTACT';

interface NKRatingProps extends RateProps {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKTextFieldTheme;
    icon?: React.ReactNode;
}

const NKRatingField: React.FC<NKRatingProps> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller name={name} control={formMethods.control} render={({ field }) => <Rate {...field} {...rest} />} />
        </NKFieldWrapper>
    );
};

export default NKRatingField;
