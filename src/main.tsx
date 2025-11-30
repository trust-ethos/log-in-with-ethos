import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import './index.css'
import { App } from './App.tsx'

const ETHOS_NETWORK_APP_ID = 'cm5l76en107pt1lpl2ve2ocfy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        appearance: {
          theme: 'dark',
        },
        loginMethodsAndOrder: { primary: [`privy:${ETHOS_NETWORK_APP_ID}`] },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>,
)
