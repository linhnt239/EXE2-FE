import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { kebabCase } from 'lodash';
import _get from 'lodash/get';

import { useLangContext } from '@/core/contexts/LangContext';

interface FieldBadgeApiProps {
    value: any;
    apiAction?: () => Promise<any[]>;
    isApplyColor?: boolean;
}

const FieldBadgeApi: React.FC<FieldBadgeApiProps> = ({ value, apiAction, isApplyColor = true }) => {
    const [label, setLabel] = React.useState<string>('undefined');
    const [color, setColor] = React.useState<string>('red');
    const { locale } = useLangContext();

    useQuery(
        ['options', kebabCase(apiAction?.toString()), value],
        async () => {
            return apiAction ? apiAction() : Promise.resolve([]);
        },
        {
            cacheTime: Infinity,
            onSuccess: (data) => {
                const option = data.find((item) => item.value === value);
                if (option) {
                    setLabel(_get(option, `name.${locale}`) || option.name);
                    setColor(option.color);
                }
            },
        },
    );

    return (
        <div
            style={
                isApplyColor
                    ? {
                          color,
                      }
                    : {}
            }
        >
            {label}
        </div>
    );
};

export default FieldBadgeApi;
