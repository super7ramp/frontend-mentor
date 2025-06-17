import './App.css'
//import PageNewGame from "./pages/PageNewGame.tsx";
import PageGameRunning from "./pages/PageGameRunning.tsx";
import GameSettings from "./models/GameSettings.ts";

function App() {
    //return <PageNewGame/>
    return <PageGameRunning gameSettings={GameSettings.defaults()}/>
}

export default App
