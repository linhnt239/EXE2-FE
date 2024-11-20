import { UserWallet } from '../models/userWallet';
import http from './http';

export interface IV1WalletDepositDto {
    amount: number;
}

export interface IV1WalletWithdrawDto {
    amount: number;
}

export const userMeWalletApi = {
    v1Get: async () => {
        const url = '/v1/user-me-wallet';
        const res = await http.get<UserWallet>(url);
        return res.data;
    },

    v1PostDeposit: async (dto: IV1WalletDepositDto) => {
        const url = '/v1/user-me-wallet/deposit';
        const res = await http.post<UserWallet>(url, dto);
        return res.data;
    },
    v1PostWithdraw: async (dto: IV1WalletWithdrawDto) => {
        const url = '/v1/user-me-wallet/withdraw';
        const res = await http.post<UserWallet>(url, dto);
        return res.data;
    },
};
