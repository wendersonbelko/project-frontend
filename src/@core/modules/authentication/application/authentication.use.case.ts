import {
    RequestAccess,
    TypeCreateRequestAccess,
    TypeRequestAccessParams
} from '../domain/requestAccess.entities';
import {
    AuthenticationGateway,
    AuthenticationLocalStorageGateway,
} from '../domain/authentication.gateway';
import {setHeaderAuthorization} from '../../common/infra/http';

export class AuthenticationUseCase {
    constructor(
        private gate: AuthenticationGateway,
        private gateLocalStorage: AuthenticationLocalStorageGateway,
    ) {}

    async execute(params: TypeRequestAccessParams): Promise<RequestAccess> {
        const requestAccess = await this.gate.requestAccess(params);
        if (requestAccess) {
            const token = requestAccess.token;
            if (token) {
                await setHeaderAuthorization(token);
                await this.gateLocalStorage.save(requestAccess);
            }
        }
        return requestAccess;
    }

    async createRequestAccess(params: TypeCreateRequestAccess): Promise<any> {
        const requestAccess = await this.gate.createRequestAccess(params);
        return requestAccess;
    }

    async whenReloadGetAccess(): Promise<RequestAccess | null> {
        return this.gateLocalStorage.getUserInfos();
    }
}
