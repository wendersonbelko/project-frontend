export interface Game {
    id: number;
    isDisabled: boolean;
    providerId: number;
    gameServerUrl: string | null;
    gameId: string;
    gameName: string;
    gameCode: string;
    gameType: string | null;
    description: string | null;
    cover: string;
    technology: string;
    hasLobby: boolean;
    isMobile: boolean;
    hasFreespins: boolean;
    hasTables: boolean;
    onlyDemo: boolean;
    distribution: string;
    status: number;
    rtp: number | null;
    createdAt: string;
    updatedAt: string;
    providerGame: string;
    banner: string;
  }
  
  export interface GameListResponse {
    games: Game[];
    totalGames: number;
    page: number;
    pageSize: number;
  }

  export interface GameFilterRequest {
    page?: number;
    pageSize?: number;
    search?: string;
    providerId?: number;
    status?: number;
  }