import React from "react";
import { game } from "@/@core/modules/games/infra/container.registry";
import { Game } from "@/@core/modules/games/domain/game.entities";
import Card from "@/@presentation/components/card";
import WebSocketComponent from "./teste";

const Home: React.FC = () => {
  const [games, setGames] = React.useState<Game[]>([]);

  const getGames = async () => {
    const data = await game.getGames.getGames({ page: 1, pageSize: 10 });
    setGames(data.games);
  }

  React.useEffect(() => {
    getGames();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {
        games && games.map((game) => {
          return (
            <Card {...game} />
          );
        })
      }
      <div>
        <WebSocketComponent />
      </div>
    </div>
  );
}

export default Home;
