import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

import { IPagingDto, ResponseList } from '@/core/models/common';

interface ScrollInfinityBuilderProps {
    sourceKey: string;
    queryApi: (dto: IPagingDto) => Promise<ResponseList<any>>;
    pageSize?: number;
    render: (item: any, index: number) => React.ReactNode;
    className?: string;
    filters?: string[];
}

const ScrollInfinityBuilder: React.FC<ScrollInfinityBuilderProps> = ({ sourceKey, queryApi, pageSize = 10, filters = [], render, className }) => {
    const [currentData, setCurrentData] = React.useState<any[]>([]);

    const [page, setPage] = React.useState(0);
    const [isHasMore, setIsHasMore] = React.useState(true);

    const _ = useQuery(
        [sourceKey, 'paging', page, filters],
        async () => {
            const res = await queryApi({
                page: page,
                pageSize: pageSize,
                orderBy: ['createdAt||DESC'],
                filters,
            });

            return res.data;
        },
        {
            initialData: [],
            onSuccess: (data) => {
                if (data.length === 0) {
                    setIsHasMore(false);
                }

                const newData = [...currentData, ...data].filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
                setCurrentData(newData);
            },
        },
    );

    return (
        <InfiniteScroll
            dataLength={currentData.length}
            next={() => setPage(page + 1)}
            endMessage={<div className=" flex items-center justify-center py-1 text-xs opacity-25"></div>}
            hasMore={isHasMore}
            loader={<div className=" flex items-center justify-center py-4">loading...</div>}
        >
            <div className={className}>
                {currentData.map((item, index) => {
                    return render(item, index);
                })}
            </div>
        </InfiniteScroll>
    );
};

export default ScrollInfinityBuilder;
