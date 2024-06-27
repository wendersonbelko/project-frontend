import {PieChartOutlined} from '@ant-design/icons';

import Home from './pages/home';
import Game from './pages/game';

export const paths = [
    {
        label: 'Home',
        key: '/',
        icon: <PieChartOutlined />,
        path: '/',
        element: <Home />,
        isPermitted: true,
        permission: [],
    },
    {
        label: 'Game',
        key: '/game',
        icon: <PieChartOutlined />,
        element: <Game />,
        isPermitted: true,
        permission: [],
    }
];
