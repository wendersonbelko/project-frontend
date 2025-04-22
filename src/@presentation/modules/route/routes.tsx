import {BrowserRouter, Routes as Router, Route} from 'react-router-dom';
import NotAuthenticated from './notAuthenticated';
import Authentication from './authentication';
import NotFound from './pages/notFound';
import { RouteListener } from '@/@presentation/listeners/route.listener';
import { AccessKeyListener } from '@/@presentation/listeners/access-key.listener';

const Routes = () => {
    return (
        <BrowserRouter>
            <RouteListener />
            <AccessKeyListener />
            <Router>
                {NotAuthenticated.routes}
                {Authentication.routes}
                <Route path="*" element={<NotFound />} />
            </Router>
        </BrowserRouter>
    );
};

export default Routes;
