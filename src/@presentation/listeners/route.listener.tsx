// src/components/RouteListener.tsx
import { useRouteStore } from '@/@presentation/stores/route.store'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const RouteListener: React.FC = () => {
  const location = useLocation()
  const setRoute = useRouteStore((s) => s.setRoute)

  useEffect(() => {
    const query = Object.fromEntries(new URLSearchParams(location.search))
    setRoute(location.pathname, query)
  }, [location, setRoute])

  return null
}
