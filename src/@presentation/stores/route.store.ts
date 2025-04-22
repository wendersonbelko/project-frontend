import create from 'zustand'

export interface RouteState {
  pathname: string
  query: Record<string, string>
  setRoute: (pathname: string, query: Record<string, string>) => void
}

export const useRouteStore = create<RouteState>((set) => ({
  pathname: window.location.pathname,
  query: Object.fromEntries(new URLSearchParams(window.location.search)),
  setRoute: (pathname, query) => set({ pathname, query }),
}))
