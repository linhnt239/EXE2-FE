export const NKConstant = {
    LOCAL_STORAGE_KEY: 'app' as const,
    SUPPORTED_LOCALES: ['en', 'vi'] as const,
    FALLBACK_LOCALE: 'en' as const,
    TOKEN_COOKIE_KEY: 'token' as const,
    TOKEN_HEADER_KEY: 'Authorization' as const,
    APP_NAME: 'Mood Boost' as const,
    TIMEZONE: 'Asia/Ho_Chi_Minh' as const,
    ZERO_TIMEZONE: '+07:00' as const,
    AUTH_FAILED_FALLBACK_ROUTE: '/auth/login' as const,
    AUTH_SUCCESS_FALLBACK_ROUTE: '/me' as const,
};
