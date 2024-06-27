import 'reflect-metadata';
import {Container} from 'inversify';
import {httpApi} from '../../common/infra/http';

import {UserHttpGateway} from './user.http.gateway';

import {GetUseCase} from '../application/get.use.case';
import {GetAllUseCase} from '../application/getAll.use.case';
import {UpdateUseCase} from '../application/update.use.case';
import {CreateUseCase} from '../application/create.use.case';

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),
    UserGateway: Symbol.for('UserGateway'),
    GetAllUseCase: Symbol.for('GetAllUseCase'),
    GetUseCase: Symbol.for('GetUseCase'),
    UpdateUseCase: Symbol.for('UpdateUseCase'),
    CreateUseCase: Symbol.for('CreateUseCase'),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(httpApi);

//#region ########## GATEWAYS
container.bind(Registry.UserGateway).toDynamicValue((context) => {
    return new UserHttpGateway(context.container.get(Registry.AxiosAdapter));
});

//#endregion

//#region ########## USE CASES
container.bind(Registry.GetUseCase).toDynamicValue((context) => {
    return new GetUseCase(context.container.get(Registry.UserGateway));
});
container.bind(Registry.GetAllUseCase).toDynamicValue((context) => {
    return new GetAllUseCase(context.container.get(Registry.UserGateway));
});
container.bind(Registry.UpdateUseCase).toDynamicValue((context) => {
    return new UpdateUseCase(context.container.get(Registry.UserGateway));
});
container.bind(Registry.CreateUseCase).toDynamicValue((context) => {
    return new CreateUseCase(context.container.get(Registry.UserGateway));
});
//#endregion

//#region ######### CONTAINERS GET
const user = {
    get: container.get<GetUseCase>(Registry.GetUseCase),
    getAll: container.get<GetAllUseCase>(Registry.GetAllUseCase),
    update: container.get<UpdateUseCase>(Registry.UpdateUseCase),
    create: container.get<CreateUseCase>(Registry.CreateUseCase),
};
export default user;
//#endregion
