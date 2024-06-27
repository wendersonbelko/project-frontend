import {Route} from 'react-router-dom';
import { paths as gamesRoutes } from '@presentation/modules/games/routes';

const paths: any[] = [
    ...gamesRoutes,
]

const routes = paths.map((route) => (
    <Route key={route.key} path={route.key} element={route.element} />
));

const home = paths.filter((item) => item.key === '/')[0];

export default {
    routes: routes,
    paths: paths,
    defaultRoute: home,
};
