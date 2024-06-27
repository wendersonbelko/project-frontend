const formatCurrency = (value: string) => {
    const numericValue = Number(value ?? 0);
    if (!isNaN(numericValue)) {
        const test = numericValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return test;
    } else {
        return value;
    }
};

export default {
    formatCurrency,
};
