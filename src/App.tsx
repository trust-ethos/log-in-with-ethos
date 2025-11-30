import { usePrivy } from '@privy-io/react-auth'
import {
  EthosLogo,
  EthosProfileCard,
  GitHubLink,
  LoadingMessage,
  LoginButton,
  LogoutButton,
  WalletAddress,
} from './components.tsx'
import { useEthosUser, useEthosWallet } from './hooks.ts'

export function App() {
  const { ready, authenticated } = usePrivy()

  if (!ready) {
    return <LoadingMessage />
  }

  return (
    <>
      <GitHubLink />
      <div className='container'>
        <EthosLogo size={160} />

        <header className='app-header'>
          <h1>Log in with Ethos</h1>
          <p>Example app showing how to integrate Ethos Network authentication using Privy.</p>
        </header>

        {!authenticated ? <NotAuthenticated /> : <Authenticated />}
      </div>
    </>
  )
}

function NotAuthenticated() {
  const { login } = usePrivy()

  return <LoginButton onClick={login} />
}

function Authenticated() {
  const { logout } = usePrivy()
  const ethosWallet = useEthosWallet()
  const { ethosUser, loading } = useEthosUser(ethosWallet)

  return (
    <>
      {loading && <LoadingMessage message='Loading Ethos profile...' />}

      {ethosUser && <EthosProfileCard user={ethosUser} />}

      {!ethosUser && !loading && ethosWallet && (
        <LoadingMessage message='No Ethos profile found for this wallet' />
      )}

      <WalletAddress address={ethosWallet} />

      <LogoutButton onClick={logout} />
    </>
  )
}
