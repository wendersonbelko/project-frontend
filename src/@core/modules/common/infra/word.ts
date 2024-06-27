function getFirstTwoLetters(str: string) {
    return str?.substring(0, 2).toUpperCase();
}

const defaultName = (name: string | undefined) => {
    if (!name || name?.length <= 0) {
        return '';
    }

    const nameDefault = name?.charAt(0).toUpperCase() + name?.slice(1).toLowerCase();

    return nameDefault;
};

const getFirstName = (name: string | undefined) => {
    if (!name || name?.length <= 0) {
        return '';
    }

    const partName = name.split(' ');

    return partName[0];
};

export default {
    getFirstTwoLetters,
    defaultName,
    getFirstName,
};
