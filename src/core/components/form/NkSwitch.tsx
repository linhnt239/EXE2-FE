import * as React from 'react';

import { ConfigProvider, Switch } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper from './NKFieldWrapper';

type NKSwitchTheme = 'DEFAULT' | 'AUTH';

interface NkSwitchFieldProps {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKSwitchTheme;
    icon?: React.ReactNode;
}

const NKSwitch: React.FunctionComponent<NkSwitchFieldProps> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();
    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#47ea4e',
                            },
                            components: {
                                Switch: {
                                    colorBgContainer: 'rgba(0, 0, 0, 0.25)',
                                },
                            },
                        }}
                    >
                        <Switch {...field} className="bg-[#0000003f]" />
                    </ConfigProvider>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKSwitch;
