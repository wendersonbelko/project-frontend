import React, { ReactNode } from 'react';
import { Layout as LayoutAntd } from 'antd';
import Header from './components/Header';

const { Content, Footer } = LayoutAntd;

interface IProps {
  children: ReactNode
}

const Layout: React.FC<IProps> = ({children}) => {

  return (
    <LayoutAntd>
      <Header />

      <Content style={{ padding: '0 48px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by BELKO
      </Footer>
    </LayoutAntd>
  );
};

export default Layout;