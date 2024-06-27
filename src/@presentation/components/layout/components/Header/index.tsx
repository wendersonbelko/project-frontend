import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Layout, Button } from "antd";
import React from "react";
import Register from "./Register";
import Login from "./Login";
import { loggedStore } from "@/@presentation/stores/auth.store";
import UserMenu from "./UserMenu";
import { Keys } from "@/@core/modules/authentication/infra/keys";
import { localStorage } from "@/@core/modules/common/infra/localStorage";

const items: { key: string, label: string }[] = [{
  key: 'home',
  label: 'Home'
}]

const Header: React.FC = () => {

  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const { logged, setLogged, setInfo } = loggedStore();

  React.useEffect(() => {
    const access = localStorage.get(Keys.ACCESS);
    if (access && access.token && access.user) {
      setLogged(true);
      setInfo(access.user);
    }
  }, []);

  return (
    <>
      <Register setShowModal={setShowRegister} showModal={showRegister} />
      <Login setShowModal={setShowLogin} showModal={showLogin} />

      <Layout.Header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        flexWrap: 'nowrap',
      }}>
        <div>
          logo
        </div>
        <div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
        {
          logged ? (
            <div>
              <UserMenu />
            </div>
          ) : (
            <div>
              <Button
                type="primary"
                onClick={() => setShowLogin(true)}
                style={{ marginRight: 5 }}
                icon={<UserOutlined />}
              >
                Entrar
              </Button>
              <Button
                type="primary"
                color="success"
                icon={<UserAddOutlined />}
                style={{ marginLeft: 5 }}
                onClick={() => setShowRegister(true)}
              >
                Registrar
              </Button>
            </div>
          )
        }
      </Layout.Header>
    </>
  )
}

export default Header;
