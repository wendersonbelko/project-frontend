import 'reflect-metadata';
import {Container} from 'inversify';
import {httpApi} from '../../common/infra/http';

import {AuthenticationHttpGateway} from './authentication.http.gateway';
import {AuthenticationLSGateway} from './authentication.ls.gateway';

import {AuthenticationUseCase} from '../application/authentication.use.case';
import {LogoutUseCase} from '../application/logout.use.case';

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),

    AuthenticationGateway: Symbol.for('AuthenticationGateway'),
    AuthenticationLocalStorageGateway: Symbol.for('AuthenticationLocalStorageGateway'),
    
    AuthenticationUseCase: Symbol.for('AuthenticationUseCase'),
    LogoutUseCase: Symbol.for('LogoutUseCase'),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(httpApi);

//#region ########## GATEWAYS
container.bind(Registry.AuthenticationGateway).toDynamicValue((context) => {
    return new AuthenticationHttpGateway(
        context.container.get(Registry.AxiosAdapter)
    );
});
container.bind(Registry.AuthenticationLocalStorageGateway).to(AuthenticationLSGateway);
//#endregion

//#region ########## USE CASES
container.bind(Registry.AuthenticationUseCase).toDynamicValue((context) => {
    return new AuthenticationUseCase(
        context.container.get(Registry.AuthenticationGateway),
        context.container.get(Registry.AuthenticationLocalStorageGateway),
    );
});

container.bind(Registry.LogoutUseCase).toDynamicValue((context) => {
    return new LogoutUseCase(
        context.container.get(Registry.AuthenticationGateway),
        context.container.get(Registry.AuthenticationLocalStorageGateway),
    );
});

//#endregion

//#region ######### CONTAINERS GET
export const auth = {
    requestAccess: container.get<AuthenticationUseCase>(Registry.AuthenticationUseCase),
    logout: container.get<LogoutUseCase>(Registry.LogoutUseCase),
};
//#endregion
