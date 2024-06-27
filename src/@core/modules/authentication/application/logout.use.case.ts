import {
    AuthenticationGateway,
    AuthenticationLocalStorageGateway,
} from '../domain/authentication.gateway';
export class LogoutUseCase {
    constructor(
        private gate: AuthenticationGateway,
        private gateLocalStorage: AuthenticationLocalStorageGateway,
    ) {}

    async execute(): Promise<void> {
        await this.gate.logout();
        return await this.gateLocalStorage.clearAll();
    }
}
