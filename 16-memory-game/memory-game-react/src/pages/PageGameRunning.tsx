import style from "./PageGameRunning.module.scss"
import Game, {newGame} from "../models/Game.ts";
import GameSettings from "../models/GameSettings.ts";
import MenuBar from "../components/MenuBar.tsx";
import GameGrid from "../components/GameGrid.tsx";

import {useState} from "react";
import MenuSolo from "../components/MenuSolo.tsx";
import useTimer from "../hooks/useTimer.ts";

function PageGameRunning({gameSettings}: { gameSettings: GameSettings }) {

    const {timeInSeconds, startTimer, stopTimer} = useTimer()
    const [game, setGame] = useState(() =>
        newGame(gameSettings, () => {
            setTimeout(() => {
                setGame(g => g.onTimeout())
            }, 500)
        })
    )
    const [moves, setMoves] = useState(0)

    const handleUserMove = (updatedGame: Game) => {
        if (updatedGame.isFinished()) {
            console.log("Game finished")
            stopTimer()
            return
        }
        if (moves === 0) {
            startTimer()
        }
        setGame(updatedGame)
        setMoves(moves + 1)
    }

    return (
        <div className={style.layout}>
            <header>
                <MenuBar/>
            </header>
            <main>
                <GameGrid game={game} onGameUpdated={handleUserMove}/>
            </main>
            <footer>
                <MenuSolo timeInSeconds={timeInSeconds} moves={moves}/>
            </footer>
        </div>
    )
}

export default PageGameRunning