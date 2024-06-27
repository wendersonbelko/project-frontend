export enum ENUM_UPLOAD_TYPES {
    DOCUMENT = 'DOCUMENT',
    TIIS = 'TIIS',
}

export enum ENUM_PATH {
    PATIENT = 'patient',
}

export interface ISaveParams {
    file: any;
    uploadType: ENUM_UPLOAD_TYPES;
    path: ENUM_PATH;
}

export interface IResponseSave {
    id: number;
    name: string;
    path?: string;
    uploadType?: ENUM_UPLOAD_TYPES;
    createdAt?: string;
    updatedAt?: string;
}

export interface IRemoveParams {
    id: string;
}

export interface IFileGateway {
    save(params: ISaveParams): Promise<IResponseSave | undefined>;
    remove(params: IRemoveParams): Promise<boolean>;
}
