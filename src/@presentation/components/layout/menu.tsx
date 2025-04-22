import React from 'react';
import { Menu as MenuAntd, Avatar, Typography, Button, Space, Tooltip, Drawer, List } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { useAccessKeyStore } from '@/@presentation/stores/access-key.store';
import authenticationRoutes from '@/@presentation/modules/route/authentication';

const { Title, Text } = Typography;
const SELECTED_WALLET_STORAGE_KEY = '@selected_wallet';

export const Menu: React.FC = () => {
  const accessKey = useAccessKeyStore(state => state.accessKey);
  const wallets = useAccessKeyStore(state => state.wallets);

  const userName = React.useMemo(() => {
    if (!accessKey) return '';
    try {
      return JSON.parse(accessKey).user?.name ?? '';
    } catch {
      return '';
    }
  }, [accessKey]);

  const getInitialSelectedWallet = (): number | undefined => {
    if (wallets.length === 0) return undefined;
    const saved = localStorage.getItem(SELECTED_WALLET_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id && wallets.some(w => w.id === parsed.id)) {
          return parsed.id;
        }
      } catch {};
    }
    return wallets[0].id;
  };

  const [selectedWallet, setSelectedWallet] = React.useState<number | undefined>(
    () => getInitialSelectedWallet()
  );
  const [drawerVisible, setDrawerVisible] = React.useState(false);

  React.useEffect(() => {
    if (!wallets.length) return;
    if (!selectedWallet || !wallets.some(w => w.id === selectedWallet)) {
      const first = wallets[0];
      setSelectedWallet(first.id);
      localStorage.setItem(
        SELECTED_WALLET_STORAGE_KEY,
        JSON.stringify({ id: first.id, name: first.name })
      );
    }
  }, [wallets, selectedWallet]);

  const handleWalletSelect = (id: number, name: string) => {
    setSelectedWallet(id);
    localStorage.setItem(
      SELECTED_WALLET_STORAGE_KEY,
      JSON.stringify({ id, name })
    );
    setDrawerVisible(false);
  };

  const selectedWalletName =
    wallets.find(w => w.id === selectedWallet)?.name || 'Selecione a carteira';

  const items = authenticationRoutes.paths
    .filter(r => r.showMenu)
    .map(r => ({ key: r.key, icon: r.icon, label: r.label }));

  const currentPath = window.location.pathname;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Space align="center" style={{ padding: 16 }}>
          <Avatar
            shape="square"
            size={48}
            src={`https://i.pravatar.cc/150?u=${encodeURIComponent(userName)}`}
          />
          <div style={{ flex: 1, marginLeft: 8 }}>
            {/* Nome do usuário */}
            <Text style={{ color: '#fff', display: 'block', marginBottom: 4, fontSize: 16, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userName}
            </Text>
            {/* Seleção de carteira */}
            <Tooltip title={selectedWalletName} placement="topLeft" mouseLeaveDelay={0}>
              <Title
                level={5}
                style={{
                  color: '#fff',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                }}
                onClick={() => setDrawerVisible(true)}
              >
                {selectedWalletName} <DownOutlined />
              </Title>
            </Tooltip>
          </div>
        </Space>

        <MenuAntd
          theme="dark"
          mode="inline"
          selectedKeys={[currentPath]}
          onClick={({ key }) => (window.location.href = key)}
          items={items}
          style={{ borderRight: 0 }}
        />

        <Drawer
          title="Selecione a carteira"
          placement="left"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          <List
            dataSource={wallets}
            renderItem={w => (
              <List.Item
                style={{ padding: '12px 16px', cursor: 'pointer' }}
                onClick={() => handleWalletSelect(w.id, w.name)}
              >
                <Text strong={w.id === selectedWallet}>{w.name}</Text>
              </List.Item>
            )}
          />
        </Drawer>
      </div>

      <div style={{ padding: 16, textAlign: 'center' }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          style={{ width: '100%' }}
          onClick={() => {
            window.location.href = authenticationRoutes.defaultRoute.key;
          }}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Menu;