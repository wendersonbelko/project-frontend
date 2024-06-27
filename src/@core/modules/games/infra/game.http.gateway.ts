import { AxiosInstance } from "axios";
import { GameGateway } from "../domain/game.gateway";
import { GameFilterRequest, GameListResponse } from "../domain/game.entities";
import { paths } from "./keys";

export class GameHttpGateway implements GameGateway {
    constructor(private http: AxiosInstance) { }

    async getGames(filters: GameFilterRequest): Promise<GameListResponse> {
        return this.http.get(paths.game.playconnect, { params: filters }).then((res) => {
            return res.data;
        }
        ).catch((err) => {
            console.error(err);
            return;
        });
    }
}