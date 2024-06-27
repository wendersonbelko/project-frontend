import phone from '@core/modules/common/infra/phone';
import {User, TCreateOrUpdate} from '../domain/user.entities';
import {UserGateway} from '../domain/user.gateway';

export class CreateUseCase {
    constructor(private gate: UserGateway) {}

    async execute(params: TCreateOrUpdate): Promise<User> {
        const formattedPhone = phone.formatPhoneNumber(params.phone);
        const updatedParams: TCreateOrUpdate = {
            ...params,
            phone: formattedPhone,
        };

        return this.gate.create(updatedParams);
    }
}
