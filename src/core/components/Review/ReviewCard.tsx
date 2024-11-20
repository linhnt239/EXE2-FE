import * as React from 'react';

import Link from 'next/link';

import { Rate } from 'antd';
import moment from 'moment';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import { NKRouter } from '@/core/NKRouter';
import { CommonReview } from '@/core/models/commonReview';

interface ReviewCardProps {
    data: CommonReview;
}

const ReviewCard: React.FunctionComponent<ReviewCardProps> = ({ data }) => {
    return (
        <div className="flex h-full w-full gap-4 ">
            <div className="flex h-fit w-56 flex-shrink-0 flex-col gap-2 rounded border-[#4ade80] bg-green-50 px-3 py-2 shadow-[5px_5px_0px_0px_#4ade80]">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                        <img src={data.createdBy.avatar} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-green-950">{data.createdBy.name}</p>
                        <p className="text-xs font-medium text-gray-500">{moment(data.createdAt).utc(true).fromNow()}</p>
                    </div>
                </div>
            </div>
            <div className="flex min-h-40 w-full flex-col gap-4 rounded border border-[#4ade80] bg-white p-8 shadow">
                <div className="flex flex-col justify-start gap-1">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-base font-medium text-black">Nhận xét:</p>
                        <Rate disabled value={data.rate} />
                    </div>
                    <p className="text-sm text-gray-500">{data.content}</p>
                </div>
                {data.imageUrls?.length && (
                    <div className="flex flex-col gap-1">
                        <p className="text-base font-medium text-black">
                            Ảnh đính kèm: <span className="text-base font-normal text-gray-500">{data.imageUrls.length}</span>
                        </p>
                        <div className="flex w-full flex-wrap items-start justify-start gap-2">
                            <PhotoProvider>
                                {data.imageUrls.map((img, index) => (
                                    <PhotoView key={img} src={img}>
                                        <div className="h-20 w-20 overflow-hidden rounded-md border border-black duration-150 hover:border-[#4ade80]">
                                            <img src={img} alt="" className="h-auto w-full" />
                                        </div>
                                    </PhotoView>
                                ))}
                            </PhotoProvider>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewCard;
