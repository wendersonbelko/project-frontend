import React, { useContext } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar } from 'antd';
import { cofigGateway } from './gateway/config.gateway';
import { AuthComponent } from './components';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import AuthProvider, { AuthContext } from './contexts/auth.context';
import Routers from './routes';

const { Header, Content, Footer } = Layout;

const items = cofigGateway.nav;

const Leftoptions = () => {
  const { authData, setAuthData } = useContext(AuthContext);

  const onLogout = () => {
    setAuthData({ isLoggedIn: false, user: null, token: null });
  }

  const menu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Configurações
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Sair
      </Menu.Item>
    </Menu>
  );

  if (authData.isLoggedIn) {
    return (
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomRight"
        arrow
      >
        <Avatar
          size="large"
          style={{
            backgroundColor: '#87d068',
            cursor: 'pointer',
          }}
          icon={<UserOutlined />}
        />
      </Dropdown>
    );
  }

  return (
    <>
      <AuthComponent />
      <AuthComponent showLogin={false} />
    </>
  )
};

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ width: '100%', maxHeight: '100vh'}}>
      <AuthProvider>
      <Header
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '100%',
            marginTop: 10,
            height: 60,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{ height: 40, marginRight: 10 }}
              src={cofigGateway.appImg}
              alt={cofigGateway.appName}
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Leftoptions />
          </div>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            height: 40,
          }}
        />
      </Header>
      <Content
        style={{
          padding: 0,
          marginTop: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          overflowX: 'hidden',
        }}
      >
        <Routers />
      </Content>
      </AuthProvider>
    </Layout>
  );
};

export default App;
