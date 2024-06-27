import {IAddressResponse} from './address.entities';

export interface AddressGateway {
    searchAddress(params: string): Promise<IAddressResponse>;
}
