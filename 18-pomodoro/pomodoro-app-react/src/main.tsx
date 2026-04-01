import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SettingsContextProvider from './contexts/SettingsContextProvider'
import TabsContextProvider from './contexts/TabsContextProvider'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsContextProvider>
      <TabsContextProvider>
        <App />
      </TabsContextProvider>
    </SettingsContextProvider>
  </StrictMode>,
)
