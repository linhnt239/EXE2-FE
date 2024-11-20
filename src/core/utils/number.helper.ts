export const formatNumber = (value: number | string) => {
    return Number(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const roundNumber = (value: number | string, decimal: number = 2) => {
    return Number(Number(value).toFixed(decimal));
};
