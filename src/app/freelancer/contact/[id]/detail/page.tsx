'use client';

import * as React from 'react';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, ConfigProvider, Descriptions, Popconfirm, Rate, Switch, Tooltip, Upload } from 'antd';
import { UploadFile } from 'antd/lib';
import joi from 'joi';
import _get from 'lodash/get';
import { UploadIcon } from 'lucide-react';
import moment from 'moment';
import { FormProvider, useForm } from 'react-hook-form';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import { CommonReviewIV1Create, commonReviewApi } from '@/core/api/common-review.api';
import { serviceCategoryApi } from '@/core/api/service-category.api';
import { uploadFileApi } from '@/core/api/upload-file.api';
import { UserSaleBookingOrderIV1UploadSourceDto, userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userMeSaleBookingOrderApi } from '@/core/api/user-me-sale-booking-order.api';
import { userMeApi } from '@/core/api/user-me.api';
import ButtonC from '@/core/components/Button/Button';
import ReviewCard from '@/core/components/Review/ReviewCard';
import FieldBadgeApi from '@/core/components/field/FieldBadgeApi';
import NKFormWrapper from '@/core/components/form/NKFormWrapper';
import NKImageUploadMultiple from '@/core/components/form/NKImageUploadMultiple';
import NKRatingField from '@/core/components/form/NKRatingField';
import NKTextareaField from '@/core/components/form/NKTextareaField';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { FilterComparator } from '@/core/models/common';
import { RootState } from '@/core/store';
import { mapListToOptions } from '@/core/utils/api.helper';
import { formatMoneyVND } from '@/core/utils/string.helper';

const defaultValues: CommonReviewIV1Create = {
    rate: 5,
    content: '',
    imageUrls: [],
    ownerId: '',
    subOwnerId: '',
};

interface PageProps {}

