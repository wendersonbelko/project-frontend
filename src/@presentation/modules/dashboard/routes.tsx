import { PieChartOutlined } from "@ant-design/icons";
import Dashboard from "./pages";

export const paths = [
    {
        label: 'Dashboard',
        key: '/dashboard',
        icon: <PieChartOutlined />,
        path: '/dashboard',
        element: <Dashboard />,
        showMenu: true,
        permission: [],
    },
];
