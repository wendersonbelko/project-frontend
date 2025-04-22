import create from 'zustand'

export interface WalletInfo {
  id: number
  name: string
  description: string | null
  createdBy: string
}

export interface AccessKeyState {
  accessKey: string | null
  wallets: WalletInfo[]
  setAccessKey: (key: string | null) => void
}

function parseWallets(key: string | null): WalletInfo[] {
  if (!key) return []
  try {
    const parsed = JSON.parse(key)
    const userWallets = parsed.user?.wallets
    if (!Array.isArray(userWallets)) return []

    return userWallets.map((uw: any) => ({
      id: uw.wallet?.id,
      name: uw.wallet?.name,
      description: uw.wallet?.description ?? null,
      createdBy: uw.wallet?.createdBy?.name,
    }))
  } catch {
    return []
  }
}

export const useAccessKeyStore = create<AccessKeyState>((set) => ({
  accessKey: sessionStorage.getItem('@access_key'),
  wallets: parseWallets(sessionStorage.getItem('@access_key')),
  setAccessKey: (key) => {
    if (key !== null) {
      sessionStorage.setItem('@access_key', key)
    } else {
      sessionStorage.removeItem('@access_key')
    }
    set({ accessKey: key, wallets: parseWallets(key) })
  },
}))
