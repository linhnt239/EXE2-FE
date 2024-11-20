import { BookingOrder } from '../models/bookingOrder';
import { EnumListItem, IReportDto, ReportResponse } from '../models/common';
import http from './http';

export interface BookingOrderIV1UpdateDto extends Pick<BookingOrder, 'price' | 'description' | 'startTime' | 'endTime' | 'status' | 'meetingUrl'> {}

export const bookingOrderApi = {
    v1GetEnumStatus: async () => {
        const url = '/v1/booking-order/enum-options/status';
        const res = await http.get<EnumListItem[]>(url);
        return res.data;
    },
    v1Update: async (id: string, dto: BookingOrderIV1UpdateDto) => {
        const url = `/v1/booking-order/${id}`;
        const res = await http.put<BookingOrder>(url, dto);
        return res.data;
    },
    v1GetReport: async (dto: IReportDto) => {
        const url = '/v1/booking-order/report';
        const res = await http.get<ReportResponse[]>(url, { params: { ...dto } });
        return res.data;
    },
};
