// src/components/GameTable.tsx
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { alterEnabled, listGames } from '../../gateway/games.gateway';

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
}

interface ApiResponse {
  games: Game[];
  totalGames: number;
  page: number;
  pageSize: number;
}

const enabledGame = async (id: number) => {
  await alterEnabled(String(id));
  document.location.reload();
}

const columns: ColumnsType<Game> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Game ID',
    dataIndex: 'gameId',
    key: 'gameId',
  },
  {
    title: 'Nome',
    dataIndex: 'gameName',
    key: 'gameName',
  },
  {
    title: 'Game Code',
    dataIndex: 'gameCode',
    key: 'gameCode',
  },
  {
    title: 'Provedor',
    dataIndex: 'providerGame',
    key: 'providerGame',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: number) => (status === 1 ? 'Operante' : 'Inoperante'),
  },
  {
    title: 'Ação',
    dataIndex: 'isDisabled',
    key: 'isDisabled',
    render: (isDisabled: boolean, record) => {
      if (isDisabled) {
        return (
          <Button type="primary" style={{
            width: 100,
            textAlign: 'center',
          }} onClick={() => enabledGame(record.id)}>
            Habilitar
          </Button>
        )
      }

      return (
        <Button style={{
          width: 100,
          textAlign: 'center',
        }} type="primary" danger onClick={() => enabledGame(record.id)}>
          Desabilitar
        </Button>
      )
    },
  },
  {
    title: 'Banner',
    dataIndex: 'banner',
    key: 'banner',
    render: (banner: string) => <img src={banner} alt="banner" style={{ width: 100 }} />,
  },
];

const Games: React.FC = () => {
  const [data, setData] = useState<ApiResponse>({
    games: [],
    totalGames: 0,
    page: 1,
    pageSize: 10,
  });

  const fetchData = async (page: number, pageSize: number) => {
    // const filter = { gameName: 'game', providerId: '1' };
    const result = await listGames({page, pageSize});
    setData(result);
  };

  useEffect(() => {
    fetchData(data.page, data.pageSize);
  }, []);

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data.games}
        rowKey="id"
        pagination={{
          current: data.page,
          pageSize: data.pageSize,
          total: data.totalGames,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default Games;
