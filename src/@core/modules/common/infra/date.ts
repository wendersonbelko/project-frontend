const formatCurrency = (value: Date) => {
    const data = new Date(value);
    const day = data.getDate().toString().padStart(2, '0');
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
};

const formatCurrencyWithHHmmSS = (value: Date) => {
    const data = new Date(value);
    const day = data.getDate().toString().padStart(2, '0');
    const month = (data.getMonth() + 1).toString().padStart(2, '0');
    const year = data.getFullYear().toString().slice(-2);

    const hour = data.getHours().toString().padStart(2, '0');
    const minute = data.getMinutes().toString().padStart(2, '0');
    const second = data.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};

export default {
    formatCurrency,
    formatCurrencyWithHHmmSS,
};
