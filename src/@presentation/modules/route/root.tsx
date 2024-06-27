import Layout from '@/@presentation/components/layout';
import Routes from './routes';

const Root = () => {

    //adicionar providers e configurações geral
    return (
        <Layout>
            <Routes />
        </Layout>
    );
};

export default Root;
