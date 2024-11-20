import http from './http';

export const noticeBoardApi = {
    v1Send: async () => {
        const url = '/open-api/v1/notice-board/send';
        const res = await http.post(url, {
            message: 'Test',
        });
        return res.data;
    },
};
