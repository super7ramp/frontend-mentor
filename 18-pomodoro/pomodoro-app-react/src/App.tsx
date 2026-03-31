import Logo from './components/Logo'
import SettingsButton from './components/SettingsButton'
import SettingsDialog from './components/SettingsDialog'
import Tabs from './components/Tabs'
import Timer from './components/Timer'
import SettingsContextProvider from './contexts/SettingsContextProvider'

import './App.scss'

function App() {
  return (
    <SettingsContextProvider>
      <header>
        <Logo />
        <Tabs />
      </header>
      <main>
        <Timer duration={5} />
        <SettingsButton command="show-modal" commandfor="settings-dialog" />
        <SettingsDialog id="settings-dialog" />
      </main>
    </SettingsContextProvider>
  )
}

export default App
