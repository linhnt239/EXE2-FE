import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Button, Popover } from 'antd';
import { Bell, Loader2 } from 'lucide-react';
import { MdNotificationsActive } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import { userSaleBookingOrderApi } from '@/core/api/use-sale-booking-order.api';
import { userMeNotificationApi } from '@/core/api/user-me-notification';
import { FilterComparator } from '@/core/models/common';
import { RootState } from '@/core/store';
import { UserState } from '@/core/store/user';
import { cn } from '@/core/utils/tailwind';

import NotificationItem from './NotificationItem';

const NotificationPopup = () => {
    const { id } = useSelector<RootState, UserState>((state: RootState) => state.user);
    const [open, setOpen] = useState(false);

    const infiniteQuery = useInfiniteQuery({
        queryKey: ['userSaleBookingOrder', id],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await userMeNotificationApi.v1Get({
                page: pageParam,
                pageSize: 5,
                filters: [`user.id||${FilterComparator.EQUAL}||${id}`],
                orderBy: ['createdAt||DESC'],
            });

            return {
                ...data,
                prevPage: pageParam,
            };
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.prevPage + 1 >= lastPage.totalPage) {
                return undefined;
            }

            return lastPage.prevPage + 1;
        },
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(id),
    });

    const data = infiniteQuery.data?.pages.map((page) => page.data).flat() || [];

    return (
        <Popover
            trigger="click"
            title={<span className="text-lg font-semibold">Thông báo</span>}
            placement="bottom"
            overlayStyle={{
                width: '320px',
            }}
            content={
                <InfiniteScroll
                    className={cn('hidden-scroll', {
                        'flex items-center justify-center ': infiniteQuery.isLoading || data.length === 0,
                    })}
                    dataLength={data.length}
                    next={() => infiniteQuery.fetchNextPage()}
                    endMessage={<div className="col-span-3 flex items-center justify-center py-1 text-xs opacity-25"></div>}
                    hasMore={Boolean(infiniteQuery.hasNextPage)}
                    loader={
                        <div className="col-span-3 flex items-center justify-center py-4">
                            <Loader2 className="text-primary h-4 w-4 animate-spin" />
                        </div>
                    }
                    height={240}
                >
                    {data.length > 0 ? (
                        data.map((item) => {
                            return (
                                <NotificationItem
                                    key={item.id}
                                    notification={item}
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <span>Không có thông báo mới</span>
                    )}
                </InfiniteScroll>
            }
            open={open}
            onOpenChange={setOpen}
        >
            <div className="flex h-11 w-11 cursor-pointer items-center justify-center">
                <MdNotificationsActive className="h-6 w-6 text-white" />
            </div>
        </Popover>
    );
};

export default NotificationPopup;
