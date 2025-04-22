import { Signin } from "./pages/Signin";
import { Signup } from "./pages/signup";

export const paths = [
    {
        label: 'Signin',
        key: '/signin',
        icon: null,
        path: '/signin',
        element: <Signin />,
        isPermitted: true,
        permission: [],
    },
    {
        label: 'Signup',
        key: '/signup',
        icon: null,
        path: '/signup',
        element: <Signup />,
        isPermitted: true,
        permission: [],
    },
];
