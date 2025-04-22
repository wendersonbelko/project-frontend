import { useAccessKeyStore } from '@/@presentation/stores/access-key.store'
import { useEffect } from 'react'

export const AccessKeyListener: React.FC = () => {
  const setAccessKey = useAccessKeyStore((s) => s.setAccessKey)

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea === sessionStorage && e.key === '@access_key') {
        setAccessKey(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [setAccessKey])

  return null
}
