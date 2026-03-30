import Logo from './components/Logo'
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
        {/* TODO
        Timer
        Settings button */}
      </main>
    </>
  )
}

export default App
