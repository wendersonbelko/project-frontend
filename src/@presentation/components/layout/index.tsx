import React, { ReactNode } from 'react'
import { Layout as AntLayout } from 'antd'
import * as PUBLIC_ROUTES from '@/@presentation/modules/route/notAuthenticated'
import { useRouteStore } from '@/@presentation/stores/route.store'
import { Menu } from './menu'

const { Sider, Content } = AntLayout

interface IProps {
  children: ReactNode
  fullScreen?: boolean
  hideFooter?: boolean
}

const Layout: React.FC<IProps> = ({ children, fullScreen = false, hideFooter = false }) => {
  const [showMenu, setShowMenu] = React.useState(false)

  const { pathname, query } = useRouteStore((s) => ({
    pathname: s.pathname,
    query: s.query,
  }))

  const containerStyle = fullScreen
    ? { height: '100vh', overflow: 'hidden' }
    : { minHeight: '100vh' }

  const contentStyle = {
    padding: 0,
    minHeight: '100vh',
    overflowY: 'auto',
  }

  React.useEffect(() => {
    const hideMenuUrls = PUBLIC_ROUTES.default.paths
      .filter((item) => item.path === window.location.pathname)

    setShowMenu(hideMenuUrls.length === 0)
  }, [pathname, query])

  return (
    <AntLayout style={containerStyle}>
      {showMenu && (
        <Sider width={235} style={{ background: '#001529' }}>
          <Menu />
        </Sider>
      )}

      <AntLayout>
        <Content style={contentStyle}>{children}</Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout