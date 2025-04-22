import {DollarOutlined} from '@ant-design/icons';
import { Moviments } from './pages';

export const paths = [
    {
        label: 'Transações',
        key: '/moviments',
        icon: <DollarOutlined />,
        path: '/moviments',
        element: <Moviments />,
        showMenu: true,
        permission: [],
    },
];
