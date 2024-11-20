import React from 'react';

import { useRouter } from 'next/navigation';

import moment from 'moment';
import 'moment/locale/vi';

import { NKRouter } from '@/core/NKRouter';
import { UserSaleBookingOrder } from '@/core/models/user-sale-booking-order';
import { UserNotification } from '@/core/models/userNotification';

type Props = {
    notification: UserNotification;
    onClick?: () => void;
};

const NotificationItem = ({ notification, onClick }: Props) => {
    const router = useRouter();
    const handleNavigate = () => {
        switch (notification.actionType) {
            case 'NEW_BOOKING_ORDER_FREELANCER':
            case 'CANCEL_BOOKING_ORDER_FREELANCER':
            case 'PAY_BOOKING_ORDER_FREELANCER':
            case 'CONFIRM_BOOKING_ORDER_FREELANCER':
                router.push(NKRouter.freelancer.request.detail(notification.actionId));
                break;
            case 'NEW_BOOKING_ORDER_CLIENT':
            case 'CANCEL_BOOKING_ORDER_CLIENT':
            case 'PAY_BOOKING_ORDER_CLIENT':
            case 'CONFIRM_BOOKING_ORDER_CLIENT':
                router.push(NKRouter.client.request.detail(notification.actionId));
                break;
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className="relative mb-2 flex cursor-pointer flex-col rounded-md border-0 border-b-2 border-solid border-neutral-100 p-2 transition-all last:mb-0 last:border-b-0 hover:bg-neutral-100"
            onClick={handleNavigate}
        >
            <span className="font-medium">{notification.title}</span>
            <span>{notification.content}</span>
            <span className="text-sm">{moment(notification.createdAt).fromNow()}</span>
        </div>
    );
};

export default NotificationItem;
