import style from "./PageGameRunning.module.scss"
import Game, {newGame} from "../models/Game.ts";
import GameSettings from "../models/GameSettings.ts";
import GameGrid from "../components/GameGrid.tsx";
import MenuBar from "../components/MenuBar.tsx";
import MenuSolo from "../components/MenuSolo.tsx";
import ModalGameOver from "../components/ModalGameOver.tsx";
import useTimer from "../hooks/useTimer.ts";

import {useRef, useState} from "react";
import {useNavigate} from "react-router";

function PageGameRunning({gameSettings}: { gameSettings: GameSettings }) {

    const {timeInSeconds, startTimer, stopTimer, resetTimer} = useTimer()
    const [game, setGame] = useState(() =>
        newGame(gameSettings, () => {
            setTimeout(() => {
                setGame(g => g.onTimeout())
            }, 500)
        })
    )
    const [moves, setMoves] = useState(0)
    const gameOverModalRef = useRef<HTMLDialogElement>(null)
    const navigate = useNavigate()

    const handleUserMove = (updatedGame: Game) => {
        if (updatedGame.isFinished()) {
            console.log("Game finished")
            stopTimer()
            setGame(updatedGame)
            showModal()
            return
        }
        if (moves === 0) {
            startTimer()
        }
        setGame(updatedGame)
        setMoves(moves + 1)
    }

    const showModal = () => {
        gameOverModalRef.current?.showModal()
    }

    const restartGame = () => {
        setGame(game.restart())
        setMoves(0)
        resetTimer()
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
                <MenuSolo timeInSeconds={timeInSeconds} moves={moves}/>
            </footer>
            <ModalGameOver ref={gameOverModalRef}
                           timeElapsedInSeconds={timeInSeconds}
                           movesTaken={moves}
                           onClickOnRestart={restartGame}
                           onClickOnSetupNewGame={goToPageNewGame}/>
        </div>
    )
}

export default PageGameRunning