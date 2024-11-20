import * as React from 'react';

import _ from 'lodash';
import { useFormContext } from 'react-hook-form';

interface NKFieldWrapperProps {
    label: string;
    children: React.ReactNode;
    name: string;
    isShow: boolean;
    className?: string;
}

const NKFieldWrapper: React.FC<NKFieldWrapperProps> = ({ children, isShow, label, className, name }) => {
    const formMethods = useFormContext();
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    React.useEffect(() => {
        const error = _.get(formMethods.formState.errors, `${name}.message`, '') as string;
        if (!error) {
            setErrorMessage('');
            return;
        }
        const formatError = error.split(' ').slice(1).join(' ');
        setErrorMessage(formatError);
    }, [formMethods.formState.errors]);

    return (
        <div className="flex w-full flex-col gap-1">
            {isShow && <label className={className ? className : 'block text-sm font-medium leading-6 text-gray-900'}>{label}</label>}
            {children}
            {Boolean(errorMessage) && (
                <div className="text-sm text-red-500">
                    {label} {errorMessage}
                </div>
            )}
        </div>
    );
};

export default NKFieldWrapper;
