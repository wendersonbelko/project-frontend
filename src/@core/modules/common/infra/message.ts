const addResponseEmpty = (title: string) => `Desculpe, não foi possivel cadastra ${title}.`;

const addError = (title: string) =>
    `Desculpe, não foi possivel cadastra ${title}. Por favor, verifique sua conexão com a internet ou com o servidor de serviços.`;

const updateResponseEmpty = (title: string) => `Desculpe, não foi possivel alterar ${title}.`;

const updateError = (title: string) =>
    `Desculpe, não foi possivel alterar ${title}. Por favor, verifique sua conexão com a internet ou com o servidor de serviços.`;

const getAllResponseEmpty = (title: string) => `Desculpe, não existe(m) cadastro(s) de ${title}.`;

const getAllError = (title: string) =>
    `Desculpe, não foi possível encontrar ${title}. Por favor, verifique sua conexão com a internet ou com o servidor de serviços.`;

const removeResponseEmpty = (title: string, titleRemoved: string) =>
    `Desculpe, ${title} não foi ${titleRemoved}, ou não existe.`;

const removeError = (title: string) =>
    `Desculpe, não foi possível remover ${title}. Por favor, verifique sua conexão com a internet ou com o servidor de serviços.`;

export const httpMessage = {
    addResponseEmpty,
    addError,
    updateResponseEmpty,
    updateError,
    getAllResponseEmpty,
    getAllError,
    removeResponseEmpty,
    removeError,
};
