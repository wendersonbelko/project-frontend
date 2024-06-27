import {UserPagination, TAll} from '../domain/user.entities';
import {UserGateway} from '../domain/user.gateway';

export class GetAllUseCase {
    constructor(private gate: UserGateway) {}

    async execute(params: TAll): Promise<UserPagination> {
        return this.gate.getAll(params);
    }
}
