import './App.css'
import GameSettings from "./models/GameSettings.ts";
import PageGameRunning from "./pages/PageGameRunning.tsx";
import PageNewGame from "./pages/PageNewGame.tsx";

import {BrowserRouter, Route, Routes} from "react-router";
import {useState} from "react";

function App() {
    const [gameSettings, setGameSettings] = useState(GameSettings.defaults)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageNewGame gameSettings={gameSettings} setGameSettings={setGameSettings}/>}/>
                <Route path="/play" element={<PageGameRunning gameSettings={gameSettings}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
