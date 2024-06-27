import 'reflect-metadata';
import {Container} from 'inversify';
import {httpApi, mockApi} from '../../common/infra/http';

import {FileGateway} from './file.http.gateway';
import {SaveUseCase} from '../application/save.use.case';
import {RemoveUseCase} from '../application/remove.use.case';

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),
    MockAdapter: Symbol.for('MockAdapter'),

    IFileGateway: Symbol.for('IFileGateway'),
    SaveUseCase: Symbol.for('SaveUseCase'),
    RemoveUseCase: Symbol.for('RemoveUseCase'),
};

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(httpApi);
container.bind(Registry.MockAdapter).toConstantValue(mockApi);

//#region ########## GATEWAYS
container.bind(Registry.IFileGateway).toDynamicValue((context) => {
    return new FileGateway(context.container.get(Registry.AxiosAdapter));
});
//#endregion

//#region ########## USE CASES
container.bind(Registry.SaveUseCase).toDynamicValue((context) => {
    return new SaveUseCase(context.container.get(Registry.IFileGateway));
});
container.bind(Registry.RemoveUseCase).toDynamicValue((context) => {
    return new RemoveUseCase(context.container.get(Registry.IFileGateway));
});
//#endregion

//#region ######### CONTAINERS GET
export const file = {
    save: container.get<SaveUseCase>(Registry.SaveUseCase),
    remove: container.get<RemoveUseCase>(Registry.RemoveUseCase),
};
//#endregion
