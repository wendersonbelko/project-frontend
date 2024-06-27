import { useState } from 'react';
import { Avatar, Dropdown, Menu, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { theme } from '@/@presentation/themes/default';

const { Text } = Typography;

const UserMenu = () => {
    const [balance, setBalance] = useState('R$ 10,00');
    const [user, setUser] = useState({
        url: '',
        name: 'Empty User'
    });

    const userMenu = (
        <Menu>
            <Menu.Item key="1">Perfil</Menu.Item>
            <Menu.Item key="2">Configurações</Menu.Item>
            <Menu.Item key="3">Sair</Menu.Item>
        </Menu>
    );

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: theme.colors.primary,
            paddingLeft: 10,
            paddingRight: 10,
        }}>
            <Dropdown overlay={userMenu} trigger={['click']}>
                <Space>
                    <DownOutlined style={{
                        marginRight: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        color: theme.colors.white,
                    }}
                    />
                </Space>
            </Dropdown>
            <Text strong style={{
                fontSize: '16px',
                marginRight: '10px',
                color: theme.colors.white
            }}
            >
                {balance}
            </Text>
            <Avatar
                src={user.url}
                size={40}
                style={{
                    marginLeft: 'auto',
                    border: `2px solid ${theme.colors.white}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            />
        </div>
    );
};

export default UserMenu;
