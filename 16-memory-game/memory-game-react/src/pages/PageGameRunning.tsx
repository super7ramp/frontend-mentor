import style from "./PageGameRunning.module.scss"
import Game from "../models/Game.ts";
import GameSettings from "../models/GameSettings.ts";
import GameGrid from "../components/GameGrid.tsx";
import MenuBar from "../components/MenuBar.tsx";
import MenuStats from "../components/MenuStats.tsx";
import ModalGameOver from "../components/ModalGameOver.tsx";
import useGame from "../hooks/useGame.ts";

import {useRef} from "react";
import {useNavigate} from "react-router";

function PageGameRunning({gameSettings}: { gameSettings: GameSettings }) {
    const {game, setGame, playerStats} = useGame(gameSettings)
    const gameOverModalRef = useRef<HTMLDialogElement>(null)
    const navigate = useNavigate()

    const handleUserMove = (updatedGame: Game) => {
        setGame(updatedGame)
        if (updatedGame.isFinished()) {
            console.log("Game finished")
            showModal()
        }
    }

    const showModal = () => {
        gameOverModalRef.current?.showModal()
    }

    const restartGame = () => {
        setGame(game.restart())
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
                <MenuStats playerStats={playerStats}/>
            </footer>
            <ModalGameOver ref={gameOverModalRef}
                           playerStats={playerStats}
                           onClickOnRestart={restartGame}
                           onClickOnSetupNewGame={goToPageNewGame}/>
        </div>
    )
}

export default PageGameRunning