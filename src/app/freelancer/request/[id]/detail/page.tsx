'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ConfigProvider, Descriptions, Popconfirm, Switch, Upload, UploadFile } from 'antd';
import joi from 'joi';
import _get from 'lodash/get';
import { UploadIcon } from 'lucide-react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { uploadFileApi } from '@/core/api/upload-file.api';
import { UserSaleBookingOrderIV1UploadSourceDto, userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { UserMeSaleBookingOrderIV1UpdateDto, userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import ButtonC from '@/core/components/Button/Button';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKNumberField from '@/core/components/form/NKNumberField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import NKSwitch from '@/core/components/form/NkSwitch';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { mapListToOptions } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const router = useRouter();
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [isUploadUrl, setIsUploadUrl] = React.useState(false);
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['user-sale-booking-order', id],
        queryFn: () => {
            return userSaleBookingOrderApi.v1GetById(id);
        },
    });

    const updateBooking = useMutation(async (data: UserMeSaleBookingOrderIV1UpdateDto) => {
        return await userMeSaleBookingOrderApi.v1Put(id, data);
    });

    const cancelBooking = useMutation(
        async () => {
            return await userMeSaleBookingOrderApi.v1Cancel(id);
        },
        {
            onSuccess: () => {
                toast.success('Hủy thành công');
                query.refetch();
            },
        },
    );

    const uploadSource = useMutation({
        mutationFn: async (data: UserSaleBookingOrderIV1UploadSourceDto) => {
            if (isUploadUrl) {
                return await userSaleBookingOrderApi.v1UploadSource(id, data);
            }

            if (fileList.length > 0) {
                const url = await uploadFileApi.v1UploadFile(fileList[0] as any);

                console.log(url);

                return await userSaleBookingOrderApi.v1UploadSource(id, { sourceCode: url });
            }
        },
        onSuccess: () => {
            toast.success('Gởi source thành công');
            queryClient.invalidateQueries(['user-sale-booking-order', id]);
        },
        onError: () => {
            toast.error('Gởi source không thành công');
        },
    });

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Descriptions
                title=""
                bordered
                extra={
                    <div className="flex items-center gap-4">
                        {query.data?.status === 'PENDING' ? (
                            <ModalBuilder
                                modalTitle={<p className="mb-5 text-2xl font-semibold">Thông tin đặt lịch freelancer</p>}
                                className="w-[500px] rounded-lg bg-white px-5 py-8 shadow-xl"
                                btnLabel={`Accept`}
                                btnProps={{
                                    className:
                                        'inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                                }}
                            >
                                {(close) => (
                                    <NKFormWrapper<UserMeSaleBookingOrderIV1UpdateDto>
                                        apiAction={async (value) =>
                                            updateBooking.mutate(value, {
                                                onSuccess: () => {
                                                    toast.success('Cập nhật thành công');
                                                    query.refetch();
                                                    close();
                                                },
                                            })
                                        }
                                        defaultValues={{
                                            extraFee: 0,
                                            note: '',
                                        }}
                                        schema={{
                                            extraFee: joi.number().optional(),
                                            note: joi.string().optional(),
                                        }}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <p className="text-base font-medium text-gray-900">Ghi chú của khách hàng: {query.data?.clientNote}</p>
                                            <NKTextareaField name="note" label="Your Note" />
                                            <NKNumberField name="extraFee" label="Phí phát sinh" />
                                            <ButtonC type="submit">Cập nhật</ButtonC>
                                        </div>
                                    </NKFormWrapper>
                                )}
                            </ModalBuilder>
                        ) : null}
                        {(query.data?.status === 'CONFIRMED' || query.data?.status === 'PENDING') && (
                            <Popconfirm
                                onConfirm={() => cancelBooking.mutate()}
                                okButtonProps={{
                                    className: 'bg-red-600 hover:bg-red-500',
                                }}
                                title="Are you sure to denied this booking?"
                            >
                                <button className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                    Hủy
                                </button>
                            </Popconfirm>
                        )}
                        {query.data?.status === 'PAID' ? (
                            <ModalBuilder
                                btnLabel="Gởi source"
                                modalTitle={<p className="mb-5 text-2xl font-semibold">Gởi source code</p>}
                                className="w-[500px] rounded-lg bg-white px-5 py-8 shadow-xl"
                                btnProps={{
                                    className:
                                        'inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                                }}
                            >
                                {(close) => {
                                    return (
                                        <NKFormWrapper<{
                                            sourceCode: string;
                                        }>
                                            apiAction={async (value) => {
                                                await uploadSource.mutateAsync(value);

                                                close();
                                            }}
                                            defaultValues={{
                                                sourceCode: '',
                                            }}
                                            schema={{
                                                sourceCode: isUploadUrl ? joi.string().required() : joi.string().optional().allow(''),
                                            }}
                                        >
                                            <div className="flex flex-col gap-4">
                                                <ConfigProvider
                                                    theme={{
                                                        token: {
                                                            colorPrimary: '#47ea4e',
                                                        },
                                                    }}
                                                >
                                                    {isUploadUrl ? (
                                                        <NKTextareaField name="sourceCode" label="Source code" />
                                                    ) : (
                                                        <Upload
                                                            maxCount={1}
                                                            fileList={fileList}
                                                            beforeUpload={(file) => {
                                                                setFileList([...fileList, file]);
                                                            }}
                                                            onRemove={(file) => {
                                                                const index = fileList.indexOf(file);
                                                                const newFileList = fileList.slice();
                                                                newFileList.splice(index, 1);
                                                                setFileList(newFileList);
                                                            }}
                                                        >
                                                            <Button
                                                                icon={<UploadIcon className="h-4 w-4" />}
                                                                htmlType="button"
                                                                className="flex items-center"
                                                            >
                                                                Chọn file
                                                            </Button>
                                                        </Upload>
                                                    )}
                                                    <div className="w-11">
                                                        <Switch
                                                            onChange={(checked) => {
                                                                setIsUploadUrl(checked);
                                                            }}
                                                            value={isUploadUrl}
                                                            className="bg-[#0000003f]"
                                                        />
                                                    </div>
                                                    <ButtonC type="submit">Gởi source</ButtonC>
                                                </ConfigProvider>
                                            </div>
                                        </NKFormWrapper>
                                    );
                                }}
                            </ModalBuilder>
                        ) : null}
                    </div>
                }
            >
                <Descriptions.Item label="Khách hàng" span={2}>
                    {query.data?.user.name}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo" span={1}>
                    {moment(query.data?.startDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Freelancer Email" span={3}>
                    {query.data?.status === 'PAID' ? query.data?.userSaleBooking.user.email : '********'}
                </Descriptions.Item>
                <Descriptions.Item label="Tên dịch vụ" span={1}>
                    <Link href={NKRouter.service.detail(query.data?.userSaleBooking.id || '')} className="text-indigo-600 hover:text-indigo-500">
                        {query.data?.userSaleBooking.name}
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label="Danh mục" span={1}>
                    <FieldBadgeApi
                        value={_get(query, 'data.userSaleBooking.serviceCategory.id', '')}
                        apiAction={async () => mapListToOptions(await serviceCategoryApi.v1Select('', true))}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Ngày kết thúc" span={1}>
                    {moment(query.data?.endDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú của khách hàng" span={3}>
                    {query.data?.clientNote}
                </Descriptions.Item>
                <Descriptions.Item label="Giá" span={1}>
                    {formatMoneyVND(query.data?.price || 0)}
                </Descriptions.Item>
                <Descriptions.Item label="Phí phát sinh" span={1}>
                    {formatMoneyVND(query.data?.extraFee || 0)}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng công" span={1}>
                    {formatMoneyVND(Number(query.data?.price || 0) + Number(query.data?.extraFee || 0))}
                </Descriptions.Item>

                <Descriptions.Item label="Ghi chú của Freelancer" span={3}>
                    {query.data?.note}
                </Descriptions.Item>
                <Descriptions.Item label="Source code" span={3}>
                    {query.data?.sourceCode ? (
                        <Link
                            href={query.data.sourceCode}
                            className="text-indigo-600 hover:text-indigo-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Xem source
                        </Link>
                    ) : (
                        'Chưa gởi source'
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái" span={1}>
                    <FieldBadgeApi value={_get(query, 'data.status', '')} apiAction={userSaleBookingOrderApi.v1GetEnumStatus} />
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian tạo" span={1}>
                    {moment(query.data?.createdAt).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Cập nhật lần cuối" span={1}>
                    {moment(query.data?.updatedAt).format('DD/MM/YYYY')}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default Page;
