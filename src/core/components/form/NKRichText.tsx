import * as React from 'react';

import clsx from 'clsx';
import BlotFormatter from 'quill-blot-formatter';
import { Controller, useFormContext } from 'react-hook-form';
import ReactQuill, { Quill, QuillOptions } from 'react-quill';

import { uploadFileApi } from '@/core/api/upload-file.api';

import NKFieldWrapper from './NKFieldWrapper';

const BaseImageFormat = Quill.import('formats/image');
const ImageFormatAttributesList = ['alt', 'height', 'width', 'style'];
class ImageFormat extends BaseImageFormat {
    static formats(domNode: any) {
        return ImageFormatAttributesList.reduce(function (formats, attribute) {
            if (domNode.hasAttribute(attribute)) {
                (formats as Record<any, any>)[attribute] = domNode.getAttribute(attribute);
            }
            return formats;
        }, {});
    }
    format(name: any, value: any) {
        if (ImageFormatAttributesList.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value);
            } else {
                this.domNode.removeAttribute(name);
            }
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(ImageFormat, true);
Quill.register('modules/blotFormatter', BlotFormatter);

export type NKRichTextTheme = 'DEFAULT';

export interface NKRichTextProps extends QuillOptions {
    name: string;
    label: string;
    isShow?: boolean;
    labelClassName?: string;
    extraProps?: any;
    theme?: NKRichTextTheme;
    icon?: React.ReactNode;
    className?: string;
}

const NKRichText: React.FC<NKRichTextProps> = ({
    name,
    label,
    extraProps,
    icon,
    isShow = true,
    labelClassName,
    theme = 'DEFAULT',
    className = '',
    ...rest
}) => {
    const editorRef = React.useRef<ReactQuill>(null);
    const [isShowEditor, setIsShowEditor] = React.useState<boolean>(false);

    const selectLocalImage = (editor: any, cb: (editor: typeof Quill, input: File) => void) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        input.onchange = () => {
            if (input?.files && input.files[0]) {
                const file = input.files[0];
                if (/^image\//.test(file.type)) {
                    cb(editor, file);
                } else {
                    alert('You could only upload images');
                }
            }
        };
    };

    const _handleUploadImage = async (editor: any, file: File) => {
        const res = await uploadFileApi.v1UploadFile(file);
        const imageUrl = res;
        const range = editor.getSelection();
        if (range) editor.insertEmbed(range.index, 'image', `${imageUrl}`);
    };
    const formMethods = useFormContext();

    React.useEffect(() => {
        if (editorRef.current) {
            const editor = editorRef.current.getEditor();

            editor.getModule('toolbar').addHandler('image', () => {
                selectLocalImage(editor, _handleUploadImage);
            });
        }
    }, []);

    return (
        <NKFieldWrapper className={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <div
                        className={clsx(' h-full ', {
                            'rounded-full bg-[#E6EEFA]/50': theme === 'DEFAULT',
                            'hide-toolbar': !isShowEditor,
                        })}
                    >
                        {icon}
                        <ReactQuill
                            {...rest}
                            {...field}
                            onFocus={() => setIsShowEditor(true)}
                            onBlur={() => setIsShowEditor(false)}
                            className={clsx('rounded-md border border-black bg-white', className)}
                            modules={{
                                toolbar: [
                                    // [{ header: [1, 2, 3, 4, false] }],
                                    // [{ header: 1 }, { header: 2 }, { font: [] }], // custom button values
                                    // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                                    // [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                                    // [{ size: ['small', 'large', 'huge'] }], // custom dropdown
                                    // [{ color: ['black'] }], // dropdown with defaults from theme
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    // [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['image', 'video'],
                                    // ['clean'],
                                    // ['blockquote', 'code-block'],
                                    // [{ font: [] }],
                                    // ['link'],
                                    //[{ 'align': [] }],
                                    // ['clean'], // remove formatting button
                                ],
                                blotFormatter: {
                                    // see config options below
                                },
                                // handlers: {
                                //   image: this.quillImageCallback,
                                // },
                                clipboard: {
                                    matchVisual: false,
                                },
                            }}
                            theme="snow"
                            formats={[
                                'script',
                                'header',
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'code-block',
                                'blockquote',
                                'list',
                                'bullet',
                                'indent',
                                'link',
                                'image',
                                'size',
                                'color',
                                'background',
                                'width',
                                'style',
                                'align',
                                'font',
                                'data-align',
                            ]}
                            ref={editorRef}
                        />
                    </div>
                )}
            />
        </NKFieldWrapper>
    );
};

export default NKRichText;
