import {IAddressResponse} from '../domain/address.entities';
import {AddressGateway} from '../domain/address.gateway';

export class AddressHttpGateway implements AddressGateway {
    async searchAddress(zipcode: string): Promise<IAddressResponse> {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
            return await response.json();
        } catch (error) {
            throw new Error();
        }
    }
}
