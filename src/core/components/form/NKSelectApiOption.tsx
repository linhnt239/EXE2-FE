import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { AutoComplete } from 'antd';
import clsx from 'clsx';
import { isNull, isUndefined } from 'lodash';
import _get from 'lodash/get';
import { useFormContext } from 'react-hook-form';

import { SupportLanguage, useLangContext } from '@/core/contexts/LangContext';

import NKFieldWrapper from './NKFieldWrapper';

interface NKSelectApiOptionProps {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    apiAction?: (value: string) => Promise<any[]>;
    fieldProps?: any;
}

const NKSelectApiOption: React.FC<NKSelectApiOptionProps> = ({ name, isShow = true, label, labelClassName, fieldProps, ...rest }) => {
    const [searchValue, setSearchValue] = React.useState('');
    const { locale } = useLangContext();
    const [isDefault, setIsDefault] = React.useState(false);
    const { setValue, getValues } = useFormContext();
    const optionsQuery = useQuery(
        ['options', name, searchValue],
        async () => {
            const res = await (rest.apiAction ? rest.apiAction(searchValue) : Promise.resolve([]));
            const isAllOption = _get(fieldProps, 'isAllOption', false);
            return isAllOption
                ? [
                      {
                          id: '',

                          name: clsx('', {
                              All: locale === SupportLanguage.EN,
                              'Tất cả': locale === SupportLanguage.VI,
                          }),
                      },
                      ...res,
                  ]
                : res;
        },
        {
            initialData: [],
        },
    );

    React.useEffect(() => {
        if (optionsQuery.data.length === 0 || isDefault) return;
        const defaultValues = getValues(name);

        if (isNull(defaultValues) || isUndefined(defaultValues)) {
            //select first option
            setSearchValue(_get(optionsQuery.data[0], `name.${locale}`) || optionsQuery.data[0].name);
            setValue(name, optionsQuery.data[0].id);
        } else {
            const res = optionsQuery.data.find((item) => item.id === defaultValues);
            setSearchValue(_get(res, `name.${locale}`) || res?.name);
        }
        setIsDefault(true);
    }, [optionsQuery.data, isDefault]);

    const onSelect = (data: string) => {
        const res = optionsQuery.data.find((item) => item.id === data);
        setSearchValue(_get(res, `name.${locale}`) || res?.name);
        setValue(`${name}`, data, { shouldTouch: true });
    };

    const onChange = (data: string) => {
        setSearchValue(data);
    };

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <div className={clsx('', { 'mt-2': isShow })}>
                <AutoComplete
                    value={searchValue}
                    options={optionsQuery.data.map((item) => ({
                        label: _get(item, `name.${locale}`) || item.name,
                        value: item.id,
                    }))}
                    onSelect={onSelect}
                    onChange={onChange}
                    onBlur={() => {
                        const res = optionsQuery.data.find((item) => item.name === searchValue);

                        if (res) {
                            setSearchValue(res.name);
                        } else {
                            setSearchValue('');
                            setIsDefault(false);
                        }
                    }}
                    className="!focus:border-indigo-600 !focus:border w-full"
                />
            </div>
        </NKFieldWrapper>
    );
};

export default NKSelectApiOption;
