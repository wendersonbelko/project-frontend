import {Route, Navigate, useLocation} from 'react-router-dom';
import notAuthenticated from './notAuthenticated';

const paths: any[] = [];

const routes = paths?.map((route) => (
    <Route
        key={route.key}
        path={route.key}
        element={<RequireAuth permission={route.permission}>{route.element}</RequireAuth>}
    />
));

interface IRequireAuth {
    children: JSX.Element;
    permission: [] // criar caso necessario
}

function RequireAuth(props: IRequireAuth) {
    const location = useLocation();
    const route = notAuthenticated.defaultRoute;

    if (props.permission) {
        return props.children;
    }

    return <Navigate to={route.key} state={{from: location}} replace />;
}

const home = paths.filter((item) => item.key === '/')[0] || undefined;

export default {
    routes: routes,
    paths: paths,
    defaultRoute: home,
};
