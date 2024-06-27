import { Container } from "inversify";
import { GameHttpGateway } from "./game.http.gateway";
import { httpApi } from "../../common/infra/http";
import { GameUseCase } from "../application/game.use.case";

export const Registry = {
    AxiosAdapter: Symbol.for('AxiosAdapter'),

    GameGateway: Symbol.for('GameGateway'),

    GameUseCase: Symbol.for('GameUseCase'),
}

export const container = new Container();

//########## HTTP
container.bind(Registry.AxiosAdapter).toConstantValue(httpApi);

//#region ########## GATEWAYS
container.bind(Registry.GameGateway).toDynamicValue((context) => {
    return new GameHttpGateway(
        context.container.get(Registry.AxiosAdapter)
    );
});
//#endregion

//#region ########## USE CASES
container.bind(Registry.GameUseCase).toDynamicValue((context) => {
    return new GameUseCase(
        context.container.get(Registry.GameGateway),
    );
});
//#endregion

//#region ######### CONTAINERS GET
export const game = {
    getGames: container.get<GameUseCase>(Registry.GameUseCase),
};
//#endregion
