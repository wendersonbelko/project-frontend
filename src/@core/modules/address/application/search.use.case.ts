import {IAddressResponse} from '../domain/address.entities';
import {AddressGateway} from '../domain/address.gateway';

export class SearchUseCase {
    constructor(private gate: AddressGateway) {}

    async execute(params: string): Promise<IAddressResponse> {
        return await this.gate.searchAddress(params);
    }
}
