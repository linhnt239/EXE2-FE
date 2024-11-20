import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { ArrowCycle, ArrowDown, Plus, TrashBin } from 'akar-icons';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import ImageUploading, { ImageListType, ImageType, ImageUploadingPropsType } from 'react-images-uploading';
import { toast } from 'react-toastify';

import { uploadFileApi } from '@/core/api/upload-file.api';

import NKFieldWrapper from './NKFieldWrapper';

export interface NKImageUploadMultipleProps extends Omit<ImageUploadingPropsType, 'onChange' | 'value'> {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
}

const NKImageUploadMultiple: React.FC<NKImageUploadMultipleProps> = ({ label, name, isShow = true, labelClassName, ...rest }) => {
    const formMethods = useFormContext();

    const [imageList, setImageList] = React.useState<ImageType[]>([]);

    React.useEffect(() => {
        const imageUrls = formMethods.getValues(name) as string[];

        const newImageList = imageUrls.map((item) => {
            return {
                data_url: item,
            };
        });

        setImageList(newImageList);
    }, [name]);

    const uploadImageMutation = useMutation((file: File) => {
        return uploadFileApi.v1UploadFile(file);
    });

    const onChange = async (imageList: ImageListType, addUpdateIndex?: number[] | undefined) => {
        let isError = false;

        const newImageList: Promise<Array<ImageType | null>> = Promise.all(
            (imageList as ImageType[]).map((item) => {
                if (!item.file) return item;

                return uploadImageMutation
                    .mutateAsync(item.file as File)
                    .then((res) => ({ file: undefined, data_url: res }))
                    .catch(() => {
                        isError = true;
                        return null;
                    });
            }),
        );

        if (isError) return toast.error('Định dạng một số file không hợp lệ');

        const filteredImageList = await (
            await newImageList
        ).map((item, index) => {
            if (!item) return imageList[index];

            return {
                data_url: item.data_url,
            };
        });

        formMethods.setValue(
            name,
            filteredImageList.map((item) => item.data_url),
        );

        setImageList(await filteredImageList);
    };

    React.useEffect(() => {
        if (formMethods.getValues(name)) {
            const imageUrls = formMethods.getValues(name) as string[];

            const newImageList = imageUrls.map((item) => {
                return {
                    data_url: item,
                };
            });

            setImageList(newImageList);
        }
    }, [formMethods.getValues(name)]);

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <div className="flex flex-wrap gap-2">
                <ImageUploading multiple value={imageList} onChange={(a, b) => onChange(a, b)} {...rest}>
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                        // write your building UI
                        <div className="grid grid-cols-4 gap-2">
                            <button
                                className={clsx('col-span-1 flex h-20 w-20 items-center justify-center rounded bg-white text-black', {
                                    'opacity-80': isDragging,
                                    'opacity-100': !isDragging,
                                })}
                                type="button"
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                {isDragging ? <ArrowDown /> : <Plus />}
                            </button>

                            {imageList.map((image, index) => (
                                <div key={index} className="faded-in relative col-span-1 h-20 w-20 overflow-hidden rounded bg-white">
                                    <img src={image['data_url']} alt="" className="h-full w-full object-cover" />
                                    <div className="absolute left-1/2 top-1 flex w-full -translate-x-1/2 justify-between gap-2 px-1">
                                        <button
                                            onClick={() => onImageUpdate(index)}
                                            type="button"
                                            className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 p-1 text-white"
                                        >
                                            <ArrowCycle />
                                        </button>
                                        <button
                                            onClick={() => {
                                                onImageRemove(index);
                                            }}
                                            type="button"
                                            className="flex h-5 w-5 items-center justify-center rounded bg-red-600 p-1 text-white"
                                        >
                                            <TrashBin />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        </NKFieldWrapper>
    );
};

export default NKImageUploadMultiple;
