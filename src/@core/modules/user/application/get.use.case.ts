import {User, TGet} from '../domain/user.entities';
import {UserGateway} from '../domain/user.gateway';

export class GetUseCase {
    constructor(private gate: UserGateway) {}

    async execute(params: TGet): Promise<User> {
        return this.gate.get(params);
    }
}
