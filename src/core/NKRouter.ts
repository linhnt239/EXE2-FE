export const NKRouter = {
    auth: {
        login: () => '/auth/login',
        register: () => '/auth/register',
        forgotPassword: () => '/auth/forgot-password',
    },
    findFreelance: {
        request: {
            index: () => '/find-freelance/request',
            detail: (id: string) => `/find-freelance/request/${id}/detail`,
        },
        service: {
            index: () => '/find-freelance/service',
            detail: (id: string) => `/find-freelance/service/${id}/detail`,
            create: () => '/find-freelance/service/create',
            edit: (id: string) => `/find-freelance/service/${id}/edit`,
        },
    },

    app: {
        home: () => '/',
        settings: {
            index: () => '/app/settings',
            update: () => '/app/settings/update',
            changePassword: () => '/app/settings/change-password',
            language: () => '/app/settings/language',
            orderHistory: () => '/app/settings/order-history',
            terms: () => '/app/settings/terms',
            policy: () => '/app/settings/policy',
            wallet: {
                index: () => '/app/settings/wallet',
                deposit: () => '/app/settings/wallet/deposit',
            },
        },
        userSale: {
            index: () => '/app/user-sale',
            detail: (id: string) => `/app/user-sale/${id}`,
        },
        userSaleBooking: {
            index: () => '/app/booking',
            detail: (id: string) => `/app/booking/${id}`,
            form: (id: string) => `/app/booking/${id}/form`,
        },

        userSaleBookingHistory: {
            index: () => '/app/booking-history',
            detail: (id: string) => `/app/booking-history/${id}`,
        },
        userMeSale: {
            index: () => '/app/user-me-sale',
            detail: (id: string) => `/app/user-me-sale/${id}`,
            edit: (id: string) => `/app/user-me-sale/${id}/edit`,
            create: () => '/app/user-me-sale/create',
        },
        userBooking: {
            index: () => '/app/user-booking',
            detail: (id: string) => `/app/user-booking/${id}`,
        },

        userMeBooking: {
            index: () => '/app/user-me-booking',
            detail: (id: string) => `/app/user-me-booking/${id}`,
        },
        userMeSaleBooking: {
            index: () => '/app/user-me-sale-booking',
            detail: (id: string) => `/app/user-me-sale-booking/${id}`,
            edit: (id: string) => `/app/user-me-sale-booking/${id}/edit`,
            create: () => '/app/user-me-sale-booking/create',
        },
        userMeSaleBookingHistory: {
            index: () => '/app/user-me-sale-booking-history',
            detail: (id: string) => `/app/user-me-sale-booking-history/${id}`,
            accept: (id: string) => `/app/user-me-sale-booking-history/${id}/accept`,
        },

        post: {
            index: () => '/app/post',
            detail: (id: string) => `/app/post/${id}`,
            user: (id: string) => `/app/post/user/${id}`,
        },
        photographers: {
            index: () => '/app/photographers',
            detail: (id: string) => `/app/photographers/${id}`,
        },
        contactUs: {
            index: () => '/app/contact-us',
        },

        premium: {
            index: () => '/app/premium',
        },
        chat: {
            index: () => '/app/chat',
            detail: (id: string) => `/app/chat/${id}`,
        },
        notification: {
            index: () => '/app/notification',
        },
        product: {
            index: () => '/app/product',
            detail: (id: string) => `/app/product/${id}`,
        },
        cart: () => '/app/cart',
    },
    userMe: {
        updateProfile: () => '/me/update-profile',
        changePassword: () => '/me/change-password',
        wallet: () => '/me/wallet',
        customerFeedback: () => '/me/customer-feedback',
    },

    freelancer: {
        service: {
            index: () => '/freelancer/service',
            detail: (id: string) => `/freelancer/service/${id}/detail`,
            create: () => '/freelancer/service/create',
            edit: (id: string) => `/freelancer/service/${id}/edit`,
        },
        request: {
            index: () => '/freelancer/request',
            detail: (id: string) => `/freelancer/request/${id}/detail`,
        },
        contact: {
            index: () => '/freelancer/contact',
            detail: (id: string) => `/freelancer/contact/${id}/detail`,
        },
    },

    client: {
        project: {
            index: () => '/client/project',
            detail: (id: string) => `/client/project/${id}/detail`,
            create: () => '/client/project/create',
            edit: (id: string) => `/client/project/${id}/edit`,
        },
        request: {
            index: () => '/client/request',
            detail: (id: string) => `/client/request/${id}/detail`,
        },
        contact: {
            index: () => '/client/contact',
            detail: (id: string) => `/client/contact/${id}/detail`,
        },
    },

    project: {
        index: () => '/project',
        detail: (id: string) => `/project/${id}/detail`,
    },

    service: {
        index: () => '/service',
        detail: (id: string) => `/service/${id}/detail`,
    },

    designer: {
        index: () => '/designer',
        detail: (id: string) => `/designer/${id}/detail`,
    },

    me: {
        index: () => '/me',
        updateProfile: () => '/me/update-profile',
        changePassword: () => '/me/change-password',
        wallet: () => '/me/wallet',
        customerFeedback: () => '/me/customer-feedback',
    },

    forum: {
        index: () => '/forum',
        detail: (id: string) => `/forum/${id}`,
    },
};
