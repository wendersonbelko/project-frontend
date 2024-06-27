import { GameFilterRequest, GameListResponse } from "./game.entities";

export interface GameGateway {
    getGames(filters: GameFilterRequest): Promise<GameListResponse>;
}
