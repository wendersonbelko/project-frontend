import 'reflect-metadata';
import {Container} from 'inversify';
import {AddressHttpGateway} from './address.http.gateway';
import {SearchUseCase} from '../application/search.use.case';

export const Registry = {
    AddressGateway: Symbol.for('AddressGetway'),

    SearchUseCase: Symbol.for('SearchUseCase'),
};

export const container = new Container();

//########## HTTP

//#region ########## GATEWAYS
container.bind(Registry.AddressGateway).toDynamicValue(() => {
    return new AddressHttpGateway();
});
//#endregion

//#region ########## USE CASES
container.bind(Registry.SearchUseCase).toDynamicValue((context) => {
    return new SearchUseCase(context.container.get(Registry.AddressGateway));
});
//#endregion

//#region ######### CONTAINERS GET
const address = {
    search: container.get<SearchUseCase>(Registry.SearchUseCase),
};
export default address;
//#endregion
