import style from "./PageGameRunning.module.scss"
import Game, {newGame} from "../models/Game.ts";
import GameSettings from "../models/GameSettings.ts";
import GameGrid from "../components/GameGrid.tsx";
import MenuBar from "../components/MenuBar.tsx";
import MenuStats from "../components/MenuStats.tsx";
import ModalGameOverSolo from "../components/ModalGameOverSolo.tsx";
import usePlayerStats from "../hooks/usePlayerStats.ts";

import {useRef, useState} from "react";
import {useNavigate} from "react-router";

function PageGameRunning({gameSettings}: { gameSettings: GameSettings }) {
    const [game, setGame] = useState(() =>
        newGame(gameSettings, () => {
            setTimeout(() => {
                setGame(g => g.onTimeout())
            }, 500)
        })
    )
    const stats = usePlayerStats(gameSettings.players)
    const gameOverModalRef = useRef<HTMLDialogElement>(null)
    const navigate = useNavigate()

    const handleUserMove = (updatedGame: Game) => {
        if (updatedGame.isFinished()) {
            console.log("Game finished")
            setGame(updatedGame)
            stats.recordGameFinished()
            showModal()
            return
        }
        setGame(updatedGame)
        stats.recordPlayerMove(updatedGame.whoseTurn())
    }

    const showModal = () => {
        gameOverModalRef.current?.showModal()
    }

    const restartGame = () => {
        setGame(game.restart())
        stats.reset()
        gameOverModalRef.current?.close()
    }

    const goToPageNewGame = () => {
        navigate("/")
    }

    return (
        <div className={style.layout}>
            <header>
                <MenuBar onClickOnRestart={restartGame}/>
            </header>
            <main>
                <GameGrid game={game} onGameUpdated={handleUserMove}/>
            </main>
            <footer>
                <MenuStats playerStats={stats.all}/>
            </footer>
            <ModalGameOverSolo ref={gameOverModalRef}
                               timeElapsedInSeconds={stats.all[0].timeInSeconds}
                               movesTaken={stats.all[0].moves}
                               onClickOnRestart={restartGame}
                               onClickOnSetupNewGame={goToPageNewGame}/>
        </div>
    )
}

export default PageGameRunning