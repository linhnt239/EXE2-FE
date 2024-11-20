import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { Typography } from 'antd';

import { uploadFileApi } from '@/core/api/upload-file.api';

const { Paragraph } = Typography;

interface CTAUploadFileProps {
    children?: React.ReactNode;
    onUpload?: (url: string) => void;
}

const CTAUploadFile: React.FC<CTAUploadFileProps> = ({ children, onUpload }) => {
    const uploadMutation = useMutation(
        (file: File) => {
            return uploadFileApi.v1UploadFile(file);
        },
        {
            onSuccess: (data) => {
                onUpload?.(data);
            },
        },
    );

    const _uploadFile = () => {
        // create a new input element
        const input = document.createElement('input');
        // set its type to file
        input.type = 'file';
        // set how many files it can accept
        input.accept = 'image/*';
        // set onchange event to call a function
        input.onchange = (e) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            if (file) {
                uploadMutation.mutate(file);
            }
        };
        // click the input element
        input.click();
    };

    return (
        <div className="flex w-full flex-col" onClick={_uploadFile}>
            {children}
        </div>
    );
};

export default CTAUploadFile;
