import {PieChartOutlined} from '@ant-design/icons';
import { Home } from './pages/home';

export const paths = [
    {
        label: 'Home',
        key: '/',
        icon: <PieChartOutlined />,
        path: '/',
        element: <Home />,
        showMenu: true,
        permission: [],
    },
];
