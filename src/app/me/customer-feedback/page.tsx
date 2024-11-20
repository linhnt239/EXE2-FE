'use client';

import { FunctionComponent } from 'react';

import { Rating } from '@smastrom/react-rating';
import clsx from 'clsx';
import moment from 'moment';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useSelector } from 'react-redux';

import { commonReviewApi } from '@/core/api/common-review.api';
import ScrollInfinityBuilder from '@/core/components/scroll/ScrollInfinityBuilder';
import { FilterComparator } from '@/core/models/common';
import { CommonReview } from '@/core/models/commonReview';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
    const userState = useSelector<RootState, UserState>((state) => state.user);

    return (
        <div className="fade-in relative  flex w-full  flex-1 flex-col py-5">
            <ScrollInfinityBuilder
                sourceKey="user-wallet-transaction"
                className="flex flex-col gap-2"
                queryApi={(dto) =>
                    commonReviewApi.v1Get({
                        ...dto,
                        filters: [...dto.filters, `ownerId||${FilterComparator.EQUAL}||${userState.id}`],
                    })
                }
                render={(item: CommonReview, index) => (
                    <div key={item.id} className={clsx('flex w-full justify-between  rounded-lg border bg-white px-4 py-3 shadow-lg ', {})}>
                        <div className="flex w-full flex-col  gap-1">
                            <div className="flex items-center gap-2">
                                <Rating style={{ maxWidth: 100 }} value={item.rate} readOnly />
                                <div>-</div>
                                <div className="font-medium text-gray-400">{item.createdBy.name}</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>{item.content}</div>
                                <div className="flex flex-wrap gap-2">
                                    <PhotoProvider>
                                        {item.imageUrls.map((url) => (
                                            <PhotoView key={url} src={url}>
                                                <img src={url} alt="" className="h-16 w-16 object-cover" />
                                            </PhotoView>
                                        ))}
                                    </PhotoProvider>
                                </div>
                            </div>
                            <div className="text-xs text-gray-400">{moment(item.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default Page;
