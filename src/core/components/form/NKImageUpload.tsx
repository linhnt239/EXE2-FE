import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import BeatLoader from 'react-spinners/BeatLoader';

import { uploadFileApi } from '@/core/api/upload-file.api';

import NKFieldWrapper from './NKFieldWrapper';

interface NKImageUploadProps {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    id?: string;
}

const NKImageUpload: React.FC<NKImageUploadProps> = ({ label, name, extraProps, isShow = true, labelClassName, id = '' }) => {
    const formMethods = useFormContext();
    const [imageUrl, setImageUrl] = React.useState<string>();

    React.useEffect(() => {
        if (formMethods.getValues(name)) {
            setImageUrl(formMethods.getValues(name));
        }
    }, []);

    React.useEffect(() => {
        const subscription = formMethods.watch((value) => {
            setImageUrl(value[name]);
        });
        return () => subscription.unsubscribe();
    }, [formMethods.watch]);

    const uploadImageMutation = useMutation(
        (file: File) => {
            return uploadFileApi.v1UploadFile(file);
        },
        {
            onSuccess: (data) => {
                formMethods.setValue(name, data);
            },
        },
    );

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <button
                className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full"
                type="button"
                id={id}
                onClick={() => {
                    // create a new input element
                    const input = document.createElement('input');
                    // set its type to file
                    input.type = 'file';
                    // set how many files it can accept
                    input.accept = 'image/*';
                    // set onchange event to call callback when user has selected file

                    input.onchange = (e: any) => {
                        const file = e.target.files[0];
                        if (file) {
                            uploadImageMutation.mutate(file);
                        }
                    };
                    // click the input element to show file browser dialog
                    input.click();
                }}
            >
                {uploadImageMutation.isLoading ? (
                    <>
                        <BeatLoader color="#36d7b7" />
                    </>
                ) : (
                    <>
                        <img className="h-full w-full object-cover" src={imageUrl} alt={name} />
                    </>
                )}
            </button>
        </NKFieldWrapper>
    );
};

export default NKImageUpload;
