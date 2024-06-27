import {
    RequestAccess,
    TypeCreateRequestAccess,
    TypeRequestAccessParams
} from './requestAccess.entities';

export interface AuthenticationGateway {
    requestAccess(params: TypeRequestAccessParams): Promise<RequestAccess>;
    logout(): Promise<void>;
    request(params: any): Promise<any>;
    createRequestAccess(params: TypeCreateRequestAccess): Promise<any>;
}

export interface AuthenticationLocalStorageGateway {
    clearAll(): Promise<void>;
    remove(): Promise<void>;
    get(): Promise<RequestAccess>;
    save(params: RequestAccess): Promise<void>;
    getUserInfos(): Promise<RequestAccess>;
}
