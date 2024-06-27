import {IFileGateway, IRemoveParams} from '../domain/gateway/file.gateway';
import {CustomException} from '@core/modules/common/infra/error';

export class RemoveUseCase {
    constructor(private fileGate: IFileGateway) {}
    async execute(params: IRemoveParams): Promise<boolean> {
        const result = await this.fileGate.remove(params);

        if (result) {
            return result;
        } else {
            throw new CustomException('Arquivo não encontrada.');
        }
    }
}
