export const applyMaskPhone = (phone?: string) => {
    if (!phone) return;
    return '(' + phone.substring(0, 2) + ') ' + phone.substring(2, 7) + '-' + phone.substring(7);
};

export const formatPhoneNumber = (phone: string) => {
    const formattedPhone = phone.replace(/[()\-s]/g, '').replace(' ', '');

    if (formattedPhone.length !== 11) {
        throw new Error('O número de telefone formatado deve ter 12 caracteres.');
    }

    return formattedPhone;
};

export default {
    applyMaskPhone,
    formatPhoneNumber,
};
