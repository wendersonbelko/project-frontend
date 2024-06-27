import {IFileGateway, ISaveParams, IResponseSave} from '../domain/gateway/file.gateway';

export class SaveUseCase {
    constructor(private fileGate: IFileGateway) {}

    async execute(params: ISaveParams): Promise<IResponseSave | undefined> {
        return this.fileGate.save(params);
    }
}
