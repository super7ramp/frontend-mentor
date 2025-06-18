import style from "./PageGameRunning.module.scss"
import {newGame} from "../models/Game.ts";
import GameSettings from "../models/GameSettings.ts";
import MenuBar from "../components/MenuBar.tsx";
import GameGrid from "../components/GameGrid.tsx";

import {useState} from "react";

function PageGameRunning({gameSettings}: {gameSettings: GameSettings}) {

    const [game, setGame] = useState(() =>
        newGame(gameSettings, () => {
            setTimeout(() => {
                setGame(g => g.onTimeout())
            }, 500)
        })
    )

    return (
        <div className={style.layout}>
            <header>
                <MenuBar/>
            </header>
            <main>
                <GameGrid game={game} onGameUpdated={setGame}/>
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default PageGameRunning