const Page: React.FC<PageProps> = () => {
    const params = useParams();
    const id = _get(params, 'id') as string;
    const router = useRouter();
    const userState = useSelector<RootState, RootState['user']>((state) => state.user);
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [isUploadUrl, setIsUploadUrl] = React.useState(false);

    const userMeQuery = useQuery({
        queryKey: ['user-me'],
        queryFn: () => {
            return userMeApi.v1Get();
        },
    });

    const query = useQuery({
        queryKey: ['user-sale-booking-order', id],
        queryFn: () => {
            return userSaleBookingOrderApi.v1GetById(id);
        },
    });

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
            query.refetch();
        },
        onError: () => {
            toast.error('Gởi source không thành công');
        },
    });

    const cancelMutation = useMutation(
        async () => {
            return await userMeSaleBookingOrderApi.v1Cancel(id);
        },
        {
            onSuccess: () => {
                toast.success('Cancel success');
                query.refetch();
            },
        },
    );

    const payBooking = useMutation(
        async () => {
            return await userMeSaleBookingOrderApi.v1Pay(id);
        },
        {
            onSuccess: () => {
                toast.success('Pay success');
                query.refetch();
            },
        },
    );

    const methods = useForm<CommonReviewIV1Create>({ defaultValues });

    const onSubmit = async (data: CommonReviewIV1Create) => {
        createReviewMutation.mutate(data);
    };

    const createReviewMutation = useMutation(
        async (data: CommonReviewIV1Create) => {
            data.ownerId = query.data?.userSaleBooking.id || '';
            data.subOwnerId = query.data?.userSaleBooking.user.id || '';
            return await commonReviewApi.v1Post(data);
        },
        {
            onSuccess: () => {
                toast.success('Create review success');
                methods.reset();
                commonReview.refetch();
            },
        },
    );

    const commonReview = useQuery({
        queryKey: ['common-review', query.data?.userSaleBooking.id, userState.id],
        queryFn: () => {
            return commonReviewApi.v1Get({
                filters: [
                    `ownerId||${FilterComparator.EQUAL}||${query.data?.userSaleBooking.id}`,
                    `createdBy.id||${FilterComparator.EQUAL}||${userState.id}`,
                ],
                orderBy: [],
                page: 0,
                pageSize: 10,
            });
        },
    });

    if (query.isLoading) {
        return <div className="w-full">Loading...</div>;
    }

    return (
        <div className="flex w-full  flex-col gap-6">
            <Descriptions
                title=""
                bordered
                extra={
                    <div className="flex gap-2">
                        {query.data?.status === 'PAID' && (
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
                        )}
                        {(query.data?.status === 'CONFIRMED' || query.data?.status === 'PENDING') && (
                            <>
                                <Popconfirm
                                    onConfirm={() => cancelMutation.mutate()}
                                    okButtonProps={{
                                        className: 'bg-red-600 hover:bg-red-500',
                                    }}
                                    title="Bạn có chắc chắn muốn huỷ lịch không?"
                                >
                                    <button className="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                        Huỷ lịch
                                    </button>
                                </Popconfirm>
                                {query.data?.status === 'CONFIRMED' && (
                                    <Tooltip title="Bạn có thể trả ngay sau khi Freelancer thay đổi thành trạng thái xác nhận">
                                        <button
                                            disabled={query.data?.status !== 'CONFIRMED'}
                                            onClick={() => {
                                                payBooking.mutate();
                                            }}
                                            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Thanh toán ngay
                                        </button>
                                    </Tooltip>
                                )}
                            </>
                        )}
                    </div>
                }
            >
                <Descriptions.Item label="Khách hàng" span={2}>
                    <Link
                        href={NKRouter.designer.detail(query.data?.userSaleBooking.user.id || '')}
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        {query.data?.userSaleBooking.user.name}
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian bắt đầu" span={1}>
                    {moment(query.data?.startDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Tên dự án" span={1}>
                    <Link href={NKRouter.project.detail(query.data?.userSaleBooking.id || '')} className="text-indigo-600 hover:text-indigo-500">
                        {query.data?.userSaleBooking.name}
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label="Danh Mục" span={1}>
                    <FieldBadgeApi
                        value={_get(query, 'data.userSaleBooking.serviceCategory.id', '')}
                        apiAction={async () => mapListToOptions(await serviceCategoryApi.v1Select('', true))}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian kết thúc" span={1}>
                    {moment(query.data?.endDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú của khách hàng" span={3}>
                    {query.data?.note}
                </Descriptions.Item>
                <Descriptions.Item label="Giá" span={1}>
                    {formatMoneyVND(query.data?.price || 0)}
                </Descriptions.Item>
                <Descriptions.Item label="Phí phát sinh" span={1}>
                    {formatMoneyVND(query.data?.extraFee || 0)}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng số tiền" span={1}>
                    {formatMoneyVND(Number(query.data?.price || 0) + Number(query.data?.extraFee || 0))}
                </Descriptions.Item>
                <Descriptions.Item label="Ghi chú của bạn" span={3}>
                    {query.data?.clientNote}
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

            {commonReview.data?.count ? (
                <div className="flex flex-col">
                    <h2 className="mb-2 text-2xl font-semibold text-black">Nhận xét của bạn</h2>
                    {commonReview.data?.data.map((item, index) => <ReviewCard key={item.id} data={item} />)}
                </div>
            ) : (
                <>
                    {query.data?.status === 'PAID' && (
                        <div className="flex w-full flex-col">
                            <h2 className="text-2xl font-semibold text-black">Để lại lời nhận xét</h2>
                            <FormProvider {...methods}>
                                <form
                                    onSubmit={methods.handleSubmit(onSubmit)}
                                    className="flex w-full flex-col rounded-md bg-green-50 px-4 py-8 shadow"
                                >
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-1 flex flex-col gap-2">
                                            <NKRatingField name="rating" label="Rating" />
                                            <NKImageUploadMultiple name="imageUrls" label="Image" />
                                        </div>
                                        <div className="col-span-1 flex flex-col items-end gap-2">
                                            <NKTextareaField className="bg-white" name="content" label="Content" rows={5} />
                                            <ButtonC className="w-fit">Gửi</ButtonC>
                                        </div>
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Page;
