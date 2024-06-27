import { GameFilterRequest, GameListResponse } from "../domain/game.entities";
import { GameGateway } from "../domain/game.gateway";

export class GameUseCase {
    constructor(private gameGateway: GameGateway) { }

    async getGames(filters: GameFilterRequest): Promise<GameListResponse> {
        return this.gameGateway.getGames(filters);
    }
}
