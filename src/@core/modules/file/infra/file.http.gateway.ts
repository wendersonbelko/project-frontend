import {AxiosInstance} from 'axios';
import {
    IFileGateway,
    ISaveParams,
    IResponseSave,
    IRemoveParams,
} from '../domain/gateway/file.gateway';

import {Paths} from './keys';

export class FileGateway implements IFileGateway {
    constructor(private http: AxiosInstance) {}

    async save(params: ISaveParams): Promise<IResponseSave | undefined> {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const formData = new FormData();
        formData.append('file', params.file);
        formData.append('uploadType', params.uploadType.toLowerCase());
        formData.append('path', params.path);

        return await this.http
            .post(Paths.upload, formData, config)
            .then((res) => {
                return res?.data;
            })
            .catch((error) => {
                return error;
            });
    }
    async remove(params: IRemoveParams): Promise<boolean> {
        const replaceId = params.id.replace(/\//g, '%2F');

        return await this.http
            .delete(`${Paths.upload}/${replaceId}`)
            .then((res) => {
                return res.status === 200;
            })
            .catch((error) => {
                return error;
            });
    }
}
