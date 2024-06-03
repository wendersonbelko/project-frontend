import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Spin, Card, Row, Col } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { listGames, alterEnabled } from '../gateway/games.gateway';

// Definir a estrutura dos dados do jogo
interface Game {
  id: number;
  gameId: string;
  gameName: string;
  gameCode: string;
  providerGame: string;
  status: number;
  cover: string;
  banner: string;
  isDisabled: boolean;
  isAdmin: boolean;
}

interface ApiResponse {
  games: Game[];
  totalGames: number;
  page: number;
  pageSize: number;
}

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchGames(page, 10);
  }, [page]);

  const fetchGames = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const result: ApiResponse = await listGames({ page, pageSize });
      setGames((prevGames) => [...prevGames, ...result.games]);
      setHasMore(result.games.length > 0);
    } catch (error) {
      console.error('Failed to fetch games', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  const alterEnabledGame = async (id: number) => {
    await alterEnabled(String(id));
    document.location.reload();
  };

  return (
    <InfiniteScroll
      dataLength={games.length}
      next={loadMoreData}
      hasMore={hasMore}
      loader={<Spin />}
      endMessage={<div>Fim da lista</div>}
      style={{ width: '100%', height: '79vh', overflowX: 'hidden'}}
    >
      <Row gutter={[16, 16]}>
        {games.map((game) => (
          <Col key={game.id} xs={23} sm={11} md={7} lg={5} xl={3}>
            <Card
              cover={<img alt="banner" src={game.banner} />}
              style={{ marginBottom: '16px' }}
            >
              <Button type="primary">Jogar</Button>
              
              <Card.Meta
                avatar={<Avatar src={`https://playconnectapi.com/storage/${game.cover}`} />}
                title={game.gameName}
                description={game.providerGame}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default Home;
