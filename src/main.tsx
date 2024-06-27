import 'reflect-metadata';
import {ConfigProvider} from 'antd';
import ReactDOM from 'react-dom/client';
import Route from './@presentation/modules/route';
import 'antd/dist/reset.css';
import 'typeface-poppins';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import ptBR from 'antd/lib/locale/pt_BR';
import { defaultThemeConfig } from './@presentation/themes/default';
dayjs.locale('pt-br');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider locale={ptBR} theme={defaultThemeConfig}>
        <Route />
    </ConfigProvider>,
);
