export class CustomException extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}

export enum ErrorMap {
    NOT_AUTHORIZED = 'Não autorizado',
    SERVER_CONNECTION = 'Sem conexão, verifique seu acesso a internet ou informe ao administrador!',
    INVALID_CREDENTIAL = 'Credenciais inválidas!',
}

export const ErrorParse = (error: any) => {
    let message = '';
    switch (error?.response?.status) {
        case 401:
            if (error?.response?.message !== ErrorMap.SERVER_CONNECTION)
                message = ErrorMap?.INVALID_CREDENTIAL;
            break;
        case 500:
            message = error?.response?.message;
            break;
        default:
            message = ErrorMap.SERVER_CONNECTION;
            break;
    }

    return message;
};
