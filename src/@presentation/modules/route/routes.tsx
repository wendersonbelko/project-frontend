import {BrowserRouter, Routes as Router, Route} from 'react-router-dom';
import NotAuthenticated from './notAuthenticated';
import Authentication from './authentication';
import NotFound from './pages/notFound';

const Routes = () => {
    return (
        <BrowserRouter>
            <Router>
                {NotAuthenticated.routes}
                {Authentication.routes}
                <Route path="*" element={<NotFound />} />
            </Router>
        </BrowserRouter>
    );
};

export default Routes;
