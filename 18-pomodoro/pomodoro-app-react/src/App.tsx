import Logo from './components/Logo'
import SettingsButton from './components/SettingsButton'
import Tabs from './components/Tabs'
import Timer from './components/Timer'

import './App.scss'

function App() {
  return (
    <>
      <header>
        <Logo/>
        <Tabs/>
      </header>
      <main>
        <Timer duration={5}/>
        <SettingsButton/>
      </main>
    </>
  )
}

export default App
