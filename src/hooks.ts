import { useEffect, useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import type { EthosUser } from './components.tsx'

/**
 * Hook to get the Ethos wallet address from Privy's cross-app linked account
 */
export function useEthosWallet() {
  const { user } = usePrivy()

  const linkedAccount = user?.linkedAccounts?.find(({ type }) => type === 'cross_app')
  // @ts-expect-error - Privy types don't include embeddedWallets for cross_app accounts
  const ethosWallet = linkedAccount?.embeddedWallets?.[0]?.address as string | undefined

  return ethosWallet
}

interface FetchState {
  ethosUser: EthosUser | null
  loading: boolean
  error: string | null
}

/**
 * Hook to fetch Ethos user profile by wallet address
 */
export function useEthosUser(walletAddress?: string) {
  const [state, setState] = useState<FetchState>({
    ethosUser: null,
    loading: !!walletAddress,
    error: null,
  })

  useEffect(() => {
    if (!walletAddress) return

    let cancelled = false

    fetch(
      `https://api.ethos.network/api/v2/user/by/ethos-everywhere-wallet/${walletAddress}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Ethos-Client': 'log-in-with-ethos-example',
        },
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch Ethos user')
        return response.json()
      })
      .then((data) => {
        if (!cancelled) {
          setState({ ethosUser: data, loading: false, error: null })
        }
      })
      .catch((err) => {
        console.error('Error fetching Ethos user:', err)
        if (!cancelled) {
          setState({ ethosUser: null, loading: false, error: err.message })
        }
      })

    return () => {
      cancelled = true
    }
  }, [walletAddress])

  // Derive loading state when there's no wallet
  const loading = walletAddress ? state.loading : false

  return { ethosUser: state.ethosUser, loading, error: state.error }
}
