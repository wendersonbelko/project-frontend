const get = (key: string) => {
    const result = sessionStorage.getItem(key);
    if (result != null) return JSON.parse(result);
    return undefined;
};

const save = (key: string, params: any) => {
    sessionStorage.setItem(key, JSON.stringify(params));
};

const remove = (key: string) => {
    sessionStorage.removeItem(key);
};

export const localStorage = {get, save, remove};
