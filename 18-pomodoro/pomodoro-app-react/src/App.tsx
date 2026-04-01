import Logo from './components/Logo'
import SettingsButton from './components/SettingsButton'
import SettingsDialog from './components/SettingsDialog'
import Tabs from './components/Tabs'
import Timer from './components/Timer'
import useSettings from './hooks/useSettings'

import './App.scss'

function App() {
  const [settings] = useSettings()
  return (
    <div className={`app--${settings?.color.selected} app--${settings?.font.selected}`}>
      <header>
        <Logo />
        <Tabs />
      </header>
      <main>
        <Timer duration={5} />
        <SettingsButton command="show-modal" commandfor="settings-dialog" />
        <SettingsDialog id="settings-dialog" />
      </main>
    </div>
  )
}

export default App
