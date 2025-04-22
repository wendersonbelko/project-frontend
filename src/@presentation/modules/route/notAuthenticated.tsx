import {Route} from 'react-router-dom';
import { paths as pathsLanding } from '@/@presentation/modules/landing/routes';
import { paths as pathsAuth } from '@/@presentation/modules/auth/routes';

const paths: any[] = [
    ...pathsLanding,
    ...pathsAuth,
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
