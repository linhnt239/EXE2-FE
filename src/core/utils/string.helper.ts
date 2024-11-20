export function lowercaseFirstLetter(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
export function uppercaseFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeString(str: string) {
    return str
        .split(' ')
        .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
        .join(' ');
}

export function splitString(str: string, separator: string) {
    try {
        return str.split(separator);
    } catch (error) {
        return [];
    }
}

export function concatString(value: any, separator: string) {
    try {
        return value.join(separator);
    } catch (error) {
        return '';
    }
}

export const formatMoney = (data: number | string, isRound = false) => {
    if (isRound) {
        data = Math.round(Number(data) / 1) * 1;
    }

    return Number(data).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'USD',
    });
};

export const formatMoneyVND = (data: number | string, isRound = false) => {
    if (isRound) {
        data = Math.round(Number(data) / 1) * 1;
    }

    return Number(data).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
    });
};

export const formatDistance = (data: number | string) => {
    data = Number(data);
    if (data < 1000) {
        return `${data} m`;
    }
    return `${(data / 1000).toFixed(2)} km`;
};
export const formatTime = (data: number) => {
    if (data < 60) {
        return `${data} giây`;
    }

    if (data < 3600) {
        return `${Math.floor(data / 60)} phút`;
    }

    if (data < 86400) {
        return `${Math.floor(data / 3600)} giờ`;
    }
};

export const formatAddress = (data: string) => {
    data = data
        .replace(/Thành phố/g, 'TP')
        .replace(/,\s*Việt\sNam$|,\s*$/g, '')
        .replace(/\d{5,6}$/g, '')
        .replace(/^\w,\s*/g, '')
        .trim()
        .replace(/,$/, '')
        .trim();

    return data;
};

export const convertTimeToDate = (time: string) => {
    const date = new Date(time);
    return date.getTime();
};

export const convertStringToDate = (date: string | number) => {
    const time = new Date(Number(date));

    return time;
};

export const splitFirstCharacter = (str: string) => {
    const arr = str.split(' ');
    const result = arr.map((item) => item.charAt(0));
    return result.join('');
};

export const convertTextToAvatar = (text: string) => {
    return `https://ui-avatars.com/api/?name=${text}&background=6366f1&color=fff&size=24`;
};

export const removeImageTag = (html: string) => {
    return html.replace(/<img.*?>/g, '');
};

export const removeHtmlTag = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
};

export const truncate = (str: string, length: number, ending: string = '...') => {
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};

export const removeVietnameseTones = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
