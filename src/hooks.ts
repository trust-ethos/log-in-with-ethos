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

// Give the profile request a deadline. Without one a stalled connection leaves
// the card stuck on "Loading Ethos profile..." forever with no way to recover.
const ETHOS_API_TIMEOUT_MS = 10_000

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

    // Aborting on cleanup (instead of only ignoring the result) also cancels the
    // in-flight request when the address changes or the component unmounts.
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), ETHOS_API_TIMEOUT_MS)

    fetch(
      `https://api.ethos.network/api/v2/user/by/ethos-everywhere-wallet/${
        encodeURIComponent(walletAddress)
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Ethos-Client': 'log-in-with-ethos-example',
        },
        signal: controller.signal,
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch Ethos user')
        return response.json()
      })
      .then((data) => {
        setState({ ethosUser: data, loading: false, error: null })
      })
      .catch((err) => {
        // An abort is our own cleanup, not a failure worth reporting, and the
        // component may already be unmounted so we must not setState.
        if (controller.signal.aborted) return

        console.error('Error fetching Ethos user:', err)
        setState({ ethosUser: null, loading: false, error: err.message })
      })
      .finally(() => {
        clearTimeout(timeoutId)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [walletAddress])

  // Derive loading state when there's no wallet
  const loading = walletAddress ? state.loading : false

  return { ethosUser: state.ethosUser, loading, error: state.error }
}